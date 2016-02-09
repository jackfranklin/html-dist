import { textNode } from './html';
import { treeManipulator } from './tree-manipulator';

// node here will be body or head
function processTree(allConfig, node) {
  const nodeTag = node.tagName;
  const config = allConfig[nodeTag];

  if (!config) return;

  // if you define tree, nothing else is allowed
  if (config.tree) {
    const treeManip = config.tree.call(null, treeManipulator(node));
    return treeManip;
  } else {
    let newNode = prepend(node, config.prepends || []);
    return append(node, config.appends || []);
  }
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

function append(node, appends) {
  appends.forEach((append) => {
    if (typeof append === 'string') {
      node.children.push(textNode(append));
    } else if (append.type === 'VirtualNode') {
      node.children.push(append);
    }
  });
  return node;
}

export { processTree };
