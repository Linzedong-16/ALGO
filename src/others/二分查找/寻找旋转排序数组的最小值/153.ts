function findMin(nums: number[]): number {
  if (nums.length === 0) {
    return -1;
  }
  if (nums[0] <= nums[nums.length - 1]) {
    return nums[0];
  }

  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      return nums[mid + 1];
    }
    if (nums[mid] < nums[mid - 1]) {
      return nums[mid];
    }

    if (nums[mid] < nums[left]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

import { assertEquals } from '@std/assert';
Deno.test('153.寻找旋转排序数组中的最小值', () => {
  console.time('耗时');
  assertEquals(findMin([3, 4, 5, 1, 2]), 1);
  assertEquals(findMin([4, 5, 6, 7, 0, 1, 2]), 0);
  assertEquals(findMin([11, 13, 15, 17]), 11);
  assertEquals(findMin([1]), 1);
  assertEquals(findMin([2, 1]), 1);
  assertEquals(findMin([1, 2, 3]), 1);
  console.timeEnd('耗时');
});
