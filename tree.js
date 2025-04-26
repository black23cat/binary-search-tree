import { mergeSort, removeDuplicate } from './merge-sort.js';

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export default class Tree {
  constructor(array) {
    this.root = this.#buildTree(removeDuplicate(mergeSort(array)));
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    let currentNode = this.root;
    let parrentNode = null;

    while (currentNode !== null) {
      if (currentNode.data === value) {
        return `Insertion failed. Value ${value} is already in a tree`;
      }

      parrentNode = currentNode;
      if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    if (parrentNode.data > value) {
      parrentNode.left = new Node(value);
    } else {
      parrentNode.right = new Node(value);
    }
  }

  deleteItem(value) {
    if (this.root === null) return null;

    let currentNode = this.root;
    let parentNode = null; // Find parentNode and Node
    while (currentNode !== null && currentNode.data !== value) {
      parentNode = currentNode;
      currentNode =
        currentNode.data > value ? currentNode.left : currentNode.right;
    }
    // If value not found in tree return null
    if (currentNode === null) return null;
    // Find successorNode if the right subtree of deleted node is not null
    const findSuccessor = (node) => {
      let successorParent = currentNode;
      let successor = node;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }
      if (successorParent !== currentNode) {
        successorParent.left = successor.right;
        successor.right = currentNode.right;
      }
      successor.left = currentNode.left;
      return successor;
    };
    // If value is root node of the tree. Get successor value to replace root
    if (parentNode === null) {
      let successor = findSuccessor(currentNode.right);
      this.root = successor;
      return this.#logDeleteItem();
    }
    // Get position of deleted node from parent node
    const currentNodePos =
      parentNode.data > currentNode.data ? 'left' : 'right';

    if (currentNode.left === null && currentNode.right === null) {
      parentNode[currentNodePos] = null;
      return this.#logDeleteItem();
    } else if (currentNode.left !== null && currentNode.right === null) {
      parentNode[currentNodePos] = currentNode.left;
      return this.#logDeleteItem();
    } else {
      let successor = findSuccessor(currentNode.right);
      parentNode[currentNodePos] = successor;
      return this.#logDeleteItem();
    }
  }

  find(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (node.data === value) {
      return node;
    }

    return node.data > value
      ? this.find(value, node.left)
      : this.find(value, node.right);
  }

  levelOrder(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('Missing required callback. Please provide function.');
    }

    if (node === null) {
      return null;
    }

    const queue = [];
    queue.push(node);
    while (queue.length !== 0) {
      let currentNode = queue[0];
      callback(currentNode);
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
      queue.shift();
    }
  }

  preOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Missing required callback. Please provide function.');
    }

    const preOrderTraverse = function (node) {
      if (node === null) {
        return;
      }

      callback(node);
      preOrderTraverse(node.left);
      preOrderTraverse(node.right);
    };
    preOrderTraverse(this.root);
  }

  inOrder(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('Missing required callback. Please provide function.');
    }

    if (node === null) {
      return;
    }

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('Missing required callback. Please provide function.');
    }

    if (node === null) {
      return;
    }

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  heigh(value) {
    let selectedNode = this.find(value);
    if (selectedNode === null) {
      return null;
    }

    return this.#getHeight(selectedNode);
  }

  depth(value) {
    if (this.root === null) return null;
    let currentNode = this.root;
    let depthCount = -1;
    while (currentNode !== null) {
      depthCount += 1;
      if (currentNode.data === value) {
        return depthCount;
      }
      currentNode =
        currentNode.data > value ? currentNode.left : currentNode.right;
    }
    if (currentNode === null) return null;
    return depthCount;
  }

  isBalance() {
    if (this.root === null) return true;

    let isBalance = true;
    this.postOrder((node) => {
      let leftHeight = this.#getHeight(node.left);
      let rightHeight = this.#getHeight(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) {
        isBalance = false;
      }
    });
    return isBalance;
  }

  rebalance() {
    if (this.root === null) {
      return null;
    }
    const treeNodes = [];
    this.inOrder((node) => treeNodes.push(node.data));
    this.root = this.#buildTree(mergeSort(treeNodes));
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

  #buildTree(array, start = 0) {
    if (start > array.length - 1) {
      return null;
    }
    const mid = Math.floor((array.length - 1) / 2);
    const root = new Node(array[mid]);
    root.left = this.#buildTree(array.slice(start, mid));
    root.right = this.#buildTree(array.slice(mid + 1));
    return root;
  }

  #getHeight(node) {
    if (node === null) {
      return 0;
    }
    let leftDepth = 1 + this.#getHeight(node.left);
    let rightDepth = 1 + this.#getHeight(node.right);
    return leftDepth > rightDepth ? leftDepth : rightDepth;
  }

  #logDeleteItem() {
    return `Value is deleted from tree.`;
  }
}
