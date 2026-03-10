/**
 * 排序与双指针的方式，三数相加为0
 * @param {Array<number>} arr
 * @returns {Array<Array<number>>} res
 */
function threeSum(arr: number[]) {
  const res: Array<number[]> = [];
  const nums = arr.sort((a, b) => a - b); //必须先排序
  for (let i = 0; i < nums.length - 2; i++) {
    // 防止基准值重复比较( i不能等于0 )
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[left] + nums[i] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) {
          left++; // 指向数组中重复数值的最后一个
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--; //指向数组中重复数值的早的一个
        }
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
}

const res = threeSum([-1, 0, 1, 2, -1, -4]);
console.log(res);
