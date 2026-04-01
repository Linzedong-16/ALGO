/**
 * JS简单版快速排序
 * @param {number[]} arr
 * @returns {number[]}
 */
export function quickSortWithExtraArr(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[Math.floor(arr.length / 2)];

  const left = arr.filter((x) => x < pivot);
  const mid = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);

  return [...quickSortWithExtraArr(left), ...mid, ...quickSortWithExtraArr(right)];
}

/**
 * 快速排序标准版
 * @param {number[]} arr
 * @returns {number[]}
 */
export function quickSort(arr) {}
