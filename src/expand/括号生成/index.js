/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
  // 回溯问题
  const res = [];

  /**
   *
   * @param {string} curr
   * @param {number} left
   * @param {number} right
   */
  function traceBack(curr, left, right) {
    if (left === n && right === n) {
      res.push(curr);
    }
    if (left < n) {
      traceBack(curr + '(', left + 1, right);
    }

    if (right < left) {
      traceBack(curr + ')', left, right + 1);
    }
  }
  traceBack('(', 1, 0); // 必然的起点
  return res;
};

import { assertEquals } from '@std/assert';
Deno.test('回溯之括号生成', () => {
  assertEquals(generateParenthesis(3), ['((()))', '(()())', '(())()', '()(())', '()()()']);
  assertEquals(generateParenthesis(1), ['()']);
});
