/**
 * @param {string} s 目标字符串
 * @param {string} p 子串
 * @return {number[]}
 */
const findAnagrams = function (s, p) {
  if (s.length < p.length) {
    return [];
  }
  if (s === p) {
    return [0];
  }

  const res = [];

  const pFreq = new Array(26).fill(0);
  const sFreq = new Array(26).fill(0);

  // 初始化滑动窗口
  for (let i = 0; i < p.length; i++) {
    pFreq[p[i].charCodeAt(0) - 97]++;
    sFreq[s[i].charCodeAt(0) - 97]++;
  }

  // 初始化窗口匹配数
  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (pFreq[i] === sFreq[i]) {
      matches++;
    }
  }

  if (matches === 26) {
    res.push(0);
  }

  for (let i = p.length; i < s.length; i++) {
    // 右侧添加
    const rightIdx = s[i].charCodeAt(0) - 97;
    sFreq[rightIdx]++;
    if (sFreq[rightIdx] === pFreq[rightIdx]) {
      // 现在匹配了
      matches++;
    } else if (sFreq[rightIdx] - 1 === pFreq[rightIdx]) {
      // 之前是匹配的，但现在不匹配
      matches--;
    }

    // 左侧删除
    const leftIdx = s[i - p.length].charCodeAt(0) - 97;
    sFreq[leftIdx]--;
    if (sFreq[leftIdx] === pFreq[leftIdx]) {
      // 现在匹配
      matches++;
    } else if (sFreq[leftIdx] + 1 === pFreq[leftIdx]) {
      // 原来匹配
      matches--;
    }

    if (matches === 26) {
      res.push(i + 1 - p.length);
    }
  }
  return res;
};

import { assertEquals } from '@std/assert';
Deno.test('找到字符串所有字母异位词', () => {
  console.time('耗时');
  assertEquals(findAnagrams('cbaebabacd', 'abc'), [0, 6]);
  assertEquals(findAnagrams('abab', 'ab'), [0, 1, 2]);
  console.timeEnd('耗时');
});
