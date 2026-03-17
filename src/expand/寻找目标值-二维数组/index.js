/**
 * @param {number[][]} plants
 * @param {number} target
 * @return {boolean}
 */
const findTargetIn2DPlants = function (plants, target) {
  // 记忆化数组，避免递归出现重复访问某个坐标
  const memo = [];
  for (let i = 0; i < plants.length; i++) {
    memo.push(new Array(plants[0].length).fill(0));
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  function find(x, y) {
    if (x >= plants.length || y >= plants[0].length || memo[x][y] === 1) {
      return false;
    }
    memo[x][y] = 1;
    if (plants[x][y] > target) {
      return false;
    }
    if (plants[x][y] === target) {
      return true;
    }
    return find(x + 1, y) || find(x, y + 1);
  }

  return find(0, 0);
};

import { assertEquals } from '@std/assert';
Deno.test('寻找目标值-二维数组', () => {
  assertEquals(
    findTargetIn2DPlants(
      [
        [2, 3, 6, 8],
        [4, 5, 8, 9],
        [5, 9, 10, 12]
      ],
      8
    ),
    true
  );
});
