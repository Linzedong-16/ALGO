/**
 *
 * @param s 字符串
 * @param numRows 行数
 */
function convert(s: string, numRows: number): string {
  if (numRows === 1) {
    return s;
  }
  /**
   * 暂存每行的字符串
   */
  const zGroup = new Array(numRows).fill('');
  let curr = 0;
  let i = 0;
  let down = false; // 确定方向
  while (curr < s.length) {
    zGroup[i] += s[curr++];
    // 更新 ++ Or --
    if (i === 0 || i === numRows - 1) {
      down = !down;
    }
    i += down ? 1 : -1;
  }
  return zGroup.join('');
}

import { assertEquals } from '@std/assert';
Deno.test('Z字形变化', () => {
  console.time('耗时');
  assertEquals(convert('PAYPALISHIRING', 3), 'PAHNAPLSIIGYIR');
  assertEquals(convert('PAYPALISHIRING', 4), 'PINALSIGYAHRPI');
  console.timeEnd('耗时');
});
