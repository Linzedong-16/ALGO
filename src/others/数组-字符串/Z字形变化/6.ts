function convert(s: string, numRows: number): string {
  if (numRows === 1) {
    return s;
  }
  const memo = new Array(numRows).fill('');

  let j = 0;
  let isDown = false;
  for (let i = 0; i < s.length; i++) {
    memo[j] += s[i];
    if (j === 0 || j === numRows - 1) {
      isDown = !isDown;
    }
    j += isDown ? 1 : -1;
  }
  return memo.join('');
}

import { assertEquals } from '@std/assert';
Deno.test('Z字形变化', () => {
  console.time('耗时');
  assertEquals(convert('PAYPALISHIRING', 3), 'PAHNAPLSIIGYIR');
  assertEquals(convert('PAYPALISHIRING', 4), 'PINALSIGYAHRPI');
  console.timeEnd('耗时');
});
