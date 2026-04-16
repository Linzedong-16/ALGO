/**
 * 除自身以外数组的乘积
 * 数组、前缀和
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function (nums) {
  const result = new Array(nums.length).fill(1);
  let prod = 1;

  // 左向 求该元素左边所有元素乘积
  for (let i = 0; i < nums.length; i++) {
    result[i] *= prod;
    prod *= nums[i]; // 缓存当前的积，为下一次准备
  }
  prod = 1;
  // 右向
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= prod;
    prod *= nums[i];
  }

  return result;
};

import { assertEquals } from '@std/assert';
Deno.test('除自身以外数组乘积', () => {
  assertEquals(productExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6]);
});
