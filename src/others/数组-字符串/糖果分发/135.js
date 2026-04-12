/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy = function (ratings) {
  const left = new Array(ratings.length).fill(1);

  // 左边独立比较
  for (let i = 0; i < ratings.length; i++) {
    if (i > 0 && ratings[i] > ratings[i - 1]) {
      left[i] = left[i - 1] + 1; //比前一个多 1 颗
    } else {
      left[i] = 1;
    }
  }

  let right = 0;
  let total = 0;
  // 右边独立比较
  for (let j = ratings.length - 1; j >= 0; j--) {
    if (j < ratings.length - 1 && ratings[j] > ratings[j + 1]) {
      right++; // right 暂存上一个元素的分配数
    } else {
      right = 1;
    }
    total += Math.max(left[j], right);
  }
  return total;
};

import { assertEquals } from '@std/assert';
Deno.test('糖果分发', () => {
  assertEquals(candy([1, 0, 2]), 5);
  assertEquals(candy([1, 2, 2]), 4);
});
