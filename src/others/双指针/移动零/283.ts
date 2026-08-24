/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      [nums[fast], nums[slow]] = [nums[slow], nums[fast]];
      slow++;
    }
  }
}

import { assertEquals } from '@std/assert';
Deno.test('移动零', () => {
  console.time('耗时');
  const arr1 = [0, 1, 0, 3, 12];
  moveZeroes(arr1);
  assertEquals(arr1, [1, 3, 12, 0, 0]);

  const arr2 = [0];
  moveZeroes(arr2);
  assertEquals(arr2, [0]);

  const arr3 = [1, 0];
  moveZeroes(arr3);
  assertEquals(arr3, [1, 0]);

  const arr4 = [1, 2, 3];
  moveZeroes(arr4);
  assertEquals(arr4, [1, 2, 3]);
  console.timeEnd('耗时');
});
