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

function isSymmetric(root: TreeNode | null): boolean {
  if (root === null) {
    return true;
  }

  const check = (n1: TreeNode | null, n2: TreeNode | null): boolean => {
    if (n1 === null && n2 === null) {
      return true;
    }
    if (n1 === null || n2 === null) {
      return false;
    }

    return n1.val === n2.val && check(n1.left, n2.right) && check(n1.right, n2.left);
  };

  return check(root.left, root.right);
}

import { assertEquals } from '@std/assert';
Deno.test('对称二叉树', () => {
  console.time('耗时');

  // 示例1：输入 [1,2,2,3,4,4,3] 预期结果true
  const tree1 = arrayToTree([1, 2, 2, 3, 4, 4, 3]);
  assertEquals(isSymmetric(tree1), true);

  // 示例2：输入 [1,2,2,null,3,null,3] 预期结果false
  const tree2 = arrayToTree([1, 2, 2, null, 3, null, 3]);
  assertEquals(isSymmetric(tree2), false);

  // 边界用例：空树
  const tree3 = arrayToTree([]);
  assertEquals(isSymmetric(tree3), true);

  // 只有根节点
  const tree4 = arrayToTree([1]);
  assertEquals(isSymmetric(tree4), true);

  console.timeEnd('耗时');
});
