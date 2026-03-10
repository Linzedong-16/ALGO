import { assertEquals } from '@std/assert';

/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = function (nums) {
  // 动态规划，自下而上
  const memo = [];
  // 第一家打劫
  memo[0] = nums[0];
  // 要不要打劫第二家？
  memo[1] = Math.max(memo[0], nums[1]);

  // 第三家或其他需斟酌
  for (let i = 2; i < nums.length; i++) {
    // 是(当前 + 前前家) Or 前一家
    memo[i] = Math.max(memo[i - 2] + nums[i], memo[i - 1]);
  }

  return memo[nums.length - 1];
};

/**
 * 这次试试自上而下
 * @param {number[]} nums
 * @return {number}
 */
const robAgain = function (nums) {
  const memo = new Array(nums.length);

  /**
   * dp函数
   * @param {number} idx
   * @returns {number} sum
   */
  function dp(idx) {
    if (memo[idx] !== undefined) {
      return memo[idx];
    }
    // 确定动态规划的结束边界条件
    if (idx === 0) {
      memo[idx] = nums[idx];
      return memo[idx];
    }
    if (idx === 1) {
      memo[idx] = Math.max(dp(0), nums[idx]);
      return memo[idx];
    }

    // >= 3 情况: 是(当前 + 前前家) Or 前一家
    memo[idx] = Math.max(dp(idx - 1), dp(idx - 2) + nums[idx]);
    return memo[idx];
  }

  return dp(nums.length - 1);
};

Deno.test('英法函数测试', () => {
  assertEquals(rob([1, 2, 3, 1]), 4);

  assertEquals(robAgain([1, 2, 3, 1]), 4);
});
