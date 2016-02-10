import {
  script,
  googleAnalytics
} from '../src/index';

import { fromHtml } from '../src/html';

export default {
  // TODO: make inputFile be here and not CLI arg?
  outputFile: 'example/dist/index.html',
  head: {
    tree: (head) => head.remove('script')
  },
  body: {
    appends: [
      fromHtml('<div>FOO</div>'),
      script({
        src: 'bundle.js'
      }),
      googleAnalytics('UA-1234')
    ]
  }
}
