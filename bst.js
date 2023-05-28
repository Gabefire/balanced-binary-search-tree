const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function buildTree(sortedArr, start, end) {
  if (start > end) return null;
  const rootIndex = parseInt((start + end) / 2);
  const node = new Node(sortedArr[rootIndex]);
  node.left = buildTree(sortedArr, start, rootIndex - 1);
  node.right = buildTree(sortedArr, rootIndex + 1, end);
  return node;
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    const map = {};
    const sortedArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (!map[arr[i]]) {
        map[arr[i]] = true;
        sortedArr.push(arr[i]);
      }
    }
    this.arr = sortedArr.sort((a, b) => a - b);
    this.root = null;
  }
  insert(value, root = this.root) {
    if (root === null) {
      console.log("no values");
    }
    if (value < root.value) {
      if (root.left === null) {
        const newNode = new Node(value);
        root.left = newNode;
        return;
      }
      this.insert(value, root.left);
    }
    if (value > root.value) {
      if (root.right === null) {
        const newNode = new Node(value);
        root.right = newNode;
        return;
      }
      this.insert(value, root.right);
    }
    if (value === root.value) {
      console.log("can not insert duplicate value");
      return;
    }
  }
  deleteRec(value, root = this.root) {
    if (root == null) return root;

    if (value < root.value) root.left = this.deleteRec(value, root.left);
    else if (value > root.value) root.right = this.deleteRec(value, root.right);
    else {
      if (root.left == null) return root.right;
      else if (root.right == null) return root.left;

      root.value = minValue(root.right);

      root.right = this.deleteRec(root.value, root.right);
    }
    return root;

    function minValue(root) {
      let minv = root.value;
      while (root.left != null) {
        minv = root.left.value;
        root = root.left;
      }
      return minv;
    }
  }
  find(value, root = this.root) {
    if (value === null) return null;
    if (value === root.value) return root;
    if (value > root.value) {
      return this.find(value, root.right);
    }
    if (value < root.value) {
      return this.find(value, root.left);
    }
  }

  levelOrder(
    func = (a) => {
      return a;
    },
    root = this.root
  ) {
    if (root === null) return;
    const queue = [];
    const finalArray = [];
    queue.push(root);
    while (queue.length !== 0) {
      finalArray.push(func(queue[0].value));
      if (queue[0].left !== null) queue.push(queue[0].left);
      if (queue[0].right !== null) queue.push(queue[0].right);
      queue.shift();
    }
    return finalArray;
  }
  preorder(
    func = (a) => {
      return a;
    },
    root = this.root
  ) {
    if (root === null) return [];
    const finalArray = [func(root.value)];
    const leftArray = this.preorder(func, root.left);
    const rightArray = this.preorder(func, root.right);
    return [...finalArray, ...leftArray, ...rightArray];
  }
  inorder(
    func = (a) => {
      return a;
    },
    root = this.root
  ) {
    if (root === null) return [];
    const leftArray = this.inorder(func, root.left);
    const finalArray = [func(root.value)];
    const rightArray = this.inorder(func, root.right);
    return [...leftArray, ...finalArray, ...rightArray];
  }
  postorder(
    func = (a) => {
      return a;
    },
    root = this.root
  ) {
    if (root === null) return [];
    const leftArray = this.postorder(func, root.left);
    const rightArray = this.postorder(func, root.right);
    const finalArray = [func(root.value)];
    return [...leftArray, ...rightArray, ...finalArray];
  }
  height(node = this.root) {
    if (node === null) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(value, root = this.root) {
    if (root.value === value) {
      return 0;
    } else if (root.value < value) {
      const rightHeight = this.depth(value, root.right);
      return rightHeight + 1;
    } else if (root.value > value) {
      const leftHeight = this.depth(value, root.left);
      return leftHeight + 1;
    }
  }
  isbalanced(root = this.root) {
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    if (leftHeight - rightHeight <= 1 && leftHeight - rightHeight >= -1) {
      return true;
    }
    return false;
  }
  rebalanced() {
    const sortedArray = this.inorder();
    this.root = buildTree(sortedArray, 0, sortedArray.length - 1);
  }
}

const tree = new Tree(
  Array.from({ length: 15 }, () => Math.floor(Math.random() * 15))
);
tree.root = buildTree(tree.arr, 0, tree.arr.length - 1);
console.log(tree.isbalanced());
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
tree.insert(100);
tree.insert(99);
tree.insert(98);
tree.insert(97);
console.log(tree.isbalanced());
tree.rebalanced();
console.log(tree.isbalanced());
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
prettyPrint(tree.root);
