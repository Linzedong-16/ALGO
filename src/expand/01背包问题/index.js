/**
 * capacity是取[0,capacity]，所以数组长度是capacity + 1
 * @param {number[]} weights
 * @param {number[]} values
 * @param {number} capacity
 */
function packageHandle(weights, values, capacity) {
  // 初始化为 0
  let line = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const next = new Array(capacity + 1);
    for (let weight = 0; weight <= capacity; weight++) {
      // 当前容量下，这个物品i能不能放进去
      if (weight >= weights[i]) {
        // 判断怎么局部最优？
        // 是继承的大
        // 还是 当前物品价值 + 上一行[当前限定容量 - 当前物品重量]价值
        next[weight] = Math.max(line[weight], values[i] + line[weight - weights[i]]);
      } else {
        // 放不进去就继承
        next[weight] = line[weight];
      }
    }
    line = next;
  }

  return line[capacity];
}

import { assertEquals } from '@std/assert';
Deno.test('01背包', () => {
  const weights1 = [1, 2, 3];
  const values1 = [6, 10, 12];
  const capacity1 = 5;
  assertEquals(packageHandle(weights1, values1, capacity1), 22); // 最优解：2+3重量，价值10+12=22
});
