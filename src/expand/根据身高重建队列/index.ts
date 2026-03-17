function reconstructQueue(people: number[][]): number[][] {
  // 高佬先排，要求多的靠后
  people.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return b[0] - a[0];
    }
  });

  const queue: number[][] = [];
  // 遍历数组
  for (const p of people) {
    queue.splice(p[1], 0, p);
  }

  return queue;
}

import { assertEquals } from '@std/assert';
Deno.test('根据身高重建队列', () => {
  assertEquals(
    reconstructQueue([
      [7, 0],
      [4, 4],
      [7, 1],
      [5, 0],
      [6, 1],
      [5, 2]
    ]),
    [
      [5, 0],
      [7, 0],
      [5, 2],
      [6, 1],
      [4, 4],
      [7, 1]
    ]
  );
});
