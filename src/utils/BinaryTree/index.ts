export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// LeetCode 数组 转 二叉树
export function arrayToTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) {
    return null;
  }

  const root = new TreeNode(arr[0]!);
  const queue: (TreeNode | null)[] = [root];
  let i = 1;

  while (queue.length && i < arr.length) {
    const node = queue.shift()!;

    // 左孩子
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]!);
      queue.push(node.left);
    }
    i++;

    // 右孩子
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]!);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

/**
 * 和 arrayToTree 配对：二叉树转LeetCode格式数组，反向函数
 * @param root 树节点
 * @returns LeetCode扁平化数组
 */
export function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) {
    return [];
  }
  const res: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  let idx = 0;
  while (queue.length && idx !== Infinity) {
    const node = queue.shift()!;
    if (node) {
      res.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      res.push(null);
    }
    idx++;
  }
  // 去掉末尾连续的null，和Leet‑Code输出保持一致
  while (res.length > 0 && res[res.length - 1] === null) {
    res.pop();
  }
  return res;
}
