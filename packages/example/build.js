const { build } = require('esbuild')
const { styleInjectPlugin } = require('esbuild-plugin-style-inject')

build({
  bundle: true,
  entryPoints: ['./src/index.js'],
  outdir: "dist",
  plugins: [styleInjectPlugin()]
})
