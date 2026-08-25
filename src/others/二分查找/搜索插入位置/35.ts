function searchInsert(nums: number[], target: number): number {
  //二分查找代码写这里
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

import { assertEquals } from '@std/assert';
Deno.test('35.搜索插入位置', () => {
  console.time('耗时');
  assertEquals(searchInsert([1, 3, 5, 6], 5), 2);
  assertEquals(searchInsert([1, 3, 5, 6], 2), 1);
  assertEquals(searchInsert([1, 3, 5, 6], 7), 4);
  assertEquals(searchInsert([1, 3, 5, 6], 0), 0);
  assertEquals(searchInsert([1], 1), 0);
  console.timeEnd('耗时');
});
