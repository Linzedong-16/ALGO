/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }

  // 先排序
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];
  let curr = intervals[0];
  for (const arr of intervals) {
    // 获取区间边界
    if (curr[1] >= arr[0]) {
      // 要比较哪个更大
      curr[1] = Math.max(curr[1], arr[1]);
    } else {
      result.push([...curr]);
      curr = arr;
    }
  }
  result.push(curr);
  return result;
};

import { assertEquals } from '@std/assert';
Deno.test('合并区间', () => {
  console.time('耗时');
  assertEquals(
    merge([
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18]
    ]),
    [
      [1, 6],
      [8, 10],
      [15, 18]
    ]
  );
  assertEquals(
    merge([
      [1, 4],
      [4, 5]
    ]),
    [[1, 5]]
  );
  assertEquals(
    merge([
      [4, 7],
      [1, 4]
    ]),
    [[1, 7]]
  );
  console.timeEnd('耗时');
});
