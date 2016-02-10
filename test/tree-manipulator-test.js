import expect from 'expect.js';

import { treeManipulator } from '../src/tree-manipulator';
import script from '../src/script';

import { fromHtml, toHtml } from '../src/html';

describe('TreeManipulator', () => {
  let input;
  const head = (input) => input.children[0];
  const body = (input) => input.children[1];

  beforeEach(() => {
    input = fromHtml('<html><head><title>Foo</title></head><body><p>Hello</p></body></html>');
  });

  describe('#replaceWith', () => {
    describe('when given a head', () => {
      it('can replace the given tree entirely with the right tagName', () => {
        const instance = treeManipulator(head(input));
        const newTree = instance.replaceWith([ script({ src: 'test.js' }) ]).tree;
        expect(newTree.tagName).to.eql('head');
        expect(newTree.children.length).to.eql(1);
        expect(newTree.children[0].properties).to.eql({ src: 'test.js' });
      });
    });

    describe('when given a body elem', () => {
      it('can replace the entire tree', () => {
        const instance = treeManipulator(body(input));
        const newTree = instance.replaceWith([ script({ src: 'test.js' }) ]).tree;
        expect(newTree.tagName).to.eql('body');
        expect(newTree.children.length).to.eql(1);
        expect(newTree.children[0].properties).to.eql({ src: 'test.js' });
      });
    });
  });

  describe('#append', () => {
    it('can take a node and append it', () => {
      const instance = treeManipulator(head(input));
      const newTree = instance.append(script({ src: 'test.js' })).tree;
      expect(newTree.children.length).to.eql(2);
      expect(newTree.children.map((c) => c.tagName)).to.eql(['title', 'script']);
      expect(newTree.children[1].properties).to.eql({ src: 'test.js' });
    });
  });
});
