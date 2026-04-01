/**
 * @param {number[]} height
 * @return {number}
 */
const trap = function (height) {
  if (height.length < 3) {
    return 0;
  }
  // 数组缓存策略
  const leftEdge = new Array(height.length).fill(0);
  const rightEdge = new Array(height.length).fill(0);

  // 左右缓存数组记录每个元素左右方向上的最大边界
  let max = 0; // 暂存左右方向上出现过的最高点
  for (let i = 1; i < height.length; i++) {
    max = Math.max(max, height[i - 1]);
    leftEdge[i] = max;
  }

  max = 0;
  for (let j = height.length - 2; j >= 0; j--) {
    max = Math.max(max, height[j + 1]);
    rightEdge[j] = max;
  }

  // 计算水量
  let volume = 0;
  for (let i = 0; i < height.length; i++) {
    const h = Math.min(leftEdge[i], rightEdge[i]);
    if (h - height[i] > 0) {
      volume += h - height[i];
    }
  }

  return volume;
};

import { assertEquals } from '@std/assert';
Deno.test('接雨水', () => {
  assertEquals(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
  assertEquals(trap([4, 2, 0, 3, 2, 5]), 9);
});
