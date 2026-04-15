/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = function (nums) {
  // 擂台赛
  //   let ans,
  //     hp = 0;
  //   for (const num of nums) {
  //     if (ans === undefined || hp === 0) {
  //       ans = num;
  //       hp = 1;
  //     } else {
  //       if (num === ans) {
  //         hp++;
  //       } else {
  //         hp--;
  //       }
  //     }
  //   }
  //   return ans;
  // 摩尔投票
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (candidate === nums[i]) {
      count++;
    } else {
      count--;
      if (count === 0) {
        candidate = nums[i];
        count = 1;
      }
    }
  }
  return candidate;
};

import { assertEquals } from '@std/assert';
Deno.test('多数元素', () => {
  console.time('耗时');
  assertEquals(majorityElement([3, 2, 3]), 3);
  assertEquals(majorityElement([2, 2, 1, 1, 1, 2, 2]), 2);
  console.timeEnd('耗时');
});
