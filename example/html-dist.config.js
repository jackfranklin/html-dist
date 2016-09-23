var { script, googleAnalytics, args } = require('../lib/index');

module.exports = {
  outputFile: 'example/dist/index.html',
  minify: true,
  head: {
    remove: 'script'
  },
  body: {
    appends: [
      script({
        src: `bundle.${args.jsHash}.js`
      }),
      googleAnalytics('UA-1234')
    ]
  }
}
