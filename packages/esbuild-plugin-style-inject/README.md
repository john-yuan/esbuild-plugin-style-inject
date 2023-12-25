# README

Inject styles (less and css) into the document.

```bash
npm i less
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
