import { TreeNode, arrayToTree } from '#utils/BinaryTree/index.ts';

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function kthSmallest(root: TreeNode | null, k: number): number {
  /// 1. 速刷方法
  // const res: number[] = [];
  // const inOrder = (node: TreeNode | null): void => {
  //   if (node === null) {
  //     return;
  //   }
  //   inOrder(node.left);
  //   res.push(node.val);
  //   inOrder(node.right);
  // };
  // inOrder(root);
  // return res[k - 1];

  /// 2.计数迭代方法
  let count = 0;
  let curr: TreeNode | null = root;
  const stack: TreeNode[] = [];

  while (curr !== null || stack.length !== 0) {
    // 走最左边找最小值
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    // 此时 curr === null
    curr = stack.pop()!;
    count++;
    if (count === k) {
      return curr.val;
    }
    curr = curr.right;
  }

  return -1;
}

import { assertEquals } from '@std/assert';
Deno.test('二叉搜索树中第K小的元素', () => {
  console.time('耗时');
  // 示例1
  {
    const arr = [3, 1, 4, null, 2];
    const root = arrayToTree(arr);
    assertEquals(kthSmallest(root, 1), 1, '示例1 k=1');
  }

  // 示例2
  {
    const arr = [5, 3, 6, 2, 4, null, null, 1];
    const root = arrayToTree(arr);
    assertEquals(kthSmallest(root, 3), 3, '示例2 k=3');
  }

  // 边界：单节点树
  {
    const arr = [1];
    const root = arrayToTree(arr);
    assertEquals(kthSmallest(root, 1), 1, '单节点树');
  }

  // 左斜链树 4->3->2->1
  {
    const arr = [4, 3, null, 2, null, 1];
    const root = arrayToTree(arr);
    assertEquals(kthSmallest(root, 2), 2, '左斜树 k=2');
    assertEquals(kthSmallest(root, 4), 4, '左斜树 k=4');
  }

  // 右斜链树 1->2->3->4
  {
    const arr = [1, null, 2, null, 3, null, 4];
    const root = arrayToTree(arr);
    assertEquals(kthSmallest(root, 3), 3, '右斜树 k=3');
  }
  console.timeEnd('耗时');
});
