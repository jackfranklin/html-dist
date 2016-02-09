import {
  script,
  googleAnalytics,
  htmlComment
} from '../src/index';

export default {
  head: {
    edits: [
      function(html) {
        $('link').removeAll();
      },
    ]
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
