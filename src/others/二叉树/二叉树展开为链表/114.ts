import { TreeNode, arrayToTree, treeToArray } from '#utils/BinaryTree/index.ts';

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
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  // 递归法
  //   if (root === null) {
  //     return;
  //   }
  //   const leftNode = root.left;
  //   const rightNode = root.right;
  //   flatten(leftNode);
  //   flatten(rightNode);
  //   root.left = null;
  //   root.right = leftNode;
  //   let p = root;
  //   while (p.right) {
  //     p = p.right;
  //   }
  //   p.right = rightNode;
  // 迭代法

  let curr = root;
  while (curr !== null) {
    // 节点是否有左数（无则直接换下一个节点）
    if (curr.left) {
      // 把整个左子树接到右子树前面
      let prev = curr.left;
      while (prev.right !== null) {
        prev = prev.right;
      }
      // 把左子树的按照先序遍历的左子树中最后一个元素指向目前元素的右子树
      prev.right = curr.right;
      curr.right = curr.left;
      // 取消左子树
      curr.left = null;
    }
    curr = curr.right;
  }
}

import { assertEquals } from '@std/assert';
Deno.test('二叉树展开为链表', () => {
  console.time('耗时');
  // 用例1：题目示例1
  const tree1 = arrayToTree([1, 2, 5, 3, 4, null, 6]);
  flatten(tree1);
  // 展开后层序结果：1, null, 2, null, 3, null, 4, null, 5, null, 6
  assertEquals(treeToArray(tree1), [1, null, 2, null, 3, null, 4, null, 5, null, 6]);

  // 用例2：空树
  const tree2 = arrayToTree([]);
  flatten(tree2);
  assertEquals(treeToArray(tree2), []);

  // 用例3：单节点
  const tree3 = arrayToTree([7]);
  flatten(tree3);
  assertEquals(treeToArray(tree3), [7]);

  // 用例4：只有左子树 [1,2,null,3]
  const tree4 = arrayToTree([1, 2, null, 3]);
  flatten(tree4);
  assertEquals(treeToArray(tree4), [1, null, 2, null, 3]);

  // 用例5：只有右子树 [1,null,2,null,3]
  const tree5 = arrayToTree([1, null, 2, null, 3]);
  flatten(tree5);
  assertEquals(treeToArray(tree5), [1, null, 2, null, 3]);
  console.timeEnd('耗时');
});
