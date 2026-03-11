/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
let containsNearbyDuplicate = function (nums, k) {
  // 双指针 + 滑动窗口
  for (let i = 0; i < nums.length - 1; i++) {
    const maxJ = Math.min(i + k, nums.length - 1);
    for (let j = i + 1; j <= maxJ; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }
  return false;
};
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
containsNearbyDuplicate = function (nums, k) {
  // 用Map缓存新节点索引并更新旧节点索引
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) {
      map.set(nums[i], i);
    } else {
      if (i - map.get(nums[i]) <= k) {
        return true;
      }
      map.set(nums[i], i); // 如果太远要更新下，下次可能就成了
    }
  }
  return false;
};

import { assertEquals } from '@std/assert';
Deno.test('重复元素II', () => {
  assertEquals(containsNearbyDuplicate([1, 2, 3, 1], 3), true);
  assertEquals(containsNearbyDuplicate([1, 0, 1, 1], 1), true);
  assertEquals(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2), false);
});
