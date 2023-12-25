const { readFile } = require('fs')
const { render } = (function () {
  try {
    const { render } = require('less')
    return { render }
  } catch (err) {
    // ignore
  }
  return {}
})()

const code = `(function (css) {
  if (typeof document !== 'undefined' && document.head) {
    var style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.appendChild(document.createTextNode(css))
    document.head.appendChild(style)
  }
})(__CSS__);
`

function styleInjectPlugin(options) {
  let less = true
  let css = true
  let filter = null

  if (options) {
    less = options.less !== false
    css = options.css !== false
  }

  if (less && css) {
    filter = /\.(less|css)$/i
  } else if (css) {
    filter = /\.css$/i
  } else if (less) {
    filter = /\.less$/i
  }

  return {
    name: 'esbuild-plugin-style-inject',
    setup: function (build) {
      if (filter) {
        build.onLoad({ filter: filter }, function (args) {
          return new Promise(function(resolve) {
            readFile(args.path, function (err, data) {
              if (err) {
                resolve({ errors: [{ text: err.message }] })
              } else if (render) {
                render(data.toString(), {
                  filename: args.path,
                  compress: true,
                }, function (err, output) {
                  if (err) {
                    resolve({
                      errors: [{
                        text: err.message,
                        location: {
                          line: err.line,
                          column: err.column,
                          file: err.filename,
                        }
                      }]
                    })
                  } else {
                    resolve({
                      watchFiles: output.imports,
                      contents: code.replace('__CSS__', function() {
                        return JSON.stringify(output.css)
                      })
                    })
                  }
                })
              } else {
                resolve({
                  contents: code.replace('__CSS__', function() {
                    return JSON.stringify(data.toString())
                  })
                })
              }
            })
          })
        })
      }
    }
  }
}

module.exports.styleInjectPlugin = styleInjectPlugin
