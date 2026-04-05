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

  // 从最后一个非叶子节点开始构造最大堆
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }

  // 堆排序,i作为构成最大堆的数组的大小
  for (let i = arr.length - 1; i > 0; i--) {
    // 把开头最大的元素移到末尾
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, 0, i);
  }
  return arr;

  /**
   * 构造最大堆（一颗完全二叉树，顶部根元素为最大值）
   * @param {number[]} arr
   * @param {number} i
   * @param {number} len 规定最大堆的范围,确保子节点不越界
   */
  function heapify(arr, i, len) {
    let parent = i; // 二叉树最大值
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;
    if (leftChild < len && arr[parent] < arr[leftChild]) {
      parent = leftChild;
    }
    if (rightChild < len && arr[parent] < arr[rightChild]) {
      parent = rightChild;
    }
    // 交换保持根元素为最大值
    if (parent !== i) {
      [arr[parent], arr[i]] = [arr[i], arr[parent]];
      // 变化后需要对替换的元素(parent此时指向被交换元素的位置)重新堆化
      heapify(arr, parent, len);
    }
  }
}
