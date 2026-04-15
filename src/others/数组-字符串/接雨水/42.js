/**
 * @param {number[]} height
 * @return {number}
 */
const trap = function (height) {
  /**
   * 每个位置上的元素左侧高的边界
   */
  const leftEdge = new Array(height.length).fill(0);
  /**
   * 每个位置上的元素右侧高的边界
   */
  const rightEdge = new Array(height.length).fill(0);
  // 初始化左右边界数组
  let max = 0;

  for (let i = 1; i < height.length; i++) {
    max = Math.max(max, height[i - 1]);
    leftEdge[i] = max;
  }
  max = 0;
  for (let i = height.length - 2; i >= 0; i--) {
    max = Math.max(max, height[i + 1]);
    rightEdge[i] = max;
  }

  // 开始接雨水
  let volume = 0;
  for (let i = 0; i < height.length; i++) {
    const std = Math.min(leftEdge[i], rightEdge[i]);
    if (std > height[i]) {
      volume += std - height[i];
    }
  }

  return volume;
};

import { assertEquals } from '@std/assert';
Deno.test('接雨水', () => {
  assertEquals(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
  assertEquals(trap([4, 2, 0, 3, 2, 5]), 9);
});
