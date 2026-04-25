/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isIsomorphic = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  const sToTMapper = new Map();
  const tToSMapper = new Map();

  for (let i = 0; i < s.length; i++) {
    if (sToTMapper.has(s[i])) {
      if (sToTMapper.get(s[i]) !== t[i]) {
        return false;
      }
    } else {
      if (tToSMapper.get(t[i]) === s[i]) {
        return false;
      }
      sToTMapper.set(s[i], t[i]);
      tToSMapper.set(t[i], s[i]);
    }
  }

  return true;
};

import { assertEquals } from '@std/assert';
Deno.test('同构字符串', () => {
  console.time('耗时');
  assertEquals(isIsomorphic('egg', 'add'), true);
  assertEquals(isIsomorphic('f11', 'b23'), false);
  assertEquals(isIsomorphic('paper', 'title'), true);
  console.timeEnd('耗时');
});
