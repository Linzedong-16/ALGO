// 347. 前 K 个高频元素
function topKFrequent(nums: number[], k: number): number[] {
  const mapper = new Map<number, number>();
  for (const n of nums) {
    if (mapper.has(n)) {
      mapper.set(n, mapper.get(n)! + 1);
    } else {
      mapper.set(n, 1);
    }
  }
  const arr = [...mapper];

  const res: number[] = arr.sort((a, b) => b[1] - a[1]).map((a) => a[0]);

  return res.slice(0, k);
}

import { assertEquals } from '@std/assert';

Deno.test('347.前 K 个高频元素', () => {
  console.time('耗时');
  // 注意：本题输出不要求顺序，所以我们排序后再断言，消除顺序带来的测试失败
  const sortArr = (arr: number[]) => [...arr].sort((a, b) => a - b);

  assertEquals(sortArr(topKFrequent([1, 1, 1, 2, 2, 3], 2)), sortArr([1, 2]));
  assertEquals(sortArr(topKFrequent([1], 1)), sortArr([1]));
  assertEquals(sortArr(topKFrequent([1, 2, 1, 2, 1, 2, 3, 1, 3, 2], 2)), sortArr([1, 2]));

  console.timeEnd('耗时');
});
