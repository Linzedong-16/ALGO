/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = function (nums, target) {
  const leftIdx = binarySearch(true);
  if (leftIdx === -1) {
    return [-1, -1];
  }
  const rightIdx = binarySearch(false);
  return [leftIdx, rightIdx];
  /**
   * 向左 或 右查找目标索引
   * @param {boolean} isLeft
   * @returns {number} idx
   */
  function binarySearch(isLeft) {
    let idx = -1;
    let left = 0;
    let right = nums.length;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        idx = mid;
        if (isLeft) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return idx;
  }
};

import { assertEquals } from '@std/assert';
Deno.test('在排序数组中查找元素的第一个和最后一个位置', () => {
  console.time('耗时');
  assertEquals(searchRange([5, 7, 7, 8, 8, 10], 8), [3, 4]);
  assertEquals(searchRange([5, 7, 7, 8, 8, 10], 6), [-1, -1]);
  assertEquals(searchRange([], 0), [-1, -1]);
  console.timeEnd('耗时');
});
