/**
 * 给数加1模拟十进制加法进位运算过程
 * @param digits
 * @returns
 */
function plusOne(digits: number[]) {
  for (let i = digits.length - 1; i >= 0; i--) {
    // 当前位为9时+1，会进位，不阻断循环
    if (digits[i] === 9) {
      digits[i] = 0;
    } else {
      // 不等于9时+1，会阻断进位
      digits[i]++;
      return digits;
    }
  }

  return [1, ...digits];
}

console.log(plusOne([9, 9, 9]));
console.log(plusOne([9, 8, 9]));
