/**
 * 买卖股票最佳时机
 * 数组、动态规划、贪心
 * @param {number[]} prices
 * @returns {number} prefit
 */
function maxProfit(prices) {
  let maxProfit = 0;
  let leftMinPoint = Infinity;
  const leftPricesArr = [];

  for (const price of prices) {
    leftPricesArr.push(price);
    leftMinPoint = Math.min(...leftPricesArr, leftMinPoint);
    maxProfit = Math.max(maxProfit, price - leftMinPoint);
  }
  return maxProfit;
}
/**
 * 买卖股票最佳时机(优化：减去剩余开支，减少逻辑冗余)
 * 数组、动态规划、贪心
 * @param {number[]} prices
 * @returns {number} prefit
 */
function maxProfitV2(prices) {
  let maxProfit = 0;
  let leftMinPoint = Infinity;

  for (const price of prices) {
    leftMinPoint = Math.min(price, leftMinPoint);
    maxProfit = Math.max(maxProfit, price - leftMinPoint);
  }
  return maxProfit;
}

Deno.test('巴菲特函数', () => {
  console.log(maxProfit([7, 1, 5, 3, 6, 4]));
  console.log(maxProfitV2([7, 1, 5, 3, 6, 4]));
  console.log(maxProfitV2([7, 6, 4, 3, 1]));
});
