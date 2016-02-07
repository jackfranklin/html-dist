import Node from 'virtual-dom/vnode/vnode';
import VText from 'virtual-dom/vnode/vtext';
import toHtml from 'vdom-to-html';

const textNode = (text) => new VText(text);

export {
  Node,
  textNode,
  toHtml
}
