import select from 'vtree-select';

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
    return this.tree;
  }
}

