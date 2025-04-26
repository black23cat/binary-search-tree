import Tree from './tree.js';

function generateNumberArray(length = 16, maxNumber = 100) {
  if (typeof length !== 'number' || typeof Number(length) !== 'number') {
    return;
  }
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * maxNumber));
  }
  return arr;
}

const tree = new Tree(generateNumberArray(16));
console.log(`Tree balance :${tree.isBalance()}`);
console.log(tree.prettyPrint());

const levelOrder = [];
tree.levelOrder((node) => levelOrder.push(node.data));
console.log(`Level Order elements : ${levelOrder}`);

const preOrder = [];
tree.preOrder((node) => preOrder.push(node.data));
console.log(`Pre Order elements : ${preOrder}`);

const postOrder = [];
tree.postOrder((node) => postOrder.push(node.data));
console.log(`Post Order elements : ${postOrder}`);

const inOrder = [];
tree.inOrder((node) => inOrder.push(node.data));
console.log(`In Order elements : ${inOrder}`);

tree.insert(110);
tree.insert(120);
tree.insert(105);
tree.insert(115);
console.log(`Tree balance :${tree.isBalance()}`);
console.log(tree.prettyPrint());

tree.rebalance();
console.log(`Tree balance :${tree.isBalance()}`);
console.log(tree.prettyPrint());

const rebalanceLevelOrder = [];
tree.levelOrder((node) => rebalanceLevelOrder.push(node.data));
console.log(`Level Order elements : ${rebalanceLevelOrder}`);

const rebalancePreOrder = [];
tree.preOrder((node) => rebalancePreOrder.push(node.data));
console.log(`Pre Order elements : ${rebalancePreOrder}`);

const rebalancePostOrder = [];
tree.postOrder((node) => rebalancePostOrder.push(node.data));
console.log(`Post Order elements : ${rebalancePostOrder}`);

const rebalanceInOrder = [];
tree.inOrder((node) => rebalanceInOrder.push(node.data));
console.log(`In Order elements : ${rebalanceInOrder}`);
