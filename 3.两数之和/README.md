# 两数之和

## 题目描述
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。

## 题型分析
- **题型分类**：数组处理、哈希表、查找问题
- **难度等级**：简单
- **核心考点**：哈希表查找、互补数思想

## 解题思路

### 方法：哈希表（一次遍历）

#### 思路解析
对于每个元素 nums[i]，我们需要找到一个元素 nums[j] 使得 nums[i] + nums[j] = target。
这等价于寻找 target - nums[i]，也就是 nums[i] 的互补数。

#### 核心思想
1. **哈希表存储**：使用哈希表存储已遍历过的元素及其索引
2. **互补数查找**：对于当前元素，检查其互补数是否已经在哈希表中
3. **一次遍历**：边遍历边查找，避免两次遍历

#### 算法步骤
1. 创建一个空哈希表 map
2. 遍历数组，对于每个元素 nums[i]：
   - 计算互补数：complement = target - nums[i]
   - 检查 complement 是否在 map 中：
     - 如果存在，返回 [map.get(complement), i]
     - 如果不存在，将当前元素存入 map：map.set(nums[i], i)
3. 如果遍历结束还没找到，返回空数组

## 代码实现

```javascript
/**
 * 两数相加等于target
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
      // 将数组的索引作为Map的值，将数值作为Map的键
      map.set(nums[index], index);
    }
  }
  return [];
};
```

## 复杂度分析

- **时间复杂度**：O(n)
  - 只需遍历数组一次
  - 哈希表的查找和插入操作平均时间复杂度为 O(1)

- **空间复杂度**：O(n)
  - 最坏情况下需要存储所有元素到哈希表中

## 示例演示

### 示例1：nums = [2, 3, 11, 7], target = 9

遍历过程：
1. **i=0, nums[0]=2**
   - complement = 9 - 2 = 7
   - map中没有7，存储 {2: 0}
   - map: {2: 0}

2. **i=1, nums[1]=3**
   - complement = 9 - 3 = 6
   - map中没有6，存储 {2: 0, 3: 1}
   - map: {2: 0, 3: 1}

3. **i=2, nums[2]=11**
   - complement = 9 - 11 = -2
   - map中没有-2，存储 {2: 0, 3: 1, 11: 2}
   - map: {2: 0, 3: 1, 11: 2}

4. **i=3, nums[3]=7**
   - complement = 9 - 7 = 2
   - map中有2，对应索引为0
   - **返回 [0, 3]**

### 示例2：nums = [3, 2, 4], target = 6

遍历过程：
1. **i=0, nums[0]=3**
   - complement = 6 - 3 = 3
   - map中没有3，存储 {3: 0}

2. **i=1, nums[1]=2**
   - complement = 6 - 2 = 4
   - map中没有4，存储 {3: 0, 2: 1}

3. **i=2, nums[2]=4**
   - complement = 6 - 4 = 2
   - map中有2，对应索引为1
   - **返回 [1, 2]**

## 关键点总结

### 1. **哈希表的作用**
- 快速查找互补数是否存在
- 时间复杂度从 O(n²) 优化到 O(n)

### 2. **存储策略**
- **Key**：数组元素的值
- **Value**：数组元素的索引
- 便于通过互补数值快速找到对应索引

### 3. **一次遍历的优势**
- 避免了两次遍历的O(2n)时间复杂度
- 在遍历过程中就完成了查找和存储

### 4. **边界条件处理**
- 如果找不到满足条件的两个数，返回空数组
- 注意相同元素的处理（如 target = 2, nums = [1, 1]）

## 其他解法对比

### 方法1：暴力枚举（不推荐）
```javascript
// 时间复杂度：O(n²)
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) {
      return [i, j];
    }
  }
}
```

### 方法2：先排序后双指针（会改变索引）
```javascript
// 会改变原始索引顺序，不适合本题
const sortedNums = nums.map((val, idx) => ({val, idx}))
                     .sort((a, b) => a.val - b.val);
```

## 扩展思考

### 变体问题
- **三数之和**：寻找三个数的和等于target
- **最接近的两数之和**：寻找和最接近target的两个数
- **两数之和 II**：数组有序，寻找和等于target的两个数

### 优化思考
- 如果数组很大，考虑分批处理
- 如果有多组解，考虑返回所有组合

## 相关题型
- [三数之和](https://leetcode.cn/problems/3sum/)
- [两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)
- [四数之和](https://leetcode.cn/problems/4sum/)