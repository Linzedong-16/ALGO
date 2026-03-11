import { assertEquals } from '@std/assert';

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = function (nums) {
  // 其实用Set更切合题目意思
  const map = new Map();
  for (const num of nums) {
    if (map.has(num)) {
      return true;
    } else {
      map.set(num, 1);
    }
  }
  return false;
};

Deno.test('存在重复元素测试', () => {
  assertEquals(containsDuplicate([1, 2, 3, 1]), true);
});
