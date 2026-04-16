/**
 * 水果成篮
 * 数组、滑动窗口、哈希表
 * @param {number[]} fruits
 * @return {number}
 */
const totalFruit = function (fruits) {
  /**
   * 记录两个篮子中的水果的最后出现索引
   * @type {Map<number,number>}
   */
  const map = new Map();

  /**
   * 指向篮子前一种水果的初始索引
   */
  let j = 0;

  /**
   * 篮子水果数，参数是fruits>=1的
   */
  let max = 1;

  for (let i = 0; i < fruits.length; i++) {
    // 添加篮子水果
    map.set(fruits[i], i);

    if (map.size > 2) {
      // 找索引最小的那个，移动指针j
      let minIdx = fruits.length - 1;
      let fruit;
      for (const [f, idx] of map) {
        if (minIdx > idx) {
          minIdx = idx;
          fruit = f;
        }
      }
      j = minIdx + 1;
      map.delete(fruit);
    }

    // 篮子最多装多少
    max = Math.max(max, i - j + 1);
  }

  return max;
};

import { assertEquals } from '@std/assert';
Deno.test('水果成篮', () => {
  assertEquals(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]), 5);
});
