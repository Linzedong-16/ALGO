/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) {
  const memo = new Array(amount + 1).fill(Infinity);

  function dp(amount) {
    // 递归终点
    if (amount === 0) {
      return 0;
    }
    if (amount < 0) {
      return -1;
    }

    // 剪枝
    if (memo[amount] !== Infinity) {
      return memo[amount];
    }

    // 枚举硬币
    for (const coin of coins) {
      const res = dp(amount - coin);
      if (res !== -1) {
        memo[amount] = Math.min(memo[amount], res + 1);
      }
    }
    if (memo[amount] === Infinity) {
      memo[amount] = -1;
    }
    // 有解
    return memo[amount];
  }

  return dp(amount);
};

import { assertEquals } from '@std/assert';
Deno.test('零钱兑换', () => {
  console.time('耗时');
  assertEquals(coinChange([1, 2, 5], 11), 3);
  assertEquals(coinChange([2], 3), -1);
  assertEquals(coinChange([1], 0), 0);
  assertEquals(coinChange([1], 1), 1);
  assertEquals(coinChange([1], 2), 2);
  console.timeEnd('耗时');
});
