/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes = function (nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j] = nums[i];
      j++;
    }
  }
  while (j < nums.length) {
    nums[j] = 0;
    j++;
  }
};

import { assertEquals } from '@std/assert';
Deno.test('移动零', () => {
  const nums = [0, 1, 0, 3, 12];

  moveZeroes(nums);
  assertEquals(nums, [1, 3, 12, 0, 0]);
});
