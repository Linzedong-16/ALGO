/**
 *
 * @param height 高度
 */
function trap(height: number[]): number {
  let volume = 0;

  const leftEdge = new Array(height.length).fill(0);
  const rightEdge = new Array(height.length).fill(0);

  let max = 0;
  for (let i = 1; i < height.length; i++) {
    max = Math.max(height[i - 1], max);
    leftEdge[i] = max;
  }
  max = 0;
  for (let i = height.length - 2; i >= 0; i--) {
    max = Math.max(max, height[i + 1]);
    rightEdge[i] = max;
  }

  for (let i = 0; i < height.length; i++) {
    const std = Math.min(leftEdge[i], rightEdge[i]);
    if (std > height[i]) {
      volume += std - height[i];
    }
  }

  return volume;
}

import { assertEquals } from '@std/assert';
Deno.test('接雨水', () => {
  console.time('耗时');
  assertEquals(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
  assertEquals(trap([4, 2, 0, 3, 2, 5]), 9);
  console.timeEnd('耗时');
});
