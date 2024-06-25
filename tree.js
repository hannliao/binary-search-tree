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

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
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
        const successor = this.findMin(node.right);
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

  levelOrder(node = this.root, callback) {
    if (node === null) return node;
    let queue = [node];
    let result = [];
    while (queue.length) {
      let node = queue.shift();
      callback ? callback(node.data) : result.push(node.data);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    return callback ?? result;
  }

  inOrder(node = this.root, result = [], callback) {
    if (node === null) return;
    this.inOrder(node.left, result, callback);
    callback ? callback(node.data) : result.push(node.data);
    this.inOrder(node.right, result, callback);
    return result;
  }

  preOrder(node = this.root, result = [], callback) {
    if (node === null) return node;
    callback ? callback(node.data) : result.push(node.data);
    this.inOrder(node.left, result, callback);
    this.inOrder(node.right, result, callback);
    return result;
  }

  postOrder(node = this.root, result = [], callback) {
    if (node === null) return node;
    this.inOrder(node.left, result, callback);
    this.inOrder(node.right, result, callback);
    callback ? callback(node.data) : result.push(node.data);
    return result;
  }

  height(node) {
    if (node === null) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight + 1, rightHeight + 1);
  }

  depth(node, current = this.root, depth = 0) {
    if (current === null) return 0;
    if (current === node) return depth + 1;

    const leftDepth = this.depth(node, current.left, depth + 1);
    const rightDepth = this.depth(node, current.right, depth + 1);

    return Math.max(leftDepth, rightDepth);
  }

  isBalanced(node = this.root) {
    if (node === null) return;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    return true;
  }

  rebalance() {
    const sorted = this.inOrder();
    this.root = this.buildTree(sorted);
  }
}
