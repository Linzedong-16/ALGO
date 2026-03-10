/**
 * @param {Array<number>} digits
 * @returns {Array<number>} res
 */
const plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] !== 9) {
      digits[i]++;
      return digits;
    } else {
      digits[i] = 0;
    }
  }
  return [1, ...digits];
};

console.log(plusOne([9, 9, 9]));
console.log(plusOne([9, 9, 8]));
console.log(plusOne([4, 7, 9]));
