import { TreeNode, treeToArray } from '#utils/BinaryTree/index.ts';

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

function sortedArrayToBST(nums: number[]): TreeNode | null {
  function build(left: number, right: number): TreeNode | null {
    if (left > right) {
      return null;
    }

    const mid = Math.floor((left + right) / 2);
    const lNode = build(left, mid - 1);
    const rNode = build(mid + 1, right);
    return new TreeNode(nums[mid], lNode, rNode);
  }
  return build(0, nums.length - 1);
}

import { assertEquals } from '@std/assert';
Deno.test('将有序数组转换为二叉搜索树', () => {
  console.time('耗时');
  // case1
  const root1 = sortedArrayToBST([-10, -3, 0, 5, 9]);
  const expectArr1 = [0, -10, 5, null, -3, null, 9];
  assertEquals(treeToArray(root1), expectArr1);

  // case2
  const root2 = sortedArrayToBST([1, 3]);
  const expectArr2 = [1, null, 3];
  assertEquals(treeToArray(root2), expectArr2);

  // case3 空数组
  const root3 = sortedArrayToBST([]);
  assertEquals(treeToArray(root3), []);
  console.timeEnd('耗时');
});
