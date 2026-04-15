/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy = function (ratings) {
  const left = new Array(ratings.length).fill(0);
  // 从左往右比较缓存分配的糖
  for (let i = 0; i < ratings.length; i++) {
    if (i > 0 && ratings[i] > ratings[i - 1]) {
      // 分数高就比左边的多拿 1 粒
      left[i] = left[i - 1] + 1;
    } else {
      // 首位或评分不必左边的高保底 1粒
      left[i] = 1;
    }
  }
  let sum = 0;
  // 从右往左计算分配的糖并加总
  let right = 1; // 保底都有1粒
  for (let i = ratings.length - 1; i >= 0; i--) {
    if (i < ratings.length - 1 && ratings[i] > ratings[i + 1]) {
      // 比右边的高就在右边基础上加1粒
      right++;
    } else {
      // 保底给1粒
      right = 1;
    }
    // 同时满足必须选最大的
    sum += Math.max(right, left[i]);
  }
  return sum;
};

import { assertEquals } from '@std/assert';
Deno.test('糖果分发', () => {
  assertEquals(candy([1, 0, 2]), 5);
  assertEquals(candy([1, 2, 2]), 4);
});
