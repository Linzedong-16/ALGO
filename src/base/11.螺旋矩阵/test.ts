/**
 * 螺旋矩阵
 * @param spiralArray
 */
function spiralMatrix(spiralArray: Array<Array<number>>): Array<number> {
  const result = new Array<number>();
  const enum DIRECTION {
    LEFT = 0,
    RIGHT = 1,
    DOWN = 2,
    TOP = 3
  }

  /**
   * 方向选择
   */
  let direction: DIRECTION = DIRECTION.RIGHT;
  /**
   * 移动左边界
   */
  let left = 0;
  /**
   * 移动右边界
   */
  let right = spiralArray[0].length - 1;
  /**
   * 移动上边界
   */
  let top = 0;
  /**
   * 移动下边界
   */
  let down = spiralArray.length - 1;

  while (left <= right && top <= down) {
    switch (direction) {
      case DIRECTION.RIGHT:
        direction = DIRECTION.DOWN;
        for (let i = left; i <= right; i++) {
          result.push(spiralArray[top][i]);
        }
        top++;
        break;
      case DIRECTION.DOWN:
        direction = DIRECTION.LEFT;
        for (let i = top; i <= down; i++) {
          result.push(spiralArray[i][right]);
        }
        right--;
        break;
      case DIRECTION.LEFT:
        direction = DIRECTION.TOP;
        for (let i = right; i >= left; i--) {
          result.push(spiralArray[down][i]);
        }
        down--;
        break;
      default:
        direction = DIRECTION.RIGHT;
        for (let i = down; i >= top; i--) {
          result.push(spiralArray[i][left]);
        }
        left++;
        break;
    }
  }

  return result;
}

const spiralArray = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];
console.log(spiralMatrix(spiralArray));
