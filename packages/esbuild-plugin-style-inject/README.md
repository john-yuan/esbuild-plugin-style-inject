# README

An esbuild plugin to inject styles (less or css) into the document.

This plugin will bundle the less or css code into the JavaScript code.

```bash
# Install less as peer dependency
npm i less

# Install the plugin
npm i esbuild-plugin-style-inject
```

## Usage

```js
const { build } = require('esbuild')
const { styleInjectPlugin } = require('esbuild-plugin-style-inject')

build({
  bundle: true,
  outdir: 'dist',
  entryPoints: ['./src/index.js'],
  plugins: [styleInjectPlugin()]
})
```

## Options

```js
const { build } = require('esbuild')
const { styleInjectPlugin } = require('esbuild-plugin-style-inject')

build({
  bundle: true,
  outdir: 'dist',
  entryPoints: ['./src/index.js'],
  plugins: [
    styleInjectPlugin({
      /**
       * Inject css. Default: `true`.
       */
      css: true,

      /**
       * Inject less. Default: `true`.
       *
       * Note: The less module must be installed.
       */
      less: true
    })
  ]
})
```

## License

[MIT](./LICENSE)
