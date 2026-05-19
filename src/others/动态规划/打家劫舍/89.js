import { assertEquals } from '@std/assert';

/**
 * 打家劫舍（自下而上）
 * 数组、动态规划
 * @param {number[]} nums
 * @return {number}
 */
const rob = function (nums) {
  const memo = new Array(nums.length);
  memo[0] = nums[0];
  memo[1] = Math.max(nums[1], memo[0]);

  //   let max = 0;
  for (let i = 2; i < nums.length; i++) {
    memo[i] = Math.max(nums[i] + memo[i - 2], memo[i - 1]);
    // max = Math.max(max, memo[i]);
  }
  //   return max;
  return memo[nums.length - 1];
};

/**
 * 打家劫舍（自上而下）
 * 数组、动态规划
 * @param {number[]} nums
 * @return {number}
 */
const robAgain = function (nums) {
  const memo = new Array(nums.length);

  /**
   *
   * @param {number} idx
   */
  function dp(idx) {
    // 已缓存
    if (memo[idx] !== undefined) {
      return memo[idx];
    }

    if (idx === 0) {
      return nums[0];
    }
    if (idx === 1) {
      return nums[1];
    }

    memo[idx] = Math.max(nums[idx] + dp(idx - 2), dp(idx - 1));

    return memo[idx];
  }

  return dp(nums.length - 1);
};

Deno.test('英法函数测试', () => {
  assertEquals(rob([1, 2, 3, 1]), 4);
  assertEquals(rob([2, 7, 9, 3, 1]), 12);

  assertEquals(robAgain([1, 2, 3, 1]), 4);
  assertEquals(robAgain([2, 7, 9, 3, 1]), 12);
});
