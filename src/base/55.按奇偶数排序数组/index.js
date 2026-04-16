/**
 * 按奇偶排序数组 II
 * 数组、双指针
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArrayByParityII = function (nums) {
  let odd = 1;
  for (let i = 0; i < nums.length; i += 2) {
    if (nums[i] % 2 !== 0) {
      while (nums[odd] % 2 !== 0) {
        odd += 2;
      }
      [nums[i], nums[odd]] = [nums[odd], nums[i]];
    }
  }
  return nums;
};

import { assertEquals } from '@std/assert';
Deno.test('奇偶排序II', () => {
  assertEquals(sortArrayByParityII([4, 2, 5, 7]), [4, 5, 2, 7]);
});
