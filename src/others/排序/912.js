import { assertEquals } from '@std/assert';
import { quickSort, quickSortWithExtraArr } from './数组排序/quickSort.js';
import { mergeSort } from './数组排序/mergeSort.js';
import { heapSort } from './数组排序/heapSort.js';
Deno.test('测试排序数组', () => {
  console.time('排序耗时');
  // 快速排序
  // 有额外空间版本,leetcode 不予通过，内存开销过大
  assertEquals(quickSortWithExtraArr([5, 2, 3, 1]), [1, 2, 3, 5]);
  // 希尔排序

  // 标准快速排序 + 优化 -> leetcode通过
  assertEquals(quickSort([5, 2, 3, 1]), [1, 2, 3, 5]);

  // 归并排序
  assertEquals(mergeSort([5, 2, 3, 1]), [1, 2, 3, 5]);

  // 传说中的堆排序
  assertEquals(heapSort([5, 2, 3, 1]), [1, 2, 3, 5]);
  console.timeEnd('排序耗时');
});
