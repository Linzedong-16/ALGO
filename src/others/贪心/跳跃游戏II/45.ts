function jump(nums: number[]): number {
  // 请在此处填写你的解法
  let step = 0;
  let eachStepEdge = 0;
  let maxJump = 0;

  for (let i = 0; i <= nums.length - 2; i++) {
    maxJump = Math.max(maxJump, nums[i] + i);

    if (i === eachStepEdge) {
      step++;
      eachStepEdge = maxJump;
    }
  }
  return step;
}

import { assertEquals } from '@std/assert';

Deno.test('45.跳跃游戏 II', () => {
  console.time('耗时');
  // 示例 1
  assertEquals(jump([2, 3, 1, 1, 4]), 2);
  // 示例 2
  assertEquals(jump([2, 3, 0, 1, 4]), 2);
  console.timeEnd('耗时');
});
