/**
 * 螺旋矩阵遍历
 * 数组、矩阵
 * @param {Array<Array<number>>} spiralArray
 * @returns {Array<number>}
 */
const spiralMatrix = function (spiralArray) {
  const res = [];
  // 方向枚举值
  const directions = Object.freeze({
    RIGHT: 0,
    LEFT: 1,
    DOWN: 2,
    TOP: 3
  });
  // 初始向右遍历
  let direction = directions.RIGHT; // 方向变量
  let left = 0,
    right = spiralArray[0].length - 1;
  let top = 0,
    down = spiralArray.length - 1;
  while (left <= right && top <= down) {
    switch (direction) {
      case directions.RIGHT:
        for (let i = left; i <= right; i++) {
          res.push(spiralArray[top][i]);
        }
        top++;
        direction = directions.DOWN;
        break;
      case directions.DOWN:
        for (let i = top; i <= down; i++) {
          res.push(spiralArray[i][right]);
        }
        right--;
        direction = directions.LEFT;
        break;
      case directions.LEFT:
        for (let i = right; i >= left; i--) {
          res.push(spiralArray[down][i]);
        }
        down--;
        direction = directions.TOP;
        break;
      default:
        for (let i = down; i >= top; i--) {
          res.push(spiralArray[i][left]);
        }
        left++;
        direction = directions.RIGHT;
        break;
    }
  }
  return res;
};

const spiralArray = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];
console.log(spiralMatrix(spiralArray));
