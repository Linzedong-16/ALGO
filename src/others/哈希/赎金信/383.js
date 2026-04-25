/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
const canConstruct = function (ransomNote, magazine) {
  const magaMapper = new Map();
  for (const char of magazine) {
    magaMapper.set(char, (magaMapper.get(char) || 0) + 1);
  }
  for (const char of ransomNote) {
    if (magaMapper.has(char) && magaMapper.get(char) >= 1) {
      magaMapper.set(char, magaMapper.get(char) - 1);
    } else {
      return false;
    }
  }
  return true;
};

import { assertEquals } from '@std/assert';
Deno.test('赎金信', () => {
  console.time('耗时');
  assertEquals(canConstruct('a', 'b'), false);
  assertEquals(canConstruct('aa', 'ab'), false);
  assertEquals(canConstruct('aa', 'aab'), true);
  console.timeEnd('耗时');
});
