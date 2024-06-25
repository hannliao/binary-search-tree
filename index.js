import Tree from './tree.js';

const tree = new Tree([5, 47, 15, 2, 7, 9, 56, 23, 79, 82, 68, 28]);
tree.prettyPrint();
console.log(tree.isBalanced()); // true
console.log(tree.levelOrder()); // [10, 5, 23, 2, 7, 12, 82, 3, 6, 9, 15, 36, 14]
console.log(tree.inOrder()); // [2, 3, 5, 6, 7, 9, 10, 12, 14, 15, 23, 36, 82]
console.log(tree.preOrder()); // [10, 2, 3, 5, 6, 7, 9, 12, 14, 15, 23, 36, 82]
console.log(tree.postOrder()); // [2, 3, 5, 6, 7, 9, 12, 14, 15, 23, 36, 82, 10]
console.log(tree.height(tree.find(7))); // 3
console.log(tree.depth(tree.find(15))); // 4
tree.insert(103);
tree.insert(128);
tree.insert(200);
tree.deleteItem(56);
tree.deleteItem(5);
console.log(tree.isBalanced()); // false
tree.rebalance();
tree.prettyPrint();
console.log(tree.isBalanced()); // true
console.log(tree.levelOrder()); // [ 47, 9, 82, 2, 23, 68, 128, 7, 15, 28, 79, 103, 200]
console.log(tree.inOrder()); // [ 2, 7, 9, 15, 23, 28, 47, 68, 79, 82, 103, 128, 200]
console.log(tree.preOrder()); // [ 47, 2, 7, 9, 15, 23, 28, 68, 79, 82, 103, 128, 200]
console.log(tree.postOrder()); // [ 2, 7, 9, 15, 23, 28, 68, 79, 82, 103, 128, 200, 47]
