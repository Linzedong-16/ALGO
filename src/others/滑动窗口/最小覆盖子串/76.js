/**
 * 最小覆盖子串
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
  if (s.length < t.length) {
    return '';
  }

  // t字符统计
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }
  const tCharSize = need.size;

  // 初始化变量

  /**
   * 左边界
   */
  let left = 0;
  /**
   * 右边界
   */
  let right = 0;

  /**
   * 窗口满足种类数
   */
  let valid = 0;
  /**
   * 字符串其实位置
   */
  let start = 0;
  /**
   * 最小长度
   */
  let minLen = Infinity;

  // 遍历
  while (right < s.length) {
    /**遍历字符 */
    const curr = s[right++];

    // 检索是否命中子串字符
    if (need.has(curr)) {
      need.set(curr, need.get(curr) - 1);
      if (need.get(curr) === 0) {
        // 一个种类已满足
        valid++;
      }
    }

    // 左指针收缩窗口
    while (tCharSize === valid) {
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }

      /** 待移除元素 */
      const prev = s[left++];

      if (need.has(prev)) {
        if (need.get(prev) === 0) {
          valid--;
        }
        need.set(prev, need.get(prev) + 1);
      }
    }
  }

  return minLen === Infinity ? '' : s.substring(start, start + minLen);
};

import { assertEquals } from '@std/assert';
Deno.test('最小覆盖子串', () => {
  console.time('耗时');
  assertEquals(minWindow('ADOBECODEBANC', 'ABC'), 'BANC');
  assertEquals(minWindow('a', 'a'), 'a');
  assertEquals(minWindow('a', 'aa'), '');
  console.timeEnd('耗时');
});
