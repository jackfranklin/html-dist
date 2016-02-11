import { textNode } from './html';
import { treeManipulator } from './tree-manipulator';
import { LINEBREAK_NODE } from './html';

// node here will be body or head
function processTree(allConfig, node) {
  const nodeTag = node.tagName;
  const config = allConfig[nodeTag];

  if (!config) return node;

  // if you define tree, nothing else is allowed
  if (config.tree) {
    const treeManip = config.tree.call(null, treeManipulator(node));
    return treeManip.tree;
  } else {
    let newNode = node;
    if (config.remove) {
      newNode = remove(newNode, config.remove);
    }

    newNode = prepend(newNode, config.prepends || []);
    return append(node, config.appends || []);
  }
}

function remove(node, selector) {
  return treeManipulator(node).remove(selector).tree;
}

function prepend(node, prepends) {
  return manipulateTree(node, prepends.reverse(), 'prepend');
}

function append(node, appends) {
  return manipulateTree(node, appends, 'append');
}

function manipulateTree(node, ary, fnName) {
  return ary.reduce((newNode, item) => {
    return treeManipulator(newNode)[fnName](item).tree;
  }, node);
}

export { processTree };
