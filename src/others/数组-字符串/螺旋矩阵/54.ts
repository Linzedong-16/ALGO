/**
 * 螺旋矩阵
 * @param matrix 矩阵
 * @returns 一维数组
 */
function spiralOrder(matrix: number[][]): number[] {
  /** 方向枚举 */
  const enum DIRECTIONS {
    RIGHT = 0,
    DOWN = 1,
    LEFT = 2,
    TOP = 3
  }
  /** 方向控制 */
  let direct: DIRECTIONS = DIRECTIONS.RIGHT;
  const result: Array<number> = [];

  let left = 0,
    right = matrix[0].length - 1,
    top = 0,
    down = matrix.length - 1;

  while (left <= right && top <= down) {
    // 旋转遍历
    switch (direct) {
      case DIRECTIONS.RIGHT:
        for (let i = left; i <= right; i++) {
          result.push(matrix[top][i]);
        }
        top++;
        direct = DIRECTIONS.DOWN;
        break;
      case DIRECTIONS.DOWN:
        for (let i = top; i <= down; i++) {
          result.push(matrix[i][right]);
        }
        right--;
        direct = DIRECTIONS.LEFT;
        break;
      case DIRECTIONS.LEFT:
        for (let i = right; i >= left; i--) {
          result.push(matrix[down][i]);
        }
        down--;
        direct = DIRECTIONS.TOP;
        break;
      default:
        for (let i = down; i >= top; i--) {
          result.push(matrix[i][left]);
        }
        left++;
        direct = DIRECTIONS.RIGHT;
        break;
    }
  }
  return result;
}

Deno.test('螺旋矩阵', () => {
  console.log(
    spiralOrder([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])
  );
});
