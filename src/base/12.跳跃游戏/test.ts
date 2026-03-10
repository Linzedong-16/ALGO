/**
 * 跳跃游戏(贪心)
 * @param nums
 * @returns canJump
 */
function canJumpByGreedy(nums: Array<number>): boolean {
  let maxJump = nums.length - 1; // 从终点逆推

  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] + i >= maxJump) {
      maxJump = i;
    }
  }

  return maxJump === 0;
}
console.log(canJumpByGreedy([2, 2, 1, 2, 4]));

/**
 * 动态规划
 * @param nums
 * @returns
 */
function canJump(nums: Array<number>): boolean {
  const length = nums.length;
  /**
   * 0: 未规划;
   * 1: 可通行;
   * -1: 不可通行
   */
  const memo = Array(length).fill(0);

  // 必须初始化终点记号
  memo[length - 1] = 1;

  /**
   * @param position
   * @returns isAccessed
   */
  function jump(position: number): boolean {
    if (memo[position] === 1) {
      return true;
    }
    if (memo[position] === -1) {
      return false;
    }

    const maxJump = Math.min(position + nums[position], length - 1);
    for (let i = position + 1; i <= maxJump; i++) {
      const res = jump(i);
      if (res) {
        memo[position] = 1;
        return true;
      }
    }
    memo[position] = -1;
    return false;
  }

  return jump(0);
}

console.log(canJump([2, 2, 1, 0, 4]));
