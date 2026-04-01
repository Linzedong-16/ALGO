import { assertEquals } from '@std/assert';
import { quickSortWithExtraArr } from './数组排序/quickSort.js';
Deno.test('测试排序数组', () => {
  // 快速排序
  // 有额外空间版本,leetcode 不予通过，内存开销过大
  assertEquals(quickSortWithExtraArr([5, 2, 3, 1]), [1, 2, 3, 5]);
});
