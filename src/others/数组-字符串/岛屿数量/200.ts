function numIslands(grid: string[][]): number {
  let sum = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        dfs(i, j);
        sum++;
      }
    }
  }

  function dfs(x: number, y: number) {
    if (x < 0 || x > grid.length - 1 || y < 0 || y > grid[0].length - 1 || grid[x][y] === '0') {
      return;
    }

    // 非0
    grid[x][y] = '0';
    dfs(x + 1, y);
    dfs(x - 1, y);
    dfs(x, y + 1);
    dfs(x, y - 1);
  }

  return sum;
}

import { assertEquals } from '@std/assert';
Deno.test('岛屿数量', () => {
  console.time('耗时');
  assertEquals(
    numIslands([
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0']
    ]),
    1
  );
  assertEquals(
    numIslands([
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1']
    ]),
    3
  );
  console.timeEnd('耗时');
});
