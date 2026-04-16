import { assertEquals } from '@std/assert';

/**
 * 岛屿数量
 * 数组、DFS、BFS
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function (grid) {
  let islands = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        // dfs(i, j);
        bfs(i, j);
        islands++;
      }
    }
  }

  /**
   * 深度遍历沉默小岛函数
   * @param {number} row
   * @param {number} col
   */
  function dfs(row, col) {
    if (row < 0 || row > grid.length - 1 || col < 0 || col > grid[0].length - 1) {
      return;
    }
    if (grid[row][col] === '1') {
      grid[row][col] = '0';
    } else {
      return;
    }
    // 下 -> 右 -> 上 -> 左
    dfs(row + 1, col);
    dfs(row, col + 1);
    dfs(row - 1, col);
    dfs(row, col - 1);
  }

  /**
   * 广度优先
   * @param {number} row
   * @param {number} col
   */
  function bfs(row, col) {
    // 队列记录当前节点四周一层层的元素
    const queue = [[row, col]];
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];
    grid[row][col] = '0';
    while (queue.length > 0) {
      const [row, col] = queue.shift(); // 出队

      for (const [dx, dy] of directions) {
        const x = row + dx;
        const y = col + dy;
        if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
          // 不是return，不是break!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // 是continue
          continue;
        }
        if (grid[x][y] === '1') {
          // 沉没取出的坐标对应的土地
          grid[x][y] = '0';
          queue.push([x, y]); // 追加到队列
        }
      }
    }
  }

  return islands;
};

Deno.test('岛屿数量', () => {
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
});
