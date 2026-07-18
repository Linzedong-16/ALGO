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

function rightSideView(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  const res: Array<number> = [];
  const queue: Array<TreeNode> = [root];

  while (queue.length !== 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const currNode = queue.shift();
      if (currNode?.left) {
        queue.push(currNode.left);
      }
      if (currNode?.right) {
        queue.push(currNode.right);
      }
      if (i === size - 1) {
        res.push(currNode?.val!);
      }
    }
  }

  return res;
}

import { assertEquals } from '@std/assert';
Deno.test('二叉树的右视图', () => {
  console.time('耗时');
  // 用例1：基础示例 [1,2,3,null,5,null,4]
  const tree1 = arrayToTree([1, 2, 3, null, 5, null, 4]);
  assertEquals(rightSideView(tree1), [1, 3, 4]);

  // 用例2：只有右子树 [1,null,3]
  const tree2 = arrayToTree([1, null, 3]);
  assertEquals(rightSideView(tree2), [1, 3]);

  // 用例3：只有左子树 [1,2,null,3,null,4]
  const tree3 = arrayToTree([1, 2, null, 3, null, 4]);
  assertEquals(rightSideView(tree3), [1, 2, 3, 4]);

  // 用例4：单节点
  const tree4 = arrayToTree([5]);
  assertEquals(rightSideView(tree4), [5]);

  // 用例5：空树
  const tree5 = arrayToTree([]);
  assertEquals(rightSideView(tree5), []);
  console.timeEnd('耗时');
});
