/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  if (nums.length < 3) {
    return [];
  }
  /**
   * @type {number[][]}
   */
  const res = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    // i 重复跳过
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        // 同时向内收缩
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        left++;
        while (left < right && nums[right] === nums[left - 1]) {
          right--;
        }
        right--;
      } else if (sum > 0) {
        // right 选小
        while (left < right && nums[right] === nums[left - 1]) {
          right--;
        }
        right--;
      } else {
        // left 选大
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        left++;
      }
    }
  }
  return res;
};

import { assertEquals } from '@std/assert';
Deno.test('三数之和', () => {
  console.time('耗时');
  assertEquals(threeSum([-1, 0, 1, 2, -1, -4]), [
    [-1, -1, 2],
    [-1, 0, 1]
  ]);
  assertEquals(threeSum([0, 1, 1]), []);
  assertEquals(threeSum([0, 0, 0]), [[0, 0, 0]]);
  console.timeEnd('耗时');
});
