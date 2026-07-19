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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length === 0) {
    return null;
  }
  const root = new TreeNode(preorder[0]);

  // 切片
  const rootIdxOfInOrderList = inorder.indexOf(preorder[0]);
  const leftInOrderList = inorder.slice(0, rootIdxOfInOrderList);
  const rightInOrderList = inorder.slice(rootIdxOfInOrderList + 1);

  const leftPreOrderList = preorder.slice(1, 1 + leftInOrderList.length);
  const rightPreOrderList = preorder.slice(1 + leftInOrderList.length);

  root.left = buildTree(leftPreOrderList, leftInOrderList);
  root.right = buildTree(rightPreOrderList, rightInOrderList);

  return root;
}

import { assertEquals } from '@std/assert';
Deno.test('从前序与中序遍历序列构造二叉树', () => {
  console.time('耗时');
  // 用例1：LeetCode 标准示例
  const pre1 = [3, 9, 20, 15, 7];
  const in1 = [9, 3, 15, 20, 7];
  const tree1 = buildTree(pre1, in1);
  assertEquals(treeToArray(tree1), [3, 9, 20, null, null, 15, 7]);

  // 用例2：单节点树
  const pre2 = [-1];
  const in2 = [-1];
  const tree2 = buildTree(pre2, in2);
  assertEquals(treeToArray(tree2), [-1]);

  // 用例3：只有左斜树
  const pre3 = [1, 2, 3];
  const in3 = [3, 2, 1];
  const tree3 = buildTree(pre3, in3);
  assertEquals(treeToArray(tree3), [1, 2, null, 3]);

  console.timeEnd('耗时');
});
