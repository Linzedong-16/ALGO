/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersection = function (nums1, nums2) {
  const set = new Set(nums1);
  const set2 = new Set();
  for (const num of nums2) {
    if (set.has(num)) {
      set2.add(num);
    }
  }
  return [...set2];
};

import { assertEquals } from '@std/assert';
Deno.test('数组交集', () => {
  console.time('耗时');
  assertEquals(intersection([1, 2, 2, 1], [2, 2]), [2]);
  assertEquals(intersection([4, 9, 5], [9, 4, 9, 8, 4]), [9, 4]);
  console.timeEnd('耗时');
});
