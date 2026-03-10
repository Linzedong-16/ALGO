function climbStairs(n: number) {
  const memo = new Array<number>(n + 1);
  memo[1] = 1;
  memo[2] = 2;

  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
}

console.log(climbStairs(4));
