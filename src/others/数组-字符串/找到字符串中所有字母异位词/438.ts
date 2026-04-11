function findAnagrams(s: string, p: string): number[] {
  if (s.length < p.length) {
    return [];
  }
  if (s === p) {
    return [0];
  }
  const res = [];

  // 26个小写字母频率统计数组
  const SC = new Array(26).fill(0); // 作为滑动窗口遍历整个字符串
  const PC = new Array(26).fill(0); // 只需初始化一次

  // 记录两个数组相同项数量 达到26是为找到一个结果
  let matches = 0;

  // 初始化第一个窗口，窗口以p字符串长度初始化
  for (let i = 0; i < p.length; i++) {
    SC[s.charCodeAt(i) - 97]++;
    PC[p.charCodeAt(i) - 97]++;
  }

  // 第一次对比并初始化 相同计数
  for (let i = 0; i < 26; i++) {
    if (SC[i] === PC[i]) {
      matches++;
    }
  }

  // 第一次匹配成功
  if (matches === 26) {
    res.push(0);
  }

  for (let i = p.length; i < s.length; i++) {
    // 右侧 加入新元素
    const right = s.charCodeAt(i) - 97; // 新元素的索引位置
    SC[right]++; // 在窗口数组中 right 位置加一
    if (SC[right] === PC[right]) {
      // 加入后相等 -> 匹配项 + 1
      matches++;
    } else if (SC[right] - 1 === PC[right]) {
      // 加入前相等 -> 匹配项 - 1，现在不匹配，需要排除这一项
      matches--;
    }

    // 左侧排除旧元素
    const left = s.charCodeAt(i - p.length) - 97;
    SC[left]--;
    if (SC[left] === PC[left]) {
      matches++;
    } else if (SC[left] + 1 === PC[left]) {
      matches--;
    }

    if (matches === 26) {
      res.push(i - p.length + 1);
    }
  }

  return res;
}

import { assertEquals } from '@std/assert';
Deno.test('找到字符串中所有字母异位词-滑动窗口', () => {
  console.time('耗时');
  assertEquals(findAnagrams('cbaebabacd', 'abc'), [0, 6]);
  assertEquals(findAnagrams('abab', 'ab'), [0, 1, 2]);
  console.timeEnd('耗时');
});
