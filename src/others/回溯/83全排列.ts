function permute(nums: number[]): number[][] {
  const res: Array<number[]> = [];
  const used = new Array<boolean>(nums.length).fill(false);
  function traceback(curr: number[]) {
    if (curr.length === nums.length) {
      return res.push([...curr]);
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue;
      }
      used[i] = true;
      curr.push(nums[i]);
      traceback(curr);
      curr.pop();
      used[i] = false;
    }
  }

  traceback([]);
  return res;
}

import { assertEquals } from '@std/assert';
Deno.test('全排列', () => {
  assertEquals(permute([1, 2, 3]), [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1]
  ]);
});
