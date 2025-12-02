/**
 * 爬楼梯问题：爬一步、两步，爬法
 * 第 n 级台阶 前一步 从 (n-1)阶爬上来 或 (n-2)阶爬上来，共两类，这两类细分共有多少种，则第 n 阶就有几个爬法
 * @param {number} n
 * @returns {number}
 */
var climbStairs = function (n) {
  const memo = [];
  memo[1] = 1;
  memo[2] = 2;
  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
};

console.log(climbStairs(1));
console.log(climbStairs(4));
