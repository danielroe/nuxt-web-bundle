import fsp from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { defineNuxtModule, useLogger } from '@nuxt/kit'
import chalk from 'chalk'
import { globby } from 'globby'
import { basename, dirname, resolve } from 'pathe'
import { joinURL, parseURL } from 'ufo'
import { BundleBuilder } from 'wbn'
import mime from 'mime'

export interface ModuleOptions {
  baseURL: string
  formatVersion: string
  primaryURL?: string
  filename: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    configKey: 'webBundle',
    name: 'nuxt-web-bundle',
  },
  defaults: nuxt => ({
    baseURL: joinURL('http://localhost:3000', nuxt.options.app.baseURL),
    formatVersion: 'b2',
    filename: 'bundle.wbn',
  }),
  async setup(options, nuxt) {
    // Skip when preparing
    if (nuxt.options._prepare) return

    (nuxt.options as any)._generate /* TODO: remove in future */ = true
    nuxt.options.nitro.static = true

    nuxt.hook('nitro:config', (config) => {
      config.prerender ||= {}
      config.prerender.crawlLinks = true
      config.prerender.routes = [
        ...(config.prerender.routes || []),
        nuxt.options.ssr ? '/' : '/index.html',
      ].filter(i => i !== '/200.html')
    })

    const themeDir = fileURLToPath(new URL('./runtime/extends', import.meta.url))
    nuxt.options._layers.push({
      cwd: themeDir,
      config: { rootDir: themeDir, srcDir: themeDir },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const logger = useLogger('nuxt-web-bundle')

    nuxt.hook('ready', () => {
      nuxt.hook('build:done', async () => {
        logger.info('Generating web bundle.')

        // Credit: https://github.com/GoogleChromeLabs/rollup-plugin-webbundle
        const builder = new BundleBuilder('b2')
        builder.setPrimaryURL(options.primaryURL || options.baseURL)

        const files = await globby('**/*', {
          cwd: resolve(nuxt.options.rootDir, 'dist'),
        })

        for (const [index, file] of files.sort().reverse().entries()) {
          const content = await fsp.readFile(resolve(nuxt.options.rootDir, 'dist', file))
          const headers = {
            'Content-Type': mime.getType(basename(file)) || 'application/octet-stream',
            'Access-Control-Allow-Origin': '*',
          }
          const url = new URL(file, options.baseURL)
            .toString()
            .replace(/\/index.html$/, '/')
            .replace(/\.html$/, '')
          builder.addExchange(url, 200, headers, content)

          let dir = dirname(url)
          if (dir === '.') {
            dir = ''
          }
          const { pathname } = parseURL(url)
          const treeChar = index === files.length - 1 ? '└─' : '├─'

          process.stdout.write(chalk.gray(`  ${treeChar} ${pathname}\n`))
          await fsp.rm(resolve(nuxt.options.rootDir, 'dist', file), { force: true })
        }

        const buf = builder.createBundle()
        await fsp.mkdir(resolve(nuxt.options.rootDir, 'dist'), { recursive: true })
        await fsp.writeFile(
          resolve(nuxt.options.rootDir, 'dist', options.filename),
          Buffer.from(buf, buf.byteOffset, buf.byteLength),
        )
        const url = pathToFileURL(resolve(nuxt.options.rootDir, 'dist', options.filename))
        logger.success(`Bundle generated at \`${url}\`.`)
      })
    })
  },
})
