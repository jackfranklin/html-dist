import VNode from 'virtual-dom/vnode/vnode';
import VText from 'virtual-dom/vnode/vtext';
import toHtml from 'vdom-to-html';

import convertHtml from 'html-to-vdom';

const textNode = (text) => new VText(text);

const LINEBREAK_NODE = textNode('\n');

const fromHtml = convertHtml({
  VNode,
  VText
});

const Node = VNode;

export {
  Node,
  textNode,
  toHtml,
  fromHtml,
  LINEBREAK_NODE
}
