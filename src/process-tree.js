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
    console.log('prepend', prepend.type);
    if (typeof prepend === 'string') {
      node.children.unshift(textNode(prepend));
    } else if (prepend.type === 'VirtualNode' || prepend.type === 'Widget') {
      node.children.unshift(prepend);
    }
  });
  return node;
}

export { processTree };
