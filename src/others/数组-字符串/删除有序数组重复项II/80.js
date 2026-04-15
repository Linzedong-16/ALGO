/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) {
  // 频率统计
  // const map = new Map();
  // let j = 0;
  // for (let i = 0; i < nums.length; i++) {
  //   map.set(nums[i], (map.get(nums[i]) || 0) + 1); // 统计频率
  //   if (map.get(nums[i]) <= 2) {
  //     nums[j++] = nums[i];
  //   }
  // }
  // return j;
  // 双指针
  let j = 2;
  if (nums.length < 3) {
    return j;
  }
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[j - 2]) {
      nums[j++] = nums[i];
    }
  }
  return j;
};

import { assertEquals } from '@std/assert';
Deno.test('删除数组重复项II', () => {
  console.time('耗时');
  assertEquals(removeDuplicates([1, 1, 1, 2, 2, 3]), 5);
  assertEquals(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]), 7);
  console.timeEnd('耗时');
});
