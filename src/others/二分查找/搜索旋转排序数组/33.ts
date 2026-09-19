function search(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // 左半边有序
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // 右半边有序
    else {
      if (nums[right] >= target && target > nums[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

import { assertEquals } from '@std/assert';
Deno.test('33.搜索旋转排序数组', () => {
  console.time('耗时');
  assertEquals(search([4, 5, 6, 7, 0, 1, 2], 0), 4);
  assertEquals(search([4, 5, 6, 7, 0, 1, 2], 3), -1);
  assertEquals(search([1], 0), -1);
  assertEquals(search([1, 3], 3), 1);
  console.timeEnd('耗时');
});
