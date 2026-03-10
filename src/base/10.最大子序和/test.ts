/**
 * 1. Base on Dynamic Programming
 * @param {Array<number>} nums
 * @returns {number} max
 */
function maxSubArray(nums: Array<number>): number {
  const memo = new Array<number>(nums.length); // 记录出现过的所有连续子数组的和
  let max = 0; // 标记 memo数组出现的最大和
  memo[0] = nums[0]; // 初始变量

  for (let i = 1; i < nums.length; i++) {
    memo[i] = Math.max(memo[i - 1] + nums[i], nums[i]); // 选择是继承之前的连续子数组的和还是重新计数
    max = Math.max(max, memo[i]);
  }
  console.log('The memo:', memo);
  return max;
}
const num = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

console.log(maxSubArray(num));

// nums: -2,  1,  -3,  4, -1,  2,  1, -5,  4
// memo: -2,  1,  -2,  4,  3,  5,  6,  1,  5
// max :  0,  1,   1,  4,  4,  5,  6,  6,  6
