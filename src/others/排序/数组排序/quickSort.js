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
export function quickSort(arr) {
  /**
   *
   * @param {number[]} arr
   * @param {number} left
   * @param {number} right
   */
  function qs(arr, left = 0, right = arr.length - 1) {
    // 优化I: 对于升序子数组不做处理
    let isOrdered = true;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        isOrdered = false;
        break;
      }
    }
    if (isOrdered) {
      return;
    }

    // 就一个长度的或没有子数组了
    if (left >= right) {
      return;
    }
    if (left < right) {
      const pivotIdx = partition(arr, left, right);
      qs(arr, left, pivotIdx - 1);
      qs(arr, pivotIdx + 1, right);
    }
  }

  /**
   * 严格按照正统的快排方式书写
   * @param {number[]} arr
   * @param {number} left
   * @param {number} right
   * @returns {number} pivotIdx
   */
  function partition(arr, left, right) {
    // 优化II: 选取随机值作为基准值，降低超时概率
    const randIdx = Math.floor(Math.random() * (right - left + 1)) + left;
    [arr[randIdx], arr[right]] = [arr[right], arr[randIdx]];

    let i = left - 1; // 小于等于基准值的最后一个比较元素的索引
    // right作为基准值，必须<right遍历
    for (let j = left; j < right; j++) {
      if (arr[j] <= arr[right]) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
  }

  qs(arr);

  return arr;
}
