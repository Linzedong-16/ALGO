/**
 * 双端队列控制窗口移动 + 首尾单调递减属性 === 单调队列 实现最小化比较
 * @param nums 待遍历数组
 * @param k 窗口大小
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
  const queue: number[] = [];
  const ans: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    // 是否需要移除左侧临界值
    if (queue.length !== 0 && queue[0] <= i - k) {
      // 移除窗口
      queue.shift();
    }

    // 在单调的规则下 移入新元素
    while (queue.length !== 0 && nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop();
    }
    queue.push(i);

    // 加入当前最大值
    if (i >= k - 1) {
      ans.push(nums[queue[0]]);
    }
  }

  return ans;
}

import { assertEquals } from '@std/assert';
Deno.test('滑动窗口最大值', () => {
  console.time('耗时');
  assertEquals(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7]);
  assertEquals(maxSlidingWindow([1], 1), [1]);
  console.timeEnd('耗时');
});
