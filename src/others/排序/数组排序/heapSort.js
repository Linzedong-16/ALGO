// 简单版
/**
 * 数学公式推到结论：
 * 左孩子下标：2 * i + 1
 * 右孩子下标：2 * i + 2
 * 父节点下标：Math.floor((i - 1) / 2)
 * 最后一个非叶子节点下标：Math.floor(元素个数 / 2) - 1
 *
 */

/**
 * 堆排序
 * @param {number[]} arr
 * @returns {number[]} res
 */
export function heapSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  // 初始化最大堆：
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }

  // 堆排序
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]];
    heapify(arr, 0, i);
  }
  return arr;

  /**
   * 数组堆化函数
   * @param {number[]} arr
   * @param {number} i 数组元素索引
   * @param {number} len 数组长度
   */
  function heapify(arr, i, len) {
    let parent = i;
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;
    if (leftChild < len && arr[parent] < arr[leftChild]) {
      parent = leftChild;
    }
    if (rightChild < len && arr[parent] < arr[rightChild]) {
      parent = rightChild;
    }
    if (parent !== i) {
      [arr[i], arr[parent]] = [arr[parent], arr[i]];
      // 被换掉的子树需要重新堆化
      heapify(arr, parent, len);
    }
  }
}
