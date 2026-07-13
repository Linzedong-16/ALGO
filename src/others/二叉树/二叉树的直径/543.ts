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

function diameterOfBinaryTree(root: TreeNode | null): number {
  let max = 0;
  function depth(root: TreeNode | null): number {
    if (root === null) {
      return 0;
    }
    const left = depth(root.left);
    const right = depth(root.right);

    max = Math.max(max, left + right);

    return Math.max(left, right) + 1;
  }
  depth(root);
  return max;
}

import { assertEquals } from '@std/assert';
Deno.test('二叉树直径', () => {
  console.time('耗时');
  // case1：LeetCode原题示例，最长直径经过根节点 \[1,2,3,4,5\]
  //         1
  //       2   3
  //      4 5
  // 路径：4‑2‑5，边数=2；4‑2‑1‑3，边数=3，答案3
  const tree1 = arrayToTree([1, 2, 3, 4, 5]);
  assertEquals(diameterOfBinaryTree(tree1), 3);

  // case2：核心反例：最长直径不出现在根节点，你的旧版代码会失败
  //        1
  //      2
  //    3   4
  //   5     6
  // 节点2：左深度2，右深度2，直径4；根节点1得到3；最终答案4
  const tree2 = arrayToTree([1, 2, null, 3, 4, 5, null, null, 6]);
  assertEquals(diameterOfBinaryTree(tree2), 4);

  // case3：单边树（全部节点只在左侧）
  // 1‑2‑3‑4‑5，最长直径为4（全部是一条链）
  const tree3 = arrayToTree([1, 2, null, 3, null, 4, null, 5]);
  assertEquals(diameterOfBinaryTree(tree3), 4);

  // case4：只有根节点，没有子节点
  const tree4 = arrayToTree([10]);
  assertEquals(diameterOfBinaryTree(tree4), 0);

  // case5：空树
  const tree5 = arrayToTree([]);
  assertEquals(diameterOfBinaryTree(tree5), 0);

  // case6：复杂深层树，最长直径在下层子树里
  //               1
  //        2              8
  //    3      4
  //  5   6 7  9
  //10
  // 节点2处：left=2(5‑3‑10), right=2(7‑4‑9) → left+right =4，全局最大值
  const tree6 = arrayToTree([1, 2, 8, 3, 4, null, null, 5, 6, 7, 9, 10]);
  assertEquals(diameterOfBinaryTree(tree6), 5);

  // 树结构：
  //        1
  //    2       3
  //   4         5
  //  6           7
  // 左深度3，右深度3，根节点直径=3+3=6
  const tree7 = arrayToTree([1, 2, 3, 4, null, null, 5, 6, null, null, 7]);
  assertEquals(diameterOfBinaryTree(tree7), 6);

  console.timeEnd('耗时');
});
