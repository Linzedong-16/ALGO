/**
 * 合并区间
 * @param {Array<Array<number>>} intervals
 * @returns {Array<Array<number>>} result
 */
var merge = function (intervals) {
  if (intervals.length < 2) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);

  let curr = intervals[0];
  const result = [];
  for (const interval of intervals) {
    if (curr[1] >= interval[0]) {
      curr[1] = Math.max(curr[1], interval[1]);
    } else {
      result.push(curr);
      curr = interval;
    }
  }
  if (curr.length !== 0) result.push(curr);
  return result;
};

console.log(
  merge([
    [1, 3],
    [2, 5],
    [12, 33],
    [2, 6],
    [8, 10],
  ])
);
