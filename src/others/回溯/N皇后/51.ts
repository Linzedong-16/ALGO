function solveNQueens(n: number): string[][] {
  // N皇后回溯代码写这里
  const result: string[][] = [];

  const cols = new Set<number>();
  /** 正斜线 row - col */
  const line1 = new Set<number>();
  /** 反斜线 row + col */
  const line2 = new Set<number>();

  /**
   * 按每行顺序回溯
   * @param row
   * @param path  path[row] -> col
   */
  const traceback = (row: number, path: number[]): void => {
    if (row === n) {
      result.push(
        path.map((col) => {
          const arr = new Array<string>(n).fill('.');
          arr[col] = 'Q';
          return arr.join('');
        })
      );
      return;
    }

    /// 枚举列
    for (let col = 0; col < n; col++) {
      const l1 = row - col;
      const l2 = row + col;

      /// 改行该列位置存在：列冲突、正斜冲突、反斜冲突，跳过
      if (cols.has(col) || line1.has(l1) || line2.has(l2)) {
        continue;
      }
      path.push(col);
      cols.add(col);
      line1.add(l1);
      line2.add(l2);

      traceback(row + 1, path);
      path.pop();
      cols.delete(col);
      line1.delete(l1);
      line2.delete(l2);
    }
  };

  traceback(0, []);
  return result;
}

import { assertEquals } from '@std/assert';
Deno.test('51.N皇后', () => {
  console.time('耗时');
  const res4 = solveNQueens(4);
  assertEquals(res4.length, 2);
  assertEquals(solveNQueens(1), [['Q']]);
  assertEquals(solveNQueens(2).length, 0);
  console.timeEnd('耗时');
});
