/**
 * @param {character[][]} board
 * @return {number}
 */
const countBattleships = function (board) {
  // 只找舰头
  let count = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] !== 'X') {
        continue;
      }
      if (i > 0 && board[i - 1][j] === 'X') {
        continue;
      }
      if (j > 0 && board[i][j - 1] === 'X') {
        continue;
      }
      count++;
    }
  }

  return count;
};

import { assertEquals } from '@std/assert';
Deno.test('战舰数量', () => {
  console.time('耗时');
  assertEquals(
    countBattleships([
      ['X', '.', '.', 'X'],
      ['.', '.', '.', 'X'],
      ['.', '.', '.', 'X']
    ]),
    2
  );
  assertEquals(countBattleships([['.']]), 0);
  console.timeEnd('耗时');
});
