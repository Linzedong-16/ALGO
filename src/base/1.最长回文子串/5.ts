// 空函数（待实现）
function longestPalindrome(s: string): string {
  if (s.length <= 1) {
    return s;
  }
  let maxLen = 1;
  let start = 0;
  function palindrome(left: number, right: number) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (maxLen < right - left + 1) {
        maxLen = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    palindrome(i, i + 1);
    palindrome(i - 1, i + 1);
  }
  return s.slice(start, maxLen + start);
}

import { assertEquals } from '@std/assert';

Deno.test('5. 最长回文子串', () => {
  console.time('耗时');
  // 示例 1
  const res1 = longestPalindrome('babad');
  // 注意：这道题有两个合法答案 "bab" 和 "aba"，所以断言要兼容两者
  assertEquals(res1 === 'bab' || res1 === 'aba', true);

  // 示例 2
  assertEquals(longestPalindrome('cbbd'), 'bb');

  // 额外测试用例
  assertEquals(longestPalindrome('a'), 'a');
  assertEquals(longestPalindrome('ac'), 'a'); // "c" 也是正确答案
  assertEquals(longestPalindrome('ccc'), 'ccc');
  console.timeEnd('耗时');
});
