import fsp from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup } from '@nuxt/test-utils'
import { resolve } from 'pathe'

const rootDir = fileURLToPath(new URL('../playground', import.meta.url))

describe('builds a web bundle', async () => {
  await setup({
    build: true,
    server: false,
    rootDir,
  })
  it('inlines rules', async () => {
    const publicDir = resolve(rootDir, 'dist')
    const files = await fsp.readdir(publicDir)
    expect(files).toContain('bundle.wbn')
  })
})
