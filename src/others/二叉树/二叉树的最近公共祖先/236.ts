import { TreeNode, findNode, arrayToTree } from '#utils/BinaryTree/index.ts';

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

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (root === null || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left !== null && right !== null) {
    return root;
  }

  return left ?? right;
}

import { assertEquals } from '@std/assert';
Deno.test('二叉树的最近公共祖先', () => {
  console.time('耗时');
  // 示例1
  const arr1 = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];
  const root1 = arrayToTree(arr1);
  const p1 = findNode(root1, 5)!;
  const q1 = findNode(root1, 1)!;
  const ans1 = lowestCommonAncestor(root1, p1, q1);
  assertEquals(ans1?.val, 3);

  // 示例2
  const arr2 = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];
  const root2 = arrayToTree(arr2);
  const p2 = findNode(root2, 5)!;
  const q2 = findNode(root2, 4)!;
  const ans2 = lowestCommonAncestor(root2, p2, q2);
  assertEquals(ans2?.val, 5);

  // 边界：p是q的祖先
  const arr3 = [1, 2];
  const root3 = arrayToTree(arr3);
  const p3 = findNode(root3, 1)!;
  const q3 = findNode(root3, 2)!;
  const ans3 = lowestCommonAncestor(root3, p3, q3);
  assertEquals(ans3?.val, 1);

  // 单节点树
  const arr4 = [5];
  const root4 = arrayToTree(arr4);
  const p4 = findNode(root4, 5)!;
  const q4 = findNode(root4, 5)!;
  const ans4 = lowestCommonAncestor(root4, p4, q4);
  assertEquals(ans4?.val, 5);
  console.timeEnd('耗时');
});
