import {
  script,
  googleAnalytics,
  args
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
        src: `bundle-${args.jsHash}.js`
      }),
      googleAnalytics('UA-1234')
    ]
  }
}
