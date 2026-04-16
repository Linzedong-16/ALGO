import { assertEquals } from '@std/assert';

/**
 * 买卖股票最佳时机 III
 * 数组、动态规划、贪心
 * @param {number[]} prices
 * @returns {number} profit
 */
function maxProfit(prices) {
  // 动态规划问题
  const dp = new Array(3).fill(0).map(() => new Array(prices.length).fill(0));

  // 从（1，1）开始遍历
  for (let i = 1; i < 3; i++) {
    // 由 p[j] - p[n] + dp[i - 1][n] (n = 0,1,2...prices.length - 1)推导而来，每一层的 j 下p[j]就是常量，- p[n] + dp[i - 1][n] 是确定最大利润主要因素
    // 而如果直接每一层 的 j都要重复计算 - p[n] + dp[i - 1][n] 势必带来更高时间复杂度
    // 只通过一个 maxProfit 确定 当前的 j 之前的列 中出现的 maxProfit 最大值并缓存，就能减少重复计算与比较
    let maxProfit = dp[i - 1][0] - prices[0]; // 核心比较公式，可避免重复计算，每个 i 层的初始化都为 n = 0
    for (let j = 1; j < prices.length; j++) {
      dp[i][j] = Math.max(dp[i][j - 1], maxProfit + prices[j]); // 要补充p[j]，不然逻辑并不完整不符合状态转移方程
      maxProfit = Math.max(dp[i - 1][j] - prices[j], maxProfit); // 把最大利润的值更新为当前格的最大利润
    }
  }

  return dp[2][prices.length - 1];
}

Deno.test('巴菲特3', () => {
  assertEquals(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]), 6);
  assertEquals(maxProfit([1, 2, 3, 4, 5]), 4);
  assertEquals(maxProfit([7, 6, 4, 3, 1]), 0);
});
