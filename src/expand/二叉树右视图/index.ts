import { arrayToTree, type TreeNode } from '#utils/BinaryTree/index.ts';

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

/**
 * 层序遍历找最右侧即可
 * @param root
 * @returns
 */
function rightSideView(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  const res: number[] = [];
  const queue: TreeNode[] = [root];
  // 队列不能为空
  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;

      if (i === levelSize - 1) {
        // 只加当前层级最右侧元素
        res.push(node.val);
      }

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return res;
}

import { assertEquals } from '@std/assert';
Deno.test('右视图-层序遍历', () => {
  assertEquals(rightSideView(arrayToTree([1, 2, 3, null, 5, null, 4])), [1, 3, 4]);
});
