import select from 'vtree-select';
import { Node } from './html';

export function treeManipulator(tree) {
  return new TreeManipulator(tree);
}

class TreeManipulator {
  constructor(tree) {
    this.tree = tree;
  }

  remove(query) {
    const match = select(query);
    const newChildren = this.tree.children.filter((c) => !match.matches(c));
    this.tree.children = newChildren;
    return this;
  }

  append(node) {
    this.tree.children.push(node);
    return this;
  }

  replaceWith(children, attributes = []) {
    return new Node('head', attributes, children);
  }
}

