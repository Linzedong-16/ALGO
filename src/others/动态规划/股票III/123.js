/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
  const dp = new Array(3).fill(0).map(() => new Array(prices.length).fill(0));

  for (let i = 1; i < 3; i++) {
    let maxProfit = dp[i - 1][0] - prices[0];
    for (let j = 1; j < prices.length; j++) {
      maxProfit = Math.max(maxProfit, dp[i - 1][j] - prices[j]);
      dp[i][j] = Math.max(dp[i][j - 1], maxProfit + prices[j]);
    }
  }
  return dp[2][prices.length - 1];
};

/**
 * DP状态压缩版本
 * @param {number[]} prices
 * @return {number}
 */
const maxProfitII = function (prices) {
  let buy1 = -Infinity;
  let sell1 = 0;
  let buy2 = -Infinity;
  let sell2 = 0;

  for (const p of prices) {
    buy1 = Math.max(buy1, -p);
    sell1 = Math.max(sell1, p + buy1);
    buy2 = Math.max(buy2, sell1 - p);
    sell2 = Math.max(sell2, p + buy2);
  }
  return sell2;
};

import { assertEquals } from '@std/assert';
Deno.test('买卖股票最佳时机III', () => {
  console.time('耗时');
  assertEquals(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]), 6);
  assertEquals(maxProfit([1, 2, 3, 4, 5]), 4);
  assertEquals(maxProfit([7, 6, 4, 3, 1]), 0);
  console.timeEnd('耗时');
  console.time('耗时');
  assertEquals(maxProfitII([3, 3, 5, 0, 0, 3, 1, 4]), 6);
  assertEquals(maxProfitII([1, 2, 3, 4, 5]), 4);
  assertEquals(maxProfitII([7, 6, 4, 3, 1]), 0);
  console.timeEnd('耗时');
});
