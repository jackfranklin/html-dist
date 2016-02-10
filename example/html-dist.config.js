import {
  script,
  googleAnalytics
} from '../src/index';

export default {
  outputFile: 'example/dist/index.html',
  minify: true,
  head: {
    remove: 'script'
  },
  body: {
    appends: [
      script({
        src: 'bundle.js'
      }),
      googleAnalytics('UA-1234')
    ]
  }
}
