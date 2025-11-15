/**
 * 排序与双指针的方式，三数相加为0
 * @param {Array<number>} nums
 * @returns {Array<Array<number>>} res
 */
var threeSum = function (nums) {
  const res = [];
  nums.sort((a, b) => a - b); // 关键条件:先排序
  for (let i = 0; i < nums.length - 2; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      let start = i + 1,
        end = nums.length - 1;
      while (start < end) {
        const sum = nums[i] + nums[start] + nums[end];
        if (sum === 0) {
          res.push([nums[i], nums[start], nums[end]]);
          // 结果去重，指向连续相同的值的最后与最初的两位,跳过双指针重复的数字
          while (start < end && nums[start] === nums[start + 1]) {
            start++;
          }
          while (start < end && nums[end] === nums[end - 1]) {
            end--;
          }
          // 进入下一位与前一位
          start++;
          end--;
        } else if (sum > 0) {
          end--;
        } else {
          start++;
        }
      }
    }
  }
  return res;
};
const res = threeSum([-1, 0, 1, 2, -1, -4]);
console.log(res);
