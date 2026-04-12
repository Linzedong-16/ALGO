/**
 * @param {number[]} fruits
 * @return {number}
 */
const totalFruit = function (fruits) {
  // 哈希 + 滑动窗口
  const map = new Map();
  let left = 0; // 仅用于计算水果数
  let max = 0;
  for (let i = 0; i < fruits.length; i++) {
    map.set(fruits[i], i);

    let minIdx = fruits.length - 1;
    while (map.size > 2) {
      // 删除索引小的那个
      for (const [, idx] of map) {
        if (idx < minIdx) {
          minIdx = idx;
        }
      }
      map.delete(fruits[minIdx]); // 删除该水果
      left = minIdx + 1; // 跳过该水果
    }
    max = Math.max(max, i - left + 1);
  }
  return max;
};

import { assertEquals } from '@std/assert';
Deno.test('水果成篮', () => {
  console.time('耗时');
  assertEquals(totalFruit([1, 2, 1]), 3);
  assertEquals(totalFruit([0, 1, 2, 2]), 3);
  assertEquals(totalFruit([1, 2, 3, 2, 2]), 4);
  assertEquals(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]), 5);
  console.timeEnd('耗时');
});
