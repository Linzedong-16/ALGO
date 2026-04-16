/**
 * 比较含退格字符串
 * 字符串、双指针
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const backspaceCompare = function (s, t) {
  let i = s.length - 1;
  let j = t.length - 1;
  let BSS = 0;
  let BST = 0;

  // 不能 && ，因为有可能一个到头了，但另一个全是回退
  while (i >= 0 || j >= 0) {
    // 对S处理
    while (i >= 0) {
      if (s[i] === '#') {
        BSS++;
        i--;
      } else if (BSS > 0) {
        BSS--;
        i--;
      } else {
        // BBS === 0 && s[i] !== '# 为待比较字符
        break;
      }
    }

    while (j >= 0) {
      if (t[j] === '#') {
        BST++;
        j--;
      } else if (BST > 0) {
        BST--;
        j--;
      } else {
        break;
      }
    }
    if (s[i] !== t[j]) {
      return false;
    }
    i--;
    j--;
  }

  return true;
};

import { assertEquals } from '@std/assert';
Deno.test('比较含退格字符串', () => {
  assertEquals(backspaceCompare('ab#c', 'ad#c'), true);
});
