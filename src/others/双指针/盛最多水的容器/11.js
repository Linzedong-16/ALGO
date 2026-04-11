/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function (height) {
  // 双指着向内收缩
  let maxVolume = 0;
  let left = 0,
    right = height.length - 1;
  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    maxVolume = Math.max(maxVolume, width * h);
    if (height[left] === height[right]) {
      left++;
      right--;
    } else if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxVolume;
};

import { assertEquals } from '@std/assert';
Deno.test('盛最多水的容器', () => {
  console.time('耗时');
  assertEquals(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49);
  assertEquals(maxArea([1, 1]), 1);
  console.timeEnd('耗时');
});
