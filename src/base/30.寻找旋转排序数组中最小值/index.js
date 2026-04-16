/**
 * 寻找旋转排序数组中的最小值
 * 数组、二分查找
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }
  // 二分查找 + 反转规则
  let left = 0;
  let right = nums.length - 1;
  // 未反转
  if (nums[left] < nums[right]) {
    return nums[0];
  }

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] < nums[mid - 1]) {
      return nums[mid];
    }
    if (nums[mid + 1] < nums[mid]) {
      return nums[mid + 1];
    }

    if (nums[left] > nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
};

Deno.test('旋转数组最小值', () => {
  console.log(findMin([3, 4, 5, 1, 2]));
  console.log(findMin([4, 5, 6, 7, 0, 1, 2]));
});
