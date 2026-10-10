// 空函数（待实现）
function partitionLabels(s: string): number[] {
  const char: Array<number> = new Array(26).fill(0);

  // 统计最后出现的索引
  for (let i = 0; i < s.length; i++) {
    char[s.charCodeAt(i) - 97] = i;
  }

  // 遍历计算切片
  const res: Array<number> = new Array<number>();
  let start = 0;
  let end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, char[s.charCodeAt(i) - 97]);
    if (end === i) {
      res.push(i - start + 1);
      start = i + 1;
    }
  }
  return res;
}

import { assertEquals } from '@std/assert';

Deno.test('763. 划分字母区间', () => {
  console.time('耗时');
  // 示例 1
  assertEquals(partitionLabels('ababcbacadefegdehijhklij'), [9, 7, 8]);
  // 示例 2
  assertEquals(partitionLabels('eccbbbbdec'), [10]);
  // 额外测试用例（可选）
  assertEquals(partitionLabels('abc'), [1, 1, 1]);
  assertEquals(partitionLabels('aaaaa'), [5]);
  console.timeEnd('耗时');
});
