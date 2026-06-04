/**
 * 旋转数组
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  console.log('----before----');
  console.log(matrix);
  // 上下翻转
  matrix.reverse();
  // 对角线换位
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = count; j < matrix[0].length; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
    count++;
  }
  console.log('----after-----');
  console.log(matrix);
}

Deno.test('旋转图像', () => {
  rotate([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);
});
