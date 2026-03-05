/**
 * 可以买多次了 超时了
 * @param {number[]} prices
 * @returns {number} profit
 */
function maxProfit(prices) {
  let profit = 0;
  let leftMinPoint = prices[0];
  let rightMaxPoint = prices[0];

  let i = 0;
  while (i < prices.length - 1) {
    // 找低点
    while (prices[i] >= prices[i + 1] && i < prices.length - 1) {
      i++;
    }
    leftMinPoint = prices[i];
    // 找顶点
    while (prices[i] <= prices[i + 1] && i < prices.length - 1) {
      i++;
    }
    rightMaxPoint = prices[i];
    profit += rightMaxPoint - leftMinPoint;
  }
  return profit;
}
/**
 * 可以买多次了 贪心优化
 * @param {number[]} prices
 * @returns {number} profit
 */
function maxProfitV2(prices) {
  let profit = 0;

  for (let i = 0; i < prices.length - 1; i++) {
    const res = prices[i + 1] - prices[i];
    profit += res > 0 ? res : 0;
  }
  return profit;
}

Deno.test('巴菲特函数2', () => {
  console.log(maxProfit([7, 1, 5, 3, 6, 4]));
  console.log(maxProfitV2([7, 1, 5, 3, 6, 4]));
});
