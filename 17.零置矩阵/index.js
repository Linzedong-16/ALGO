import { testCases, printMatrix } from "./utils.js";

/**
 * 73.零置矩阵
 * @param {Array<Array<number>>} matrix
 * @returns {Array<Array<number>>} res
 */
var setZeros = (matrix) => {
  // 第一行、列是否有零
  let firstColHasZero = false;
  let firstRowHasZero = false;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix[0][i] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // 给第一行一列标零
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[0].length; col++) {
      if (matrix[row][col] === 0) {
        // 内部有0，给外层0标记
        matrix[0][col] = 0;
        matrix[row][0] = 0;
      }
    }
  }
  // 根据刚才标的0再去反推内部的0
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[0].length; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }
  if (firstColHasZero) {
    for (let row = 0; row < matrix.length; row++) {
      matrix[row][0] = 0;
    }
  }
  if (firstRowHasZero) {
    for (let col = 0; col < matrix[0].length; col++) {
      matrix[0][col] = 0;
    }
  }
  return matrix;
};

// 执行所有测试
testCases.forEach(({ name, matrix }) => {
  console.log(`\n==================== ${name} ====================`);
  // 深拷贝原矩阵（避免算法修改原数组影响打印）
  const originalMatrix = JSON.parse(JSON.stringify(matrix));
  const resultMatrix = setZeros(JSON.parse(JSON.stringify(matrix)));

  printMatrix(originalMatrix, "输入矩阵");
  printMatrix(resultMatrix, "输出矩阵");
});
