function partition(s: string): string[][] {
  //回溯代码写这里
  /**
   * 回文判断
   * @param str
   * @returns
   */
  const isPalindrome = (str: string): boolean => {
    let left = 0,
      right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  };
  const result: Array<Array<string>> = [];

  const traceback = (start: number, curr: string[]) => {
    if (start === s.length && curr.length !== 0) {
      result.push([...curr]);
      return;
    }

    for (let i = start; i < s.length; i++) {
      const sub = s.slice(start, i + 1);
      if (isPalindrome(sub)) {
        curr.push(sub);
        traceback(i + 1, curr);
        curr.pop();
      }
    }
  };

  traceback(0, []);
  return result;
}

import { assertEquals } from '@std/assert';
Deno.test('131.分割回文串', () => {
  console.time('耗时');
  const sort2D = (arr: string[][]) =>
    arr.map((x) => x).sort((a, b) => a.join(',').localeCompare(b.join(',')));

  assertEquals(
    sort2D(partition('aab')),
    sort2D([
      ['a', 'a', 'b'],
      ['aa', 'b']
    ])
  );
  assertEquals(sort2D(partition('a')), sort2D([['a']]));
  assertEquals(sort2D(partition('bb')), sort2D([['b', 'b'], ['bb']]));
  console.timeEnd('耗时');
});
