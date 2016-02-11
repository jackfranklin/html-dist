import { Node, textNode, toHtml } from './html';
import { omit } from 'lodash';

export default function(properties) {
  // contents is a special property
  const contents = properties.contents;

  let node;
  if (contents) {
    node = new Node('script', {}, [textNode(contents)]);
  } else {
    const allProps = omit(properties, ['contents']);
    node = new Node('script', allProps, []);
  }

  return node;
};
