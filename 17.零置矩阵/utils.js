/**
 * 格式化打印二维矩阵（可视化输出）
 * @param {Array<Array<number>>} matrix 要打印的矩阵
 * @param {string} title 标题（如“输入矩阵”/“输出矩阵”）
 */
export function printMatrix(matrix, title = "矩阵") {
  if (!matrix || matrix.length === 0) {
    console.log(`\n===== ${title} =====`);
    console.log("空矩阵");
    return;
  }

  // 计算每列的最大数字长度（对齐用）
  const colMaxLengths = [];
  for (let col = 0; col < matrix[0].length; col++) {
    let maxLen = 0;
    for (let row = 0; row < matrix.length; row++) {
      const len = String(matrix[row][col]).length;
      maxLen = Math.max(maxLen, len);
    }
    colMaxLengths.push(maxLen);
  }

  // 打印标题 + 格式化矩阵
  console.log(`\n===== ${title} =====`);
  matrix.forEach((row) => {
    const formattedRow = row
      .map((num, colIdx) => {
        return num.toString().padStart(colMaxLengths[colIdx], " ");
      })
      .join(" | ");
    console.log(`[ ${formattedRow} ]`);
  });
}

// 测试用例集合
export const testCases = [
  {
    name: "基础场景（内部有零）",
    matrix: [
      [1, 2, 3],
      [4, 0, 6],
      [7, 8, 9],
    ],
  },
  {
    name: "边角有零",
    matrix: [
      [0, 2, 3],
      [4, 5, 6],
      [7, 8, 0],
    ],
  },
  { name: "单行矩阵", matrix: [[1, 0, 3, 4]] },
  { name: "单列矩阵", matrix: [[1], [0], [3]] },
  {
    name: "全零矩阵",
    matrix: [
      [0, 0],
      [0, 0],
    ],
  },
  {
    name: "无零矩阵",
    matrix: [
      [1, 2],
      [3, 4],
    ],
  },
  {
    name: "非方阵",
    matrix: [
      [1, 2, 3, 4],
      [5, 0, 7, 8],
      [9, 10, 11, 12],
    ],
  },
];
