/**
 * 矩形重叠
 * 数学、几何
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
const isRectangleOverlap = function (rec1, rec2) {
  const [left1, down1, right1, top1] = rec1;
  const [left2, down2, right2, top2] = rec2;
  if (left1 >= right2 || right1 <= left2 || top1 < down2 || top2 <= down1) {
    return false;
  }
  return true;
};

import { assertEquals } from '@std/assert';
Deno.test('矩形重叠', () => {
  assertEquals(isRectangleOverlap([0, 0, 2, 2], [1, 1, 3, 3]), true);
});
