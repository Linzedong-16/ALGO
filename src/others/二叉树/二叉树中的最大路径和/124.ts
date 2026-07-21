import { TreeNode, arrayToTree } from '#utils/BinaryTree/index.ts';

function maxPathSum(root: TreeNode | null): number {
  let maxPath = Number.MIN_SAFE_INTEGER;

  const dfs = (node: TreeNode | null): number => {
    if (node === null) {
      return 0;
    }

    const left = Math.max(dfs(node.left), 0);
    const right = Math.max(dfs(node.right), 0);

    maxPath = Math.max(maxPath, left + right + node.val);

    // 要返回单向路径
    return node.val + Math.max(left, right);
  };

  dfs(root);

  return maxPath;
}

// ---------------- Deno 测试 ----------------
import { assertEquals } from '@std/assert';
Deno.test('124.二叉树中的最大路径和', () => {
  console.time('124-test-cost');

  // 示例1 [1,2,3] 输出6
  const tree1 = arrayToTree([1, 2, 3]);
  assertEquals(maxPathSum(tree1), 6);

  // 示例2 [-10,9,20,null,null,15,7] 输出42
  const tree2 = arrayToTree([-10, 9, 20, null, null, 15, 7]);
  assertEquals(maxPathSum(tree2), 42);

  // 全负数单节点
  const tree3 = arrayToTree([-3]);
  assertEquals(maxPathSum(tree3), -3);

  // 单分支负数
  const tree4 = arrayToTree([2, -1]);
  assertEquals(maxPathSum(tree4), 2);

  // 混合正负
  const tree5 = arrayToTree([1, -2, -3, 1, 3, -2, null, -1]);
  assertEquals(maxPathSum(tree5), 3);

  console.timeEnd('124-test-cost');
});
