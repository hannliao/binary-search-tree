import Tree from './tree.js';

/* 
Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
Confirm that the tree is balanced by calling isBalanced.
Print out all elements in level, pre, post, and in order.
Unbalance the tree by adding several numbers > 100.
Confirm that the tree is unbalanced by calling isBalanced.
Balance the tree by calling rebalance.
Confirm that the tree is balanced by calling isBalanced.
Print out all elements in level, pre, post, and in order.
*/

const tree = new Tree([5, 15, 36, 2, 7, 9, 10, 6, 3, 82]);
tree.prettyPrint(tree.root);
tree.insert(14);
tree.prettyPrint(tree.root);
console.log(tree.find(9));
tree.deleteItem(2);
tree.prettyPrint(tree.root);
