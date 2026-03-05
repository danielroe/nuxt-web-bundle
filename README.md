# Nuxt Web Bundle

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

> Generate web bundles with [Nuxt 3](https://v3.nuxtjs.org)

- [✨ &nbsp;Changelog](https://github.com/danielroe/nuxt-web-bundle/blob/main/CHANGELOG.md)
- [▶️ &nbsp;Online playground](https://stackblitz.com/github/danielroe/nuxt-web-bundle/tree/main/playground)

## Features

**⚠️ `nuxt-web-bundle` is an experiment. ⚠️**

- 📲 Share your website as a single file over Bluetooth.
- ✨ Run it offline in your origin's context
- ⚡️ Try out experimental web features.

## Installation

With `pnpm`

```bash
pnpm add -D nuxt-web-bundle
```

Or, with `npm`

```bash
npm install -D nuxt-web-bundle
```

Or, with `yarn`

```bash
yarn add -D nuxt-web-bundle
```

## Usage

```js
export default defineNuxtConfig({
  modules: ['nuxt-web-bundle'],
  webBundle: {
    baseURL: 'https://my-website.com',
    // filename: 'bundle.wbn',
  },
})
```

That's it! Now when you run `nuxi build` or `nuxi generate`, a web bundle will be generated _instead_ of a server or static directory.

As mentioned earlier, this is an experiment, and in order to experiment with Web Bundles, you can follow [the steps here](https://web.dev/web-bundles/#playing-around-with-web-bundles) to enable usage in your version of Google Chrome.

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Stub module with `pnpm dev:prepare`
- Run `pnpm dev` to start [playground](./playground) in development mode

## Credits

Much of the implementation is taken from [rollup-plugin-webbundle](https://github.com/GoogleChromeLabs/rollup-plugin-webbundle) - check it out and try it if you are using Vite or another Rollup-based build system.

## License

Made with ❤️

Published under the [MIT License](./LICENCE).

<!-- Badges -->

[npm-version-src]: https://npmx.dev/api/registry/badge/version/nuxt-web-bundle
[npm-version-href]: https://npmx.dev/package/nuxt-web-bundle
[npm-downloads-src]: https://npmx.dev/api/registry/badge/downloads/nuxt-web-bundle
[npm-downloads-href]: https://npm.chart.dev/nuxt-web-bundle
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/danielroe/nuxt-web-bundle/ci.yml?branch=main&style=flat-square
[github-actions-href]: https://github.com/danielroe/nuxt-web-bundle/actions/workflows/ci.yml
[codecov-src]: https://img.shields.io/codecov/c/gh/danielroe/nuxt-web-bundle/main?style=flat-square
[codecov-href]: https://codecov.io/gh/danielroe/nuxt-web-bundle
