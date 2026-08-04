function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  /**
   * bi 前置课程
   * ai 后续课程
   * 邻接表 [bi]->[ai...]
   */
  const graph: number[][] = Array.from({ length: numCourses }, () => []);

  /**
   * 入度数组,该课程还剩下多少前置课程没修
   * [..].length -> [ai]
   */
  const inDegree = new Array<number>(numCourses).fill(0);

  // 初始化课程表
  for (const [ai, bi] of prerequisites) {
    // 学完 bi 才能 学 ai: bi -> ai
    graph[bi].push(ai);
    inDegree[ai]++;
  }

  // 初始化队列，找课上
  const queue: number[] = [];
  for (let i = 0; i < inDegree.length; i++) {
    // 初级课程
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }
  let count = 0;
  while (queue.length !== 0) {
    const curr = queue.shift()!;
    count++;

    // 更新，找可解锁课程
    for (const next of graph[curr]) {
      // 前置课程已学
      inDegree[next]--;

      // 没有前置课程可解锁加入队列
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return count === numCourses;
}

import { assertEquals } from '@std/assert';
Deno.test('课程表', () => {
  console.time('耗时');

  // 样例1
  const p1 = structuredClone([[1, 0]]);
  assertEquals(canFinish(2, p1), true);

  // 样例2：存在环
  const p2 = structuredClone([
    [1, 0],
    [0, 1]
  ]);
  assertEquals(canFinish(2, p2), false);

  // 边界：没有先修课
  const p3 = structuredClone([]);
  assertEquals(canFinish(5, p3), true);

  // 边界：单门课程无依赖
  const p4 = structuredClone([]);
  assertEquals(canFinish(1, p4), true);

  console.timeEnd('耗时');
});
