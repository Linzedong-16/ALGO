/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
const search = function (nums, target) {};

import { assertEquals } from '@std/assert';
Deno.test('搜索旋转排序数组II', () => {
  console.time('耗时');
  assertEquals(search([2, 5, 6, 0, 0, 1, 2], 0), true);
  assertEquals(search([2, 5, 6, 0, 0, 1, 2], 3), false);
  console.timeEnd('耗时');
});
