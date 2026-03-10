/**
 * 终点的所有路径
 * @param {number} m 列数
 * @param {number} n 行数
 * @returns {number} res
 */
const uniquePaths = function (m, n) {
  const memo = [];
  for (let i = 0; i < n; i++) {
    memo.push([]); // 每个数组固定长 m
  }
  for (let i = 0; i < m; i++) {
    memo[0][i] = 1;
  }
  for (let i = 0; i < n; i++) {
    memo[i][0] = 1;
  }

  for (let row = 1; row < n; row++) {
    for (let col = 1; col < m; col++) {
      memo[row][col] = memo[row - 1][col] + memo[row][col - 1];
    }
  }
  return memo[n - 1][m - 1];
};

console.log(uniquePaths(7, 3));
