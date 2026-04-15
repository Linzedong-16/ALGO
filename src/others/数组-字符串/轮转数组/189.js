/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function (nums, k) {
  k %= nums.length; // 减少重复轮转次数
  // 修改数组
  //   const temp = nums.splice(nums.length - k, k);
  //   nums.unshift(...temp);
  // 三次翻转
  function reverse(left, right) {
    while (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
  }

  reverse(0, nums.length - 1); // 总体逆序
  reverse(0, k - 1); // 右半
  reverse(k, nums.length - 1); // 左半

  // TODO: 环状替换法
};

import { assertEquals } from '@std/assert';
Deno.test('轮转数组', () => {
  console.time('耗时');
  const nums1 = [1, 2, 3, 4, 5, 6, 7];
  rotate(nums1, 3);
  assertEquals(nums1, [5, 6, 7, 1, 2, 3, 4]);

  const nums2 = [-1, -100, 3, 99];
  rotate(nums2, 2);
  assertEquals(nums2, [3, 99, -1, -100]);
  console.timeEnd('耗时');
});
