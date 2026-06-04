/**
 * 杨辉三角
 * @param numRows 行数
 */
function generate(numRows: number): number[][] {
  const triangle: number[][] = [];
  triangle.push([1]);
  let prev = triangle[0];
  for (let i = 1; i < numRows; i++) {
    const curr = new Array<number>(i + 1);
    curr[0] = 1;
    curr[i] = 1;
    for (let j = 1; j < i; j++) {
      curr[j] = prev[j - 1] + prev[j];
    }
    prev = curr;
    triangle.push(curr);
  }

  return triangle;
}

Deno.test('generate', () => {
  console.log(generate(5));
});
