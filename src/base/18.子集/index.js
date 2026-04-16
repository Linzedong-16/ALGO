/**
 * 子集
 * 数组、回溯
 * @param {Array<number>} nums
 * @returns {Array<Array<number>>} result
 */
function subSet(nums) {
  const result = [];

  function backTrack(start, curr) {
    result.push([...curr]); // []
    for (let i = start; i < nums.length; i++) {
      // 扩充curr数组
      curr.push(nums[i]); // [1]           [2]        [3]
      backTrack(i + 1, curr); // 1 [1]         2 [2]      3[3]
      curr.pop(); // [] []  []
    }
  }
  backTrack(0, []);
  return result;
}

/**
 * 子集
 * 数组、回溯
 * @param {Array<Array<number>>} nums
 * @returns {Array<Array<number>>} result
 */
function subSet2(nums) {
  const result = [];

  /**
   *
   * @param {number} start
   * @param {Array<number>} currArr
   */
  function tb(start, currArr) {
    result.push([...currArr]); // 先把当前待修改子集加入结果

    // 这个for循环按照顺序一个个遍历元素保证只能向后找
    for (let i = start; i < nums.length; i++) {
      // 如 当前为[]，加0号元素，先把只有一个元素的子集在for循环遍历完
      currArr.push(nums[i]);
      // 递归 以当前子集开头的其他组合
      tb(i + 1, currArr);
      // 回溯的关键在于处于递归函数同一层同一个循环体的元素都要一个个加入
      currArr.pop(); // [] 预留空间，让同级的其他元素加入形成新的子集组合
    }
  }

  tb(0, []);
  return result;
}

console.log(subSet2([1, 2, 3]));

/**
 * ====================== 回溯法求子集（无重复元素）======================
 * 【核心思想】：
 * 子集问题是「遍历树形结构，收集所有节点」，而非仅收集叶子节点
 * 每一步选择一个元素加入当前子集，递归处理后续元素，递归返回后撤销选择（回溯）
 *
 * 【伪代码思路/记忆模板】：
 * 1. 定义主函数 subSet(nums)：
 *    - 初始化结果数组 result = [] （存储所有子集）
 *
 *    2. 定义嵌套回溯函数 backTrack(start, curr)：
 *       参数说明：
 *       - start：本轮选择的起始索引（避免重复生成子集，比如[1,2]和[2,1]）
 *       - curr：当前正在构建的子集（路径）
 *
 *       步骤1：保存当前路径 → 把curr的拷贝存入result（必须拷贝，否则存引用会污染结果）
 *       步骤2：遍历选择列表 → 从start开始遍历nums（只选当前及之后的元素）
 *           步骤2.1：做出选择 → 把nums[i]加入curr数组
 *           步骤2.2：递归深入 → 调用backTrack(i+1, curr)（i+1保证不回头选，避免重复）
 *           步骤2.3：撤销选择（回溯） → 把nums[i]从curr中移除（恢复状态，尝试下一个选择）
 *
 *    3. 启动回溯 → 调用backTrack(0, [])（初始：从第0个元素开始，当前子集为空）
 *    4. 返回结果 → 返回result数组
 *
 * 【关键易错点（背死！）】：
 * - 保存路径时必须拷贝：result.push([...curr])，不能直接push(curr)
 * - 遍历起始点是start，不是0，否则会生成重复子集
 * - 递归参数是i+1，不是start+1，否则会漏选元素
 * - 必须有curr.pop()，否则curr会一直累加，无法回溯
 */
