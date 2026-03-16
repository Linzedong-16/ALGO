/**
 * @param {string} s
 * @return {boolean}
 */
const validPalindrome = function (s) {
  /**
   *
   * @param {number} left
   * @param {number} right
   * @returns {boolean}
   */
  function isPalindrome(left, right) {
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  let left = 0,
    right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      // 看看删除(跳过一个字符后能不能构成回文):左边跳一个Or右边跳一个
      return isPalindrome(left + 1, right) || isPalindrome(left, right - 1);
    }
    left++;
    right--;
  }

  return true;
};

import { assertEquals } from '@std/assert';
Deno.test('验证回文串II', () => {
  assertEquals(validPalindrome('aba'), true);
  assertEquals(validPalindrome('abca'), true);
  assertEquals(validPalindrome('abc'), false);
});
