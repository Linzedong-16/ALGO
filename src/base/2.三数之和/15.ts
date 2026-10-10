function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i !== 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        while (nums[left] === nums[left + 1] && left < right) {
          left++;
        }
        left++;
        while (nums[right] === nums[right - 1] && left < right) {
          right--;
        }
        right--;
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  // 你的实现代码
  return res;
}

import { assertEquals } from '@std/assert';

Deno.test('15. 三数之和', () => {
  console.time('耗时');

  // 示例 1
  const res1 = threeSum([-1, 0, 1, 2, -1, -4]);
  // 结果不关心顺序，为了测试方便直接转为字符串比较（或者可以自定义深层比较）
  assertEquals(
    JSON.stringify(res1.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))),
    JSON.stringify([
      [-1, -1, 2],
      [-1, 0, 1]
    ])
  );

  // 示例 2
  assertEquals(threeSum([0, 1, 1]), []);

  // 示例 3
  assertEquals(threeSum([0, 0, 0]), [[0, 0, 0]]);

  console.timeEnd('耗时');
});
