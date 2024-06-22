import Node from './node.js';

export default class Tree {
  constructor(array) {
    this.array = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    const start = 0;
    const end = array.length - 1;
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array.slice(start, mid));
    root.right = this.buildTree(array.slice(mid + 1, end + 1));
    return root;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value, node = this.root) {
    if (this.array.includes(value)) {
      throw new Error('Cannot insert duplicate value');
    }
    if (node === null) return new Node(value);
    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return node;
    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null || node.right === null) {
        node = node.left ?? node.right;
      } else {
        const successor = findMin(node.right);
        node.data = successor.data;
        node.right = this.deleteItem(successor.data, node.right);
      }
    }
    return node;
  }

  findMin(node) {
    if (node === null) return node;
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value, node = this.root) {
    // return the node with the given value
    if (node === null) return node;
    if (node.data === value) {
      return node;
    }
    if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  levelOrder(callback) {
    // traverse the tree in breadth-first level order
  }

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {
    // returns the given node's height
  }

  depth(node) {
    // returns the given node's depth
  }

  isBalanced() {
    // check if the tree is balanced
  }

  rebalance() {
    // rebalances an unbalanced tree
  }
}
