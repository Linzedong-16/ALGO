/**
 * 两数相加等于target
 * @param {Array<number>} nums
 * @param {number} target
 * @returns {Array<number>} result
 */
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const left = target - nums[i];
    if (map.has(left)) {
      return [map.get(left)!, i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
}

const res = twoSum([2, 3, 11, 7], 9);
console.log(res);
