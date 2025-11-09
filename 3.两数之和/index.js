/**
 * 两数详解等于target
 * @param {Array<number>} nums
 * @param {number} target
 * @returns {Array<number>} result
 */
var twoSum = function (nums, target) {
  const map = new Map();
  for (let index = 0; index < nums.length; index++) {
    const complement = target - nums[index];
    if (map.has(complement)) {
      return [map.get(complement), index];
    } else {
      map.set(nums[index], index);
    }
  }
  return [];
};

const res = twoSum([2, 3, 11, 7], 9);
console.log(res);
