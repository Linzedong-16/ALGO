// H指数 例1
// 至少有 1 篇论文被引用了 >= 1 次
// 至少有 2 篇论文被引用了 >= 2 次
// 至少有 3 篇论文被引用了 >= 3 次
// 没有 4 篇论文被引用了 >= 4 次
// 没有 5 篇论文被引用了 >= 5 次
// 所以 H指数为 3

/**
 * @param {number[]} citations
 * @return {number}
 */
const hIndex = function (citations) {
  let H = 0;
  for (let h = 1; h <= citations.length; h++) {
    if (citations.filter((freq) => freq >= h).length >= h) {
      H = Math.max(H, h);
    }
  }
  return H;
};
/**
 * @param {number[]} citations
 * @return {number}
 */
const hIndexII = function (citations) {
  citations.sort((a, b) => a - b); // 从小到大，小的成立直接返回
  for (let i = 0; i < citations.length; i++) {
    // 该论文次数 >= 5，4，3，2，1 次数，符合其一后续无需判断
    if (citations[i] >= citations.length - i) {
      return citations.length - i;
    }
  }
  return 0;
};
/**
 * @param {number[]} citations
 * @return {number}
 */
const hIndexIII = function (citations) {};

import { assertEquals } from '@std/assert';
Deno.test('H指数', () => {
  console.time('耗时');
  assertEquals(hIndex([3, 0, 6, 1, 5]), 3);
  assertEquals(hIndex([1, 3, 1]), 1);
  console.timeEnd('耗时');
  console.time('耗时');
  assertEquals(hIndexII([3, 0, 6, 1, 5]), 3);
  assertEquals(hIndexII([1, 3, 1]), 1);
  console.timeEnd('耗时');
});
