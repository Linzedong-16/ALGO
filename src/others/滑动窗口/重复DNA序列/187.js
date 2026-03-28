/**
 * 找 DNA 字符串里所有长度 = 10、出现次数≥2的子串
 * @param {string} s
 * @return {string[]}
 */
const findRepeatedDnaSequences = function (s) {
  if (s.length < 10) {
    return [];
  }
  const res = [];
  // 优化手段：用二位二进制代表每个字符，压缩成一个整数的比较
  const mapper = {
    A: 0, // 00
    C: 1, // 01
    G: 2, // 10
    T: 3 // 11
  };
  let x = 0; // 暂存每个压缩的字符串切片
  // 初始化前 9 位字符，这是为了保证后续的迭代逻辑统一：这里恰好卡在差一步放入哈希表做词频统计的阶段，这样能保证下一阶段的循环每次都需要词频统计
  for (let i = 0; i < 9; i++) {
    const binaryChar = mapper[s[i]];
    // (切片先左移2位，右侧补2位0用于填充字符的二进制  |位与上  新字符加到右侧2位)
    // &位与 掩码【掩码是1左移20位，后减一得到的20个1的二进制，另外位与的规则是同1则1】
    // 掩码是用于保证切片只有20位的
    x = ((x << 2) | binaryChar) & ((1 << (2 * 10)) - 1);
  }

  // 从第10个字符开始遍历
  const freqMap = new Map();
  for (let i = 9; i < s.length; i++) {
    const binaryChar = mapper[s[i]];
    x = ((x << 2) | binaryChar) & ((1 << 20) - 1); // 更新
    freqMap.set(x, freqMap.get(x) ? freqMap.get(x) + 1 : 1); // 统计
    if (freqMap.get(x) === 2) {
      res.push(s.slice(i - 9, i + 1)); // 记录
    }
  }

  return res;
};

import { assertEquals } from '@std/assert';
Deno.test('滑动窗口+滚动哈希', () => {
  assertEquals(findRepeatedDnaSequences('AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT'), [
    'AAAAACCCCC',
    'CCCCCAAAAA'
  ]);
  assertEquals(findRepeatedDnaSequences('AAAAAAAAAAAAA'), ['AAAAAAAAAA']);
});
