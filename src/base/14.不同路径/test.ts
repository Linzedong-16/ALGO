/**
 * 网格抵达终点的所有路径
 * @param m 列数
 * @param n 行数
 */
function uniquePath(m: number, n: number) {
  const memo = new Array<Array<number>>();
  for (let i = 0; i < n; i++) {
    memo.push([]);
  }
  for (let i = 0; i < m; i++) {
    memo[0][i] = 1;
  }
  for (let i = 0; i < n; i++) {
    memo[i][0] = 1;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      memo[i][j] = memo[i - 1][j] + memo[i][j - 1];
    }
  }
  return memo[n - 1][m - 1];
}

console.log(uniquePath(7, 3));
