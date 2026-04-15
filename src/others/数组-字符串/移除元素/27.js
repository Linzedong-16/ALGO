/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = function (nums, val) {
  let j = 0;
  if (nums.length < 1) {
    return 0;
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[j++] = nums[i];
    }
  }
  return j;
};

import { assertEquals } from '@std/assert';
Deno.test('移除元素', () => {
  console.time('耗时');
  assertEquals(removeElement([3, 2, 2, 3], 3), 2);
  assertEquals(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2), 5);
  console.timeEnd('耗时');
});
