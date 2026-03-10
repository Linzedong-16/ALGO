import { testCases, printMatrix } from './utils.js';

// 方向颠倒、遍历起始边界不清
function setZeros(matrix: Array<Array<number>>): Array<Array<number>> {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return matrix;
  }
  // TODO: 第一行、列是否有零
  let firstColHasZero = false;
  let firstRowHasZero = false;
  // 遍历第一列
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }
  // 遍历第一行
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix[0][i] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // TODO: 给第一行一列标零
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }

  // TODO: 根据刚才标的0再去反推内部的0
  // 第一列
  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      for (let j = 1; j < matrix[0].length; j++) {
        matrix[i][j] = 0;
      }
    }
  }
  for (let i = 1; i < matrix[0].length; i++) {
    if (matrix[0][i] === 0) {
      for (let j = 1; j < matrix.length; j++) {
        matrix[j][i] = 0;
      }
    }
  }

  // TODO: 将第一行/列全 设置为0
  if (firstRowHasZero) {
    for (let i = 0; i < matrix[0].length; i++) {
      matrix[0][i] = 0;
    }
  }
  if (firstColHasZero) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][0] = 0;
    }
  }
  return matrix;
}

// 执行所有测试
testCases.forEach(({ name, matrix }) => {
  console.log(`\n==================== ${name} ====================`);
  // 深拷贝原矩阵（避免算法修改原数组影响打印）
  const originalMatrix = JSON.parse(JSON.stringify(matrix));
  const resultMatrix = setZeros(JSON.parse(JSON.stringify(matrix)));

  printMatrix(originalMatrix, '输入矩阵');
  printMatrix(resultMatrix, '输出矩阵');
});
