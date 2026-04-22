/**
 * @param {number} n
 * @return {boolean}
 */
const isHappy = function (n) {
  const set = new Set();

  while (n !== 1 && !set.has(n)) {
    set.add(n);
    let next = 0;
    while (n > 0) {
      const digit = Math.floor(n % 10);
      next += digit * digit;
      n = Math.floor(n / 10);
    }
    n = next;
  }

  return n === 1;
};

import { assertEquals } from '@std/assert';
Deno.test('多巴胺数', () => {
  console.time('耗时');
  assertEquals(isHappy(19), true);
  assertEquals(isHappy(2), false);
  console.timeEnd('耗时');
});
