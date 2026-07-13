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

function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return [];
  }
  const res: number[][] = [];
  const queue = [root];
  while (queue.length > 0) {
    const len = queue.length;
    const curr = [];
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      curr.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    res.push([...curr]);
  }
  return res;
}

import { assertEquals } from '@std/assert';
// Deno单元测试
Deno.test('levelOrder 测试用例1：标准示例树 [3,9,20,null,null,15,7]', () => {
  console.time('case1耗时');
  const root = arrayToTree([3, 9, 20, null, null, 15, 7]);
  const res = levelOrder(root);
  assertEquals(res, [[3], [9, 20], [15, 7]]);
  console.timeEnd('case1耗时');
});

Deno.test('levelOrder 测试用例2：空树', () => {
  console.time('case2耗时');
  const root = arrayToTree([]);
  const res = levelOrder(root);
  assertEquals(res, []);
  console.timeEnd('case2耗时');
});

Deno.test('levelOrder 测试用例3：只有根节点 [1]', () => {
  console.time('case3耗时');
  const root = arrayToTree([1]);
  const res = levelOrder(root);
  assertEquals(res, [[1]]);
  console.timeEnd('case3耗时');
});

Deno.test('levelOrder 测试用例4：只有左子树 [1,2,null,3]', () => {
  console.time('case4耗时');
  const root = arrayToTree([1, 2, null, 3]);
  const res = levelOrder(root);
  assertEquals(res, [[1], [2], [3]]);
  console.timeEnd('case4耗时');
});
