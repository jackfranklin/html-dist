import { Node, textNode, toHtml } from './html';

export default function({ src, contents }) {
  // TODO: allow any properties, not just src
  let node;
  if (contents) {
    node = new Node('script', {}, [textNode(contents)]);
  } else {
    node = new Node('script', { src }, []);
  }

  return node;
};
