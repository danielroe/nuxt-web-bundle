import fsp from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, useTestContext } from '@nuxt/test-utils'
import { resolve } from 'pathe'

const rootDir = fileURLToPath(new URL('../playground-v5', import.meta.url))

describe('builds a web bundle with nuxt 5', async () => {
  await setup({
    build: true,
    server: false,
    rootDir,
  })
  it('inlines rules', async () => {
    const publicDir = resolve(useTestContext().nuxt!.options.nitro.output!.dir!, 'public')
    const files = await fsp.readdir(publicDir)
    expect(files).toContain('bundle.wbn')

    const bundle = await fsp.readFile(resolve(publicDir, 'bundle.wbn'), 'utf8')
    expect(bundle).toContain('http://localhost:3000/about')
  })
})
