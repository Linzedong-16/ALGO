// 20. 有效的括号

function isValid(s: string): boolean {
  // 你的实现代码
  const mapper = new Map<string, string>();
  mapper.set('(', ')');
  mapper.set('[', ']');
  mapper.set('{', '}');
  const stack: string[] = [];

  for (const char of s) {
    if (mapper.has(char)) {
      stack.push(mapper.get(char)!);
    } else {
      if (stack.pop() !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

import { assertEquals } from '@std/assert';

Deno.test('20. 有效的括号', () => {
  console.time('耗时');

  // 示例 1
  assertEquals(isValid('()'), true);

  // 示例 2
  assertEquals(isValid('()[]{}'), true);

  // 示例 3
  assertEquals(isValid('(]'), false);

  // 补充测试用例：空字符串
  assertEquals(isValid(''), true);
  assertEquals(isValid(']'), false);

  console.timeEnd('耗时');
});
