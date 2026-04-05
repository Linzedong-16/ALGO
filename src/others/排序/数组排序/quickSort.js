/**
 * JS简单版快速排序
 * @param {number[]} arr
 * @returns {number[]}
 */
export function quickSortWithExtraArr(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivotIdx = arr.length - 1;
  const left = arr.filter((x) => x < arr[pivotIdx]);
  const mid = arr.filter((x) => x === arr[pivotIdx]);
  const right = arr.filter((x) => x > arr[pivotIdx]);

  return [...quickSortWithExtraArr(left), ...mid, ...quickSortWithExtraArr(right)];
}

/**
 * 快速排序标准版
 * @param {number[]} arr
 * @returns {number[]}
 */
export function quickSort(arr) {
  function qs(left = 0, right = arr.length - 1) {
    // 直到子数组剩下 不多于 1 个时退出
    if (left >= right) {
      return;
    }

    if (left < right) {
      // 将数组分类并选取基准
      const pivotIdx = partition(left, right);
      // 递归排序子数组
      qs(left, pivotIdx - 1);
      qs(pivotIdx + 1, right);
    }
  }
  function partition(left, right) {
    const pivot = arr[right];
    let j = left - 1;
    for (let i = left; i < right; i++) {
      if (arr[i] <= pivot) {
        j++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[j + 1], arr[right]] = [arr[right], arr[j + 1]];
    return j + 1;
  }
  qs();
  return arr;
}
