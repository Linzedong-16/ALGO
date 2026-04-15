/**
 * 方法一：朴素解法 超级耗时而已：leetcode执行2.6s 内存消耗64.3MB
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAnagrams = function (s, p) {
  const windowLen = p.length;
  const res = [];
  const ASCIIP = new Array(p.length).fill(0);
  // 对P ASCII 处理
  for (const char of p) {
    ASCIIP[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }
  const stdASCIIStr = ASCIIP.join('-');

  for (let i = 0; i < s.length; i++) {
    // 滑动窗口字符串
    const str = s.slice(i, i + windowLen);
    // 字符串转ascii词频统计
    const strAscii = new Array(windowLen).fill(0);
    for (const char of str) {
      strAscii[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    const asciiStr = strAscii.join('-');
    if (stdASCIIStr === asciiStr) {
      res.push(i);
    }
  }
  return res;
};
/**
 * 方法二：标准优质解法
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAnagramsStd = function (s, p) {
  const idxs = [];
  // 通过动态维护一个matches变量作为字符匹配数量 确认是否为字母异位词
  const sCount = new Array(26).fill(0);
  const pCount = new Array(26).fill(0);

  // 初始化窗口 p.length 个字符
  for (let i = 0; i < p.length; i++) {
    sCount[s[i].charCodeAt(0) - 97]++;
    pCount[p[i].charCodeAt(0) - 97]++;
  }

  // matches
  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (sCount[i] === pCount[i]) {
      matches++;
    }
  }

  if (matches === 26) {
    idxs.push(0);
  }

  // 开始滑动窗口
  for (let i = p.length; i < s.length; i++) {
    // 新增 元素
    const right = s[i].charCodeAt(0) - 97; // ❌：记得加上 -97
    sCount[right]++;

    // 只有两者存在 之前 或 当前 频次相同才需要更新 matches
    if (sCount[right] === pCount[right]) {
      // 现在匹配
      matches++;
    } else if (sCount[right] - 1 === pCount[right]) {
      // 刚才匹配
      matches--;
    }
    // 删除 旧元素
    const left = s[i - p.length].charCodeAt(0) - 97;
    sCount[left]--;
    if (sCount[left] === pCount[left]) {
      matches++;
    } else if (sCount[left] + 1 === pCount[left]) {
      matches--;
    }

    if (matches === 26) {
      idxs.push(i - p.length + 1);
    }
  }
  return idxs;
};

import { assertEquals } from '@std/assert';
Deno.test('找到字符串中所有字母异位词-滑动窗口', () => {
  console.time('耗时');
  assertEquals(findAnagrams('cbaebabacd', 'abc'), [0, 6]);
  assertEquals(findAnagrams('abab', 'ab'), [0, 1, 2]);
  console.timeEnd('耗时');
  console.time('耗时');
  assertEquals(findAnagramsStd('cbaebabacd', 'abc'), [0, 6]);
  assertEquals(findAnagramsStd('abab', 'ab'), [0, 1, 2]);
  console.timeEnd('耗时');
});
