function twoSum(nums: number[], target: number): number[] {
  const mapper = new Map<number, number>();
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const temp = target - nums[i];
    if (mapper.has(temp)) {
      return [mapper.get(temp)!, i];
    } else {
      mapper.set(nums[i], i);
    }
  }
  return res;
}

import { assertEquals } from '@std/assert';

Deno.test('1. 两数之和', () => {
  console.time('耗时');

  // 示例 1
  assertEquals(twoSum([2, 7, 11, 15], 9), [0, 1]);

  // 示例 2
  assertEquals(twoSum([3, 2, 4], 6), [1, 2]);

  // 示例 3
  assertEquals(twoSum([3, 3], 6), [0, 1]);

  console.timeEnd('耗时');
});
