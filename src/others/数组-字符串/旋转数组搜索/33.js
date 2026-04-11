/**
 * 搜索旋转排序数组
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  if (nums.length === 1) {
    return nums[0] === target ? 0 : -1;
  }
  // 使用二分查找
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    // 向下取整
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    // 先确认哪边有序在哪边使用二分查找
    // 因为是向下取整的mid，mid是有可能等于left的
    if (nums[left] <= nums[mid]) {
      // 说明左边是有序部分
      if (nums[mid] > target && target >= nums[left]) {
        // 缩小有序区间
        right = mid - 1;
      } else {
        // 去另一半边找
        left = mid + 1;
      }
    } else {
      // 右边有序
      if (nums[mid] < target && target <= nums[right]) {
        // 缩小这个有序区间查找
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
};

import { assertEquals } from '@std/assert';
Deno.test('旋转数组搜索', () => {
  console.time('耗时');
  assertEquals(search([4, 5, 6, 7, 0, 1, 2], 0), 4);
  assertEquals(search([4, 5, 6, 7, 0, 1, 2], 3), -1);
  assertEquals(search([1], 0), -1);
  console.timeEnd('耗时');
});
