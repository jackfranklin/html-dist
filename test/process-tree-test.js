import expect from 'expect.js';
import { processTree } from '../src/process-tree';
import script from '../src/script';
import { fromHtml, toHtml } from '../src/html';

let input;
describe('process()', () => {
  describe('prepending', () => {
    beforeEach(() => {
      input = fromHtml('<html><body><p>Hello</p></body></html>');
    });

    it('can prepend to the body', () => {
      const result = processTree({
        body: { prepends: [ script({ src: 'test.js' }) ] }
      }, input.children.find((node) => node.tagName === 'body'));
      // TODO: write nice assertions so we can assert on VTrees
      expect(toHtml(result)).to.contain('<script src="test.js"></script><p>');
    });

    it('prepends in reverse order', () => {
      const result = processTree({
        body: {
          prepends: [
            script({ src: 'first' }),
            script({ src: 'second' })
          ]
        }
      }, input.children.find((node) => node.tagName === 'body'));
      expect(toHtml(result)).to.contain('<script src="first"></script><script src="second"></script><p>');
    });
  });

});
