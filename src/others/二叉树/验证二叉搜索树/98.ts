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

function isValidBST(root: TreeNode | null): boolean {
  const func = (node: TreeNode | null, left: number, right: number): boolean => {
    if (node === null) {
      return true;
    }
    if (node.val <= left || node.val >= right) {
      return false;
    }

    return func(node.left, left, node.val) && func(node.right, node.val, right);
  };

  return func(root, -Infinity, Infinity);
}

import { assertEquals } from '@std/assert';
Deno.test('验证二叉搜索树', () => {
  console.time('耗时');
  // 用例1：示例1 [2,1,3] 合法BST
  const tree1 = arrayToTree([2, 1, 3]);
  assertEquals(isValidBST(tree1), true);

  // 用例2：示例2 [5,1,4,null,null,3,6] 不合法
  const tree2 = arrayToTree([5, 1, 4, null, null, 3, 6]);
  assertEquals(isValidBST(tree2), false);

  // 用例3：单节点
  const tree3 = arrayToTree([1]);
  assertEquals(isValidBST(tree3), true);

  // 用例4：存在相等值 [3,3]
  const tree4 = arrayToTree([3, 3]);
  assertEquals(isValidBST(tree4), false);

  // 用例5：深层越界 [5,4,6,null,null,3,7]，6的左子树3小于5
  const tree5 = arrayToTree([5, 4, 6, null, null, 3, 7]);
  assertEquals(isValidBST(tree5), false);

  // 用例6：空树
  const tree6 = arrayToTree([]);
  assertEquals(isValidBST(tree6), true);
  console.timeEnd('耗时');
});
