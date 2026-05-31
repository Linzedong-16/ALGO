/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function (nums) {
  const memo = new Array(nums.length).fill(1);

  let pre = 1;
  for (let i = 1; i < nums.length; i++) {
    pre *= nums[i - 1];
    memo[i] *= pre;
  }

  pre = 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    pre *= nums[i + 1];
    memo[i] *= pre;
  }

  return memo;
};

import { assertEquals } from '@std/assert';
Deno.test('除自身以外数组乘积', () => {
  console.time('耗时');
  assertEquals(productExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6]);
  assertEquals(productExceptSelf([-1, 1, 0, -3, 3]), [0, 0, 9, 0, 0]);
  console.timeEnd('耗时');
});
