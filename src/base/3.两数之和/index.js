/**
 * 两数相加等于target
 * 数组、哈希表
 * @param {Array<number>} nums
 * @param {number} target
 * @returns {Array<number>} result
 */
const twoSum = function (nums, target) {
  const map = new Map();
  for (let index = 0; index < nums.length; index++) {
    const complement = target - nums[index];
    if (map.has(complement)) {
      return [map.get(complement), index];
    } else {
      map.set(nums[index], index); // 计算的值作为Map索引,将数组的索引作为Map的值
    }
  }
  return [];
};

const res = twoSum([2, 3, 11, 7], 9);
console.log(res);
