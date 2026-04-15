/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) {
  let j = 1; // 容量 只少为1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[j++] = nums[i];
    }
  }
  return j;
};

import { assertEquals } from '@std/assert';
Deno.test('删除数组重复项', () => {
  console.time('耗时');
  assertEquals(removeDuplicates([1, 1, 2]), 2);
  assertEquals(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]), 5);
  console.timeEnd('耗时');
});
