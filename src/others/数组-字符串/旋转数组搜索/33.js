/**
 * 搜索旋转排序数组 O(logn) 二分查找变种
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  if (nums.length < 2) {
    nums[0] === target ? 0 : -1;
  }
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }

    // 判断哪边有序，至少有一边有序
    if (nums[left] <= nums[mid]) {
      // 左边有序
      if (target >= nums[left] && target < nums[mid]) {
        // 在该区间 right收缩
        right = mid - 1;
      } else {
        // 不在哦
        left = mid + 1;
      }
    } else {
      // 右边有序
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};

import { assertEquals } from '@std/assert';
Deno.test('搜索旋转排序数组', () => {
  console.time('耗时');
  assertEquals(search([4, 5, 6, 7, 0, 1, 2], 0), 4);
  assertEquals(search([4, 5, 6, 7, 0, 1, 2], 3), -1);
  assertEquals(search([1], 0), -1);
  console.timeEnd('耗时');
});
