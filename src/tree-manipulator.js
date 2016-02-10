import select from 'vtree-select';
import { Node, LINEBREAK_NODE } from './html';

export function treeManipulator(tree) {
  return new TreeManipulator(tree);
}


class TreeManipulator {
  constructor(tree) {
    this.tree = tree;
    this.tagName = tree.tagName;
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

  prepend(node) {
    this.tree.children.unshift(node);
    return this;
  }

  replaceWith(children, attributes = {}) {
    // TODO: should we take attributes from the existing top level node?
    return treeManipulator(new Node(this.tagName, attributes, children));
  }
}

