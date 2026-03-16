/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
const floodFill = function (image, sr, sc, color) {
  if (image[sr][sc] === color) {
    return image;
  }
  const initColor = image[sr][sc];

  paint(sr, sc);

  function paint(sr, sc) {
    const queue = [[sr, sc]];
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];

    while (queue.length > 0) {
      const [sr, sc] = queue.pop();
      image[sr][sc] = color;
      for (const [x, y] of directions) {
        const dx = x + sr;
        const dy = y + sc;
        if (
          dx >= 0 &&
          dx < image.length &&
          dy >= 0 &&
          dy < image[0].length &&
          image[dx][dy] === initColor
        ) {
          queue.push([dx, dy]);
        }
      }
    }
  }
  // function paint(sr, sc) {
  //     if (sr >= 0 && sr < image.length && sc >= 0 && sc < image[0].length && image[sr][sc] === initColor) {
  //         image[sr][sc] = color
  //         paint(sr + 1, sc)
  //         paint(sr - 1, sc)
  //         paint(sr, sc + 1)
  //         paint(sr, sc - 1)
  //     }
  // }
  return image;
};

import { assertEquals } from '@std/assert';
Deno.test('图像渲染', () => {
  assertEquals(
    floodFill(
      [
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1]
      ],
      1,
      1,
      2
    ),
    [
      [2, 2, 2],
      [2, 2, 0],
      [2, 0, 1]
    ]
  );
});
