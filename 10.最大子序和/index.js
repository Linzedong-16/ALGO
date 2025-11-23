/**
 * 动态规划典型：跟着状态(memo[i]的确定)走，每步都选最优，最后全局最优
 * @param {Array<number>} num
 * @returns {number} max
 */
var maxSubArray = (num) => {
  let max = num[0]; // 要返回的最大值(数组只有一个元素返回起始位)
  let memo = []; // 连续数组计算序列和计算值，将数组每个元素看作一个子数组
  memo[0] = max; // 起始位数组: [ num[0] ]
  for (let i = 1; i < num.length; i++) {
    memo[i] = Math.max(num[i] + memo[i - 1], num[i]);
    max = Math.max(memo[i], max); // max自更新,全局最大值
    // max = Math.max(memo[i], memo[i - 1]); // 全局最大值会丢失
  }
  return max;
};

const num = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

console.log(maxSubArray(num));
