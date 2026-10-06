function findKthLargest(nums: number[], k: number): number {
  function partition(nums: number[], left: number, right: number): number {
    const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
    const pivot = nums[pivotIdx];
    [nums[pivotIdx], nums[left]] = [nums[left], nums[pivotIdx]];

    let i = left + 1;
    let j = right;
    while (true) {
      while (i <= j && nums[i] < pivot) {
        i++;
      }
      while (i <= j && nums[j] > pivot) {
        j--;
      }
      if (i >= j) {
        break;
      }
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
    [nums[left], nums[j]] = [nums[j], nums[left]];
    return j;
  }

  const n = nums.length;
  const targetIndex = n - k;
  let l = 0,
    r = n - 1;
  while (true) {
    const pos = partition(nums, l, r);
    if (pos === targetIndex) {
      return nums[pos];
    }
    if (pos > targetIndex) {
      r = pos - 1;
    } else {
      l = pos + 1;
    }
  }
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
