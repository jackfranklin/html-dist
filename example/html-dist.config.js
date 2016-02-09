import {
  script,
  googleAnalytics,
  htmlComment
} from '../src/index';

export default {
  // TODO: make inputFile be here and not CLI arg?
  // outputFile: 'example/dist/index.html',
  head: {
    tree: function(head) {
      // return head.replaceWith([
      //   script({ src: 'hello.js' }),
      // ]);
      return head.remove('script').append(script({ src: 'foo.js' }));
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
