/**
 * 跳跃游戏 - Top-Down 动态规划
 * @param {Array<number>} nums
 * @returns {boolean} result 该数组是否可抵达最后一个位置
 */
var canJump = function (nums) {
  const totalLength = nums.length;
  const memo = Array(totalLength).fill(0); // 缓存数组记录点位是否通路
  memo[totalLength - 1] = 1;
  /**
   * 该点是否可通
   * @param {number} position 索引值
   */
  const jump = (position) => {
    if (memo[position] === 1) return true;
    if (memo[position] === -1) return false;

    // 对比最大索引与当前位置可移动最大位置
    const maxJump = Math.min(position + nums[position], totalLength - 1);

    for (let i = position + 1; i <= maxJump; i++) {
      const jumpRes = jump(i); // 递归
      if (jumpRes === true) {
        memo[position] = 1;
        return true;
      }
    }
    memo[position] = -1;
    return false;
  };

  const result = jump(0);
  return result;
};

console.log(canJump([2, 2, 1, 0, 4]));

/**
 * 跳跃游戏 - Bottom-Up 动态规划
 * @param {Array<number>} nums
 * @returns {boolean} result 该数组是否可抵达最后一个位置
 */
var canJump = function (nums) {
  const totalLength = nums.length;
  const memo = Array(totalLength).fill(0); // 缓存数组记录点位是否通路
  memo[totalLength - 1] = 1;

  for (let i = totalLength - 2; i > 0; i--) {
    const maxJump = Math.min(nums[i] + i, totalLength - 1); // 当前位置最大步数
    for (let j = i + 1; j <= maxJump; j++) {
      if (memo[j] === 1) {
        memo[i] = 1;
        break;
      }
    }
  }
  if (memo[0] === 1) {
    return true;
  } else {
    return false;
  }
};

console.log(canJump([2, 2, 1, 0, 4]));

/**
 * 跳跃游戏 - 贪心算法
 * 将算法进一步简化，把很多对比、标记通路的步骤，简化替换为 只要够得着 就是通路
 * @param {Array<number>} nums
 * @returns {boolean} result 该数组是否可抵达最后一个位置
 */
var canJump = function (nums) {
  let maxJump = nums.length - 1; // 需要抵达的最远位置
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] + i >= maxJump) {
      maxJump = i;
    }
  }
  return maxJump === 0; // 完全通路的情况是只要抵达0号位即可到达终点
};

console.log(canJump([2, 2, 1, 2, 4]));
