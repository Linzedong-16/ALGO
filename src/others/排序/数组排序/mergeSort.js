/**
 *
 * @param {number[]} arr
 * @returns {number[]} res
 */
export function mergeSort(arr) {
  // 无需再分
  if (arr.length < 2) {
    return arr;
  }
  /**
   *
   * @param {number[]} left
   * @param {number[]} right
   * @returns {number[]} res
   */
  function merge(left, right) {
    let res = [];
    let l = 0,
      r = 0;
    while (l < left.length && r < right.length) {
      if (left[l] <= right[r]) {
        res.push(left[l++]);
      } else {
        res.push(right[r++]);
      }
    }

    // 必坑：JS的concat不会修改原数组，会返回新数组
    if (l < left.length) {
      res = res.concat(left.slice(l));
    }
    if (r < right.length) {
      res = res.concat(right.slice(r));
    }
    return res;
  }

  const mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid, arr.length));
  return merge(left, right);
}
