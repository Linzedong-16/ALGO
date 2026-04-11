/**
 * @param {number[]} citations
 * @return {number}
 */
const hIndex = function (citations) {
  // 排序
  citations.sort((a, b) => a - b);
  let h = 0;
  for (let i = citations.length - 1; i >= 0; i--) {
    if (citations[i] >= h + 1) {
      h++;
    }
  }
  return h;
};

import { assertEquals } from '@std/assert';
Deno.test('H指数', () => {
  assertEquals(hIndex([3, 0, 6, 1, 5]), 3);
  assertEquals(hIndex([1, 3, 1]), 1);
});
