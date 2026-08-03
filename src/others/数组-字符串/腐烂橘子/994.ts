function orangesRotting(grid: number[][]): number {
  let fresh = 0;
  /**
   * 存放烂橘子
   */
  const queue: Array<[number, number]> = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      } else if (grid[i][j] === 1) {
        fresh++;
      }
    }
  }

  /// 层序遍历 BFS
  const DIRECTIONS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  if (fresh === 0) {
    return 0;
  }

  let minutes = 0;

  while (fresh !== 0 && queue.length !== 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift()!;

      // 四周扩散，开始腐烂橘子
      for (const [rx, ry] of DIRECTIONS) {
        const dx = rx + x;
        const dy = ry + y;
        if (dx < 0 || dx >= grid.length || dy < 0 || dy >= grid[0].length) {
          continue;
        }
        if (grid[dx][dy] === 1) {
          grid[dx][dy] = 2;
          fresh--;
          queue.push([dx, dy]);
        }
      }
    }
    minutes++;
  }

  return fresh > 0 ? -1 : minutes;
}

import { assertEquals } from '@std/assert';
Deno.test('烂橘子', () => {
  console.time('耗时');
  // 样例1
  const g1 = structuredClone([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1]
  ]);
  assertEquals(orangesRotting(g1), 4);

  // 样例2
  const g2 = structuredClone([
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1]
  ]);
  assertEquals(orangesRotting(g2), -1);

  // 边界：没有新鲜橘子
  const g3 = structuredClone([[0, 2]]);
  assertEquals(orangesRotting(g3), 0);

  // 边界：只有新鲜橘子，无腐烂源
  const g4 = structuredClone([[1]]);
  assertEquals(orangesRotting(g4), -1);
  console.timeEnd('耗时');
});
