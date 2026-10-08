function canJump(nums: number[]): boolean {
  // 请在此处填写你的解法

  let step = nums.length - 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] + i >= step) {
      step = i;
    }
  }
  return step === 0;
}

import { assertEquals } from '@std/assert';

Deno.test('55.跳跃游戏', () => {
  console.time('耗时');
  // 示例 1
  assertEquals(canJump([2, 3, 1, 1, 4]), true);
  // 示例 2
  assertEquals(canJump([3, 2, 1, 0, 4]), false);
  console.timeEnd('耗时');
});
