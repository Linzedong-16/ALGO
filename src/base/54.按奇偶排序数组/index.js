/**
 * 按奇偶排序数组
 * 数组、双指针
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArrayByParity = function (nums) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    if (nums[left] % 2 === 0) {
      left++;
    } else if (nums[right] % 2 !== 0) {
      right--;
    } else {
      [nums[left], nums[right]] = [nums[right], nums[left]];
    }
  }
  return nums;
};

import { assertEquals } from '@std/assert';
Deno.test('按奇偶排序数组', () => {
  assertEquals(sortArrayByParity([3, 1, 2, 4]), [4, 2, 1, 3]);
});
