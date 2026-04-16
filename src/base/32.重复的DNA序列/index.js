import { assertEquals } from '@std/assert';

/**
 * 重复的 DNA 序列
 * 字符串、哈希表
 * @param {string} s
 * @return {string[]}
 */
const findRepeatedDnaSequences = function (s) {
  const DNAStrMap = new Map();
  const result = [];
  for (let i = 0; i < s.length; i++) {
    const currDNAPiece = s.slice(i, i + 10); // 截取长度为 10的子串
    if (DNAStrMap.has(currDNAPiece)) {
      DNAStrMap.set(currDNAPiece, DNAStrMap.get(currDNAPiece) + 1);
    } else {
      DNAStrMap.set(currDNAPiece, 1);
    }
  }
  for (const [key, val] of DNAStrMap) {
    if (val > 1) {
      result.push(key);
    }
  }
  return result;
};

Deno.test('测试DNA重复子串', () => {
  assertEquals(findRepeatedDnaSequences('AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT'), [
    'AAAAACCCCC',
    'CCCCCAAAAA'
  ]);
});
