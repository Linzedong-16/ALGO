function searchRange(nums: number[], target: number): number[] {
  // 代码写这里
  const left = binarySearchByEdge();
  if (left === -1) {
    return [-1, -1];
  }
  const right = binarySearchByEdge(false);
  return [left, right];

  function binarySearchByEdge(isLeft = true): number {
    let left = 0,
      right = nums.length - 1;
    let finalIdx = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        finalIdx = mid;
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

    return finalIdx;
  }
}

import { assertEquals } from '@std/assert';
Deno.test('34.在排序数组中查找元素的第一个和最后一个位置', () => {
  console.time('耗时');
  assertEquals(searchRange([5, 7, 7, 8, 8, 10], 8), [3, 4]);
  assertEquals(searchRange([5, 7, 7, 8, 8, 10], 6), [-1, -1]);
  assertEquals(searchRange([], 0), [-1, -1]);
  assertEquals(searchRange([2, 2], 2), [0, 1]);
  console.timeEnd('耗时');
});
