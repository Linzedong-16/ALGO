/**
 *
 * @param {number[]} arr
 * @returns {number[]} res
 */
export function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  /**
   *
   * @param {number[]} left
   * @param {number[]} right
   * @returns {number[]}
   */
  function merge(left, right) {
    let res = [];
    let l = 0,
      r = 0;
    while (l < left.length && r < right.length) {
      if (left[l] <= right[r]) {
        res.push(left[l]);
        l++;
      } else {
        res.push(right[r]);
        r++;
      }
    }

    if (l < left.length) {
      res = res.concat(...left.slice(l));
    }
    if (r < right.length) {
      res = res.concat(...right.slice(r));
    }
    return res;
  }

  return merge(left, right);
}
