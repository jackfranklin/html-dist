import { textNode } from './html';

// node here will be body or head
function processTree(allConfig, node) {
  const nodeTag = node.tagName;
  const config = allConfig[nodeTag];

  if (!config) return;

  const prepends = config.prepends || [];
  let newNode = prepend(node, prepends);
  // TODO: appends!
  return newNode;
}

function prepend(node, prepends) {
  prepends.reverse().forEach((prepend) => {
    if (typeof prepend === 'string') {
      node.children.unshift(textNode(prepend));
    } else if (prepend.type === 'VirtualNode') {
      node.children.unshift(prepend);
    }
  });
  return node;
}

export { processTree };
