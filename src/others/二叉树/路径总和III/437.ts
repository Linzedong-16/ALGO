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

function pathSum(root: TreeNode | null, targetSum: number): number {
  // 暴力枚举
  if (root === null) {
    return 0;
  }
  /**
   * 递归函数
   * @param node 当前节点
   * @param sum 当前累计值
   * @returns 满足路径数量
   */
  const dfs = (node: TreeNode | null, sum: number) => {
    if (node === null) {
      return 0;
    }
    /**
     * 满足的路径数量
     */
    let count = 0;
    sum += node.val;

    if (sum === targetSum) {
      count++;
    }

    count += dfs(node.left, sum);
    count += dfs(node.right, sum);
    return count;
  };

  return dfs(root, 0) + pathSum(root?.left, targetSum) + pathSum(root?.right, targetSum);
}

import { assertEquals } from '@std/assert';
Deno.test('路径总和III', () => {
  console.time('耗时');
  // 用例1 LeetCode 示例1
  const tree1 = arrayToTree([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);
  assertEquals(pathSum(tree1, 8), 3);

  // 用例2 连续节点累加
  const tree2 = arrayToTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]);
  assertEquals(pathSum(tree2, 22), 3);

  // 用例3 单节点匹配
  const tree3 = arrayToTree([2]);
  assertEquals(pathSum(tree3, 2), 1);

  // 用例4 单节点不匹配
  const tree4 = arrayToTree([2]);
  assertEquals(pathSum(tree4, 3), 0);

  // 用例5 空树
  const tree5 = arrayToTree([]);
  assertEquals(pathSum(tree5, 0), 0);

  // 用例6 负数节点
  const tree6 = arrayToTree([0, 0, 0, 0, 0]);
  assertEquals(pathSum(tree6, 0), 11);
  console.timeEnd('耗时');
});
