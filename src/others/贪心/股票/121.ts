function maxProfit(prices: number[]): number {
  let leftPoint = Infinity;
  let res = 0;
  for (const price of prices) {
    leftPoint = Math.min(leftPoint, price);
    res = Math.max(res, price - leftPoint);
  }
  return res;
}

import { assertEquals } from '@std/assert';
Deno.test('121.买卖股票的最佳时机', () => {
  console.time('耗时');
  assertEquals(maxProfit([7, 1, 5, 3, 6, 4]), 5);
  assertEquals(maxProfit([7, 6, 4, 3, 1]), 0);
  assertEquals(maxProfit([2, 4, 1]), 2);
  assertEquals(maxProfit([1]), 0);
  assertEquals(maxProfit([3, 2, 6, 5, 0, 3]), 4);
  console.timeEnd('耗时');
});
