// 空函数，自己实现逻辑
function findKthLargest(nums: number[], k: number): number {
  function partition(arr: number[], left: number, right: number): number {
    const pivotIdx = Math.floor(Math.random() * (right - left + 1)) + left;
    const pivotVal = arr[pivotIdx];

    // 先将基准值放到最右侧方便后续交换
    [arr[right], arr[pivotIdx]] = [arr[pivotIdx], arr[right]];
    const r = right;

    while (left < right) {
      while (left < right && arr[left] <= pivotVal) {
        left++;
      }
      while (left < right && arr[right] >= pivotVal) {
        right--;
      }
      if (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
      }
    }
    [arr[left], arr[r]] = [arr[r], arr[left]];
    return left;
  }

  function quickSelect(arr: number[], left: number, right: number, targetIdx: number): number {
    const mid = partition(arr, left, right);

    if (mid === targetIdx) {
      return arr[mid];
    } else if (mid > targetIdx) {
      return quickSelect(arr, left, mid - 1, targetIdx);
    } else {
      return quickSelect(arr, mid + 1, right, targetIdx);
    }
  }

  const targetIdx = nums.length - k;
  return quickSelect(nums, 0, nums.length - 1, targetIdx);
}

import { assertEquals } from '@std/assert';

Deno.test('215.数组中的第K个最大元素', () => {
  console.time('耗时');
  assertEquals(findKthLargest([3, 2, 1, 5, 6, 4], 2), 5);
  assertEquals(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4);
  assertEquals(findKthLargest([1], 1), 1);
  assertEquals(findKthLargest([2, 1], 1), 2);
  assertEquals(findKthLargest([7, 6, 5, 4, 3, 2, 1], 5), 3);
  console.timeEnd('耗时');
});
