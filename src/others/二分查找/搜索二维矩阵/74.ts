function searchMatrix(matrix: number[][], target: number): boolean {
  let left = 0,
    right = matrix[0].length * matrix.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const i = Math.floor(mid / matrix[0].length);
    const j = mid % matrix[0].length;

    if (matrix[i][j] === target) {
      return true;
    } else if (matrix[i][j] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
}

import { assertEquals } from '@std/assert';
Deno.test('74.搜索二维矩阵', () => {
  console.time('耗时');
  assertEquals(
    searchMatrix(
      [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60]
      ],
      3
    ),
    true
  );
  assertEquals(
    searchMatrix(
      [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60]
      ],
      13
    ),
    false
  );
  assertEquals(searchMatrix([[1]], 1), true);
  assertEquals(searchMatrix([[1]], 2), false);
  console.timeEnd('耗时');
});
