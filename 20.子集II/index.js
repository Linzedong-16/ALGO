/**
 * 子集 II 传入的数组可以有重复的情况下
 * @param {Array<number>} nums
 * @returns {Array<Array<number>>} result
 */
function subSetsWithDup(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  function tb(start, curr) {
    result.push([...curr]); // 引用类型不能直接添加

    // i > start 是因为不能把起点和起点之前的节点考虑重复
    // 这样会把 [1, 2, 2] 过滤掉
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }

      curr.push(nums[i]);
      tb(i + 1, curr);
      curr.pop();
    }
  }

  tb(0, []);

  return result;
}
/**
 * 子集 II 传入的数组可以有重复的情况下
 * @param {Array<number>} nums
 * @returns {Array<Array<number>>} result
 */
function subSetsWithDup2(nums) {
  const res = [];
  // 先排序，把重复元素堆叠一起
  nums.sort((a, b) => a - b);

  /**
   * 回溯函数
   * @param {number} start 下一轮循环起点
   * @param {Array<number>} curr 起点之前的子集数组
   */
  function traceBack(start, curr) {
    res.push([...curr]); // 记得深拷贝

    for (let i = start; i < nums.length; i++) {
      // 避免重复
      if (start < i && nums[i] === nums[i - 1]) {
        continue;
      }
      // 同一层只出现一次： 如保证 [2] 只有一个，如果时子集I他们会出现2次，而且是TB传入(0, [])时同一层的循环
      // 第一个 [2]: i = 1，curr.push(2)
      // 第二个 [2]: i = 2, 因为 i > 0 且 nums[2] === nums[1] === 2跳过 ✔
      curr.push(nums[i]);
      traceBack(i + 1, curr); // 有加入122的层的参数是 ( 2, [ 1, 2 ]  )
      curr.pop();
    }
  }
  traceBack(0, []);

  return res;
}

Deno.test('测试子集2', () => {
  console.log(subSetsWithDup([1, 2, 2]));
  console.log(subSetsWithDup2([1, 2, 2]));
});
