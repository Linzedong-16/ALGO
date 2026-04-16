/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (k, prices) {
  // 股票III通用形态 次数从[0, k]之间
  const dp = new Array(k + 1).fill(0).map(() => new Array(prices.length).fill(0));

  for (let i = 1; i < k + 1; i++) {
    let max = dp[i - 1][0] - prices[0];
    for (let j = 1; j < prices.length; j++) {
      max = Math.max(max, dp[i - 1][j] - prices[j]);
      dp[i][j] = Math.max(dp[i][j - 1], max + prices[j]);
    }
  }

  // 第 k 次 最大利润
  return dp[k][prices.length - 1];
};

import { assertEquals } from '@std/assert';
Deno.test('巴菲特IV', () => {
  console.time('耗时');
  assertEquals(maxProfit(2, [2, 4, 1]), 2);
  assertEquals(maxProfit(2, [3, 2, 6, 5, 0, 3]), 7);
  console.timeEnd('耗时');
});
