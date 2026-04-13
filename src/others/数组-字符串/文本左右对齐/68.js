/**
 * 背题：灵茶山解法
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const fullJustify = function (words, maxWidth) {
  // 输出数组
  const res = [];

  for (let i = 0; i < words.length; ) {
    /**
     * 该行的起始单词
     */
    const start = i;

    /**
     * 该行的长度：初始化为第一个单词长度
     * 该长度的字符串右侧是没有空格的：“word”，“word is”，“word is a”
     */
    let sumLen = words[i].length;

    // 贪心算法：确认能容纳的单词

    /**
     * 解读循环：
     * 起始：i++（原来初始化已经加入第一个单词，需要指向下一个单词，次i++只执行一次）
     * 条件：i < 单词总量 && 原来的字符串长度 + 1 个拼接的保底空格 + 下一个单词长度 <= 每行字符上限
     * 迭代：i++，持续指向下一个单词，直至，下一个单词因为太长，保底机制下也不可能在该行装下，必须换行
     */
    for (i++; i < words.length && sumLen + 1 + words[i].length <= maxWidth; i++) {
      sumLen += 1 + words[i].length;
    }

    /**
     * 保底机制下剩余可分配空格
     */
    const extraSpaces = maxWidth - sumLen;

    /**
     * 空隙个数 === 单词个数 - 1
     * (此时的i是指向下一行的单词的，因此 i - start === 改行单词个数)
     */
    const gaps = i - start - 1;

    // 特殊情况： 一行只有一个单词或者最后一行，统统左对齐，末尾补空格
    if (gaps === 0 || i === words.length) {
      // 最后一行可能不止一个单词需要 join(" ") 得出的前字符串是“word is” 格式，末尾没有空格，长度就是 sumLen
      // 把剩余的空格直接填充即可
      const row = words.slice(start, i).join(' ') + ' '.repeat(extraSpaces);
      res.push(row);
      continue;
    }

    // 一般情况下，需要平均分配空格
    /**
     * 分配到每个空隙的空格
     */
    const averageSpaces = Math.floor(extraSpaces / gaps);

    /**
     * 剩余的填充空格，分给前rem个单词
     */
    const rem = extraSpaces % gaps;

    /**
     * 在原字符串(有一个空格)基础上 + 均分的空格数
     */
    const spaces = ' '.repeat(1 + averageSpaces);
    const row =
      words.slice(start, start + rem + 1).join(spaces + ' ') +
      spaces +
      words.slice(start + rem + 1, i).join(spaces);
    res.push(row);
  }
  return res;
};

import { assertEquals } from '@std/assert';
Deno.test('文本左右对齐', () => {
  console.time('耗时');
  assertEquals(fullJustify(['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], 16), [
    'This    is    an',
    'example  of text',
    'justification.  '
  ]);
  assertEquals(fullJustify(['What', 'must', 'be', 'acknowledgment', 'shall', 'be'], 16), [
    'What   must   be',
    'acknowledgment  ',
    'shall be        '
  ]);
  assertEquals(
    fullJustify(
      [
        'Science',
        'is',
        'what',
        'we',
        'understand',
        'well',
        'enough',
        'to',
        'explain',
        'to',
        'a',
        'computer.',
        'Art',
        'is',
        'everything',
        'else',
        'we',
        'do'
      ],
      20
    ),
    [
      'Science  is  what we',
      'understand      well',
      'enough to explain to',
      'a  computer.  Art is',
      'everything  else  we',
      'do                  '
    ]
  );
  console.timeEnd('耗时');
});
