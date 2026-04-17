/**
 * 我怎么当时没想到用栈实现呢，太暴力狂了
 * @param {string} s 1 - 9 的字符串
 * @returns
 */
function eliminateSum10(s) {
  // 用栈实现 O(n) 复杂度的解法
  const stack = [];
  for (const char of s) {
    const num = parseInt(char);
    if (stack.length !== 0 && stack[stack.length - 1] + num === 10) {
      // 当栈顶元素 + 遍历元素 === 10，弹出栈顶元素并且不理会 遍历元素，算是消除相邻 加和等于 10 的元素
      stack.pop();
    } else {
      // 栈空 或者加起来不等于10就先入栈存着
      stack.push(num);
    }
  }
  return stack.length;
}

import { assertEquals } from '@std/assert';
Deno.test('数字消消乐', () => {
  console.time('耗时');
  assertEquals(eliminateSum10(''), 0);
  assertEquals(eliminateSum10('1'), 1);
  assertEquals(eliminateSum10('19'), 0);
  assertEquals(eliminateSum10('55'), 0);
  assertEquals(eliminateSum10('1919'), 0);
  assertEquals(eliminateSum10('11289'), 1);
  assertEquals(eliminateSum10('123456789'), 9);
  assertEquals(eliminateSum10('1928374655'), 0);
  console.timeEnd('耗时');
});
