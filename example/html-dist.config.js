import {
  script,
  googleAnalytics,
  htmlComment
} from '../src/index';

export default {
  // TODO: make inputFile be here and not CLI arg?
  // outputFile: 'example/dist/index.html',
  head: {
    tree: function(tree) {
      return tree.remove('script');
    }
  },
  body: {
    appends: [
      googleAnalytics('UA-12345-1'),
      script({
        src: 'bundle.js'
      }),
      script({
        contents: "System.import('app/main')"
      })
    ],
    prepends: [
      script({
        src: 'test.js'
      })
    ]
  }
}
