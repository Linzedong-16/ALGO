function merge(intervals: Array<Array<number>>): Array<Array<number>> {
  if (intervals.length < 2) {
    return intervals;
  }
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  const result = new Array<Array<number>>();
  let curr = intervals[0];
  for (const interval of intervals) {
    if (curr[1] > interval[0]) {
      curr[1] = Math.max(curr[1], interval[1]);
    } else {
      result.push(curr);
      curr = interval;
    }
  }
  if (curr.length !== 0) {
    result.push(curr);
  }
  return result;
}

console.log(
  merge([
    [1, 3],
    [2, 5],
    [12, 33],
    [2, 6],
    [8, 10]
  ])
);
