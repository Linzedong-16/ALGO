/**
 * 有效字母异位词
 * 字符串、哈希表
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      map.set(s[i], map.get(s[i]) + 1);
    } else {
      map.set(s[i], 1);
    }
    if (map.has(t[i])) {
      map.set(t[i], map.get(t[i]) - 1);
    } else {
      map.set(t[i], -1);
    }
  }

  for (const [_, val] of map) {
    if (val !== 0) {
      return false;
    }
  }
  return true;
};
import { assertEquals } from '@std/assert';
Deno.test('有效字母异位词', () => {
  assertEquals(isAnagram('ACANE', 'NEAAC'), true);
});
