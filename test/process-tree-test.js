import expect from 'expect.js';
import { processTree } from '../src/process-tree';
import script from '../src/script';
import { fromHtml, toHtml } from '../src/html';

describe('process()', () => {
  let input;
  beforeEach(() => {
    input = fromHtml('<html><body><p>Hello</p></body></html>');
  });

  describe('removing', () => {
    it('can remove any elements that match a CSS selector', () => {
      const result = processTree({
        body: { remove: 'p' }
      }, input.children.find((node) => node.tagName === 'body'));
      // TODO: write nice assertions so we can assert on VTrees
      expect(toHtml(result)).to.contain('<body></body>');
    });
  });

  describe('prepending', () => {
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

  describe('appending', () => {
    it('can append to the body', () => {
      const result = processTree({
        body: { appends: [ script({ src: 'test.js' }) ] }
      }, input.children.find((node) => node.tagName === 'body'));
      // TODO: write nice assertions so we can assert on VTrees
      expect(toHtml(result)).to.contain('</p><script src="test.js"></script>');
    });

    it('appends in order', () => {
      const result = processTree({
        body: {
          appends: [
            script({ src: 'first' }),
            script({ src: 'second' })
          ]
        }
      }, input.children.find((node) => node.tagName === 'body'));
      expect(toHtml(result)).to.contain('</p><script src="first"></script><script src="second"></script>');
    });
  });

  describe('tree fn', () => {
    describe('when given a tree function it will use it', () => {
      it('uses the tree returned from the tree fn', () => {
        const result = processTree({
          body: {
            tree: (body) => body.remove('p').append(script({ src: 'test.js' }))
          }
        }, input.children.find((node) => node.tagName === 'body'));
        expect(toHtml(result)).to.contain('<body><script src="test.js"></script></body>');
      });
    });
  });

});
