# 区间合并

## 题目描述
以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

## 题型分析
- **题型分类**：贪心算法、区间问题、排序
- **难度等级**：中等
- **核心考点**：区间排序、重叠判断、合并技巧

## 解题思路

### 方法：排序 + 贪心合并

#### 思路解析
区间合并的核心是先按起始位置排序，然后遍历判断当前区间是否与前一个区间重叠。如果重叠就合并，不重叠就作为新的区间开始。

#### 核心思想
1. **排序规则**：按区间起始位置升序排序
2. **重叠判断**：当前区间起始位置 ≤ 前一个区间结束位置
3. **合并策略**：重叠时更新结束位置为最大值
4. **贪心思想**：每次都尽可能合并更多区间

#### 算法步骤
1. 如果区间数量小于2，直接返回
2. 按起始位置升序排序：`intervals.sort((a, b) => a[0] - b[0])`
3. 初始化当前区间 `curr = intervals[0]`
4. 遍历剩余区间：
   - 如果重叠（`curr[1] >= interval[0]`）：合并区间，更新结束位置
   - 如果不重叠：将当前区间加入结果，更新当前区间
5. 将最后一个当前区间加入结果
6. 返回结果数组

## 代码实现

```javascript
/**
 * 合并区间
 * @param {Array<Array<number>>} intervals
 * @returns {Array<Array<number>>} result
 */
var merge = function (intervals) {
  if (intervals.length < 2) return intervals;
  
  // 按起始位置升序排序
  intervals.sort((a, b) => a[0] - b[0]);

  let curr = intervals[0]; // 当前处理的区间
  const result = [];
  
  for (const interval of intervals) {
    if (curr[1] >= interval[0]) {
      // 区间重叠，合并区间：更新结束位置为较大值
      curr[1] = Math.max(curr[1], interval[1]);
    } else {
      // 区间不重叠，将当前区间加入结果，开始新区间
      result.push(curr);
      curr = interval;
    }
  }
  
  // 将最后一个区间加入结果
  if (curr.length !== 0) result.push(curr);
  
  return result;
};
```

## 复杂度分析

- **时间复杂度**：O(n log n)
  - 排序时间：O(n log n)
  - 遍历合并：O(n)
  - 总体：O(n log n)

- **空间复杂度**：O(1)
  - 不考虑结果数组，只使用常数个额外空间
  - 排序可能需要O(log n)的栈空间

## 示例演示

### 示例1：输入 [[1,3],[2,6],[8,10],[15,18]]

```
排序前：[[1,3],[2,6],[8,10],[15,18]]
排序后：[[1,3],[2,6],[8,10],[15,18]] (已有序)

处理过程：
1. curr = [1,3]
   检查 [1,3] 和 [2,6]：
   3 >= 2 → 重叠
   合并：curr = [1, max(3,6)] = [1,6]

2. curr = [1,6]
   检查 [1,6] 和 [8,10]：
   6 >= 8? 不 → 不重叠
   result = [[1,6]]
   curr = [8,10]

3. curr = [8,10]
   检查 [8,10] 和 [15,18]：
   10 >= 15? 不 → 不重叠
   result = [[1,6], [8,10]]
   curr = [15,18]

4. 结束遍历，添加最后一个区间
   result = [[1,6], [8,10], [15,18]]

输出：[[1,6],[8,10],[15,18]]
```

### 示例2：输入 [[1,4],[4,5]]

```
排序前：[[1,4],[4,5]]
排序后：[[1,4],[4,5]]

处理过程：
1. curr = [1,4]
   检查 [1,4] 和 [4,5]：
   4 >= 4 → 重叠（边界也算重叠）
   合并：curr = [1, max(4,5)] = [1,5]

2. 结束遍历，添加最后一个区间
   result = [[1,5]]

输出：[[1,5]]
```

### 示例3：输入 [[1,3],[2,5],[12,33],[2,6],[8,10]]

```
排序前：[[1,3],[2,5],[12,33],[2,6],[8,10]]
排序后：[[1,3],[2,5],[2,6],[8,10],[12,33]]

处理过程：
1. curr = [1,3]
   检查 [1,3] 和 [2,5]：
   3 >= 2 → 重叠
   合并：curr = [1,5]

2. curr = [1,5]
   检查 [1,5] 和 [2,6]：
   5 >= 2 → 重叠
   合并：curr = [1,6]

3. curr = [1,6]
   检查 [1,6] 和 [8,10]：
   6 >= 8? 不 → 不重叠
   result = [[1,6]]
   curr = [8,10]

4. curr = [8,10]
   检查 [8,10] 和 [12,33]：
   10 >= 12? 不 → 不重叠
   result = [[1,6], [8,10]]
   curr = [12,33]

5. 结束遍历，添加最后一个区间
   result = [[1,6], [8,10], [12,33]]

输出：[[1,6],[8,10],[12,33]]
```

## 关键点总结

### 1. **排序的重要性**
- 按起始位置排序是解决区间问题的关键
- 确保后续区间的起始位置不会小于前面的区间
- 简化了重叠判断逻辑

### 2. **重叠判断条件**
- `curr[1] >= interval[0]`
- 当前区间的结束位置 ≥ 下一个区间的起始位置
- 边界情况：[1,4] 和 [4,5] 也算重叠

### 3. **合并策略**
- 重叠时：只更新结束位置 `Math.max(curr[1], interval[1])`
- 起始位置保持不变（因为已排序，前面的起始位置更小）
- 不重叠时：将当前区间存入结果，开始新区间

### 4. **贪心思想的应用**
- 每次都尽可能合并更多区间
- 局部最优（最大化合并）导致全局最优
- 一次遍历完成所有合并

## 其他解法对比

### 方法2：使用额外数组存储结果
```javascript
var merge = function(intervals) {
  if (intervals.length < 2) return intervals;
  
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    const current = intervals[i];
    
    if (last[1] >= current[0]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      result.push(current);
    }
  }
  
  return result;
};
```
**优点**：逻辑更清晰
**缺点**：需要额外的结果数组存储

### 方法3：使用栈
```javascript
var merge = function(intervals) {
  if (intervals.length < 2) return intervals;
  
  intervals.sort((a, b) => a[0] - b[0]);
  const stack = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const top = stack[stack.length - 1];
    const current = intervals[i];
    
    if (top[1] >= current[0]) {
      top[1] = Math.max(top[1], current[1]);
    } else {
      stack.push(current);
    }
  }
  
  return stack;
};
```
**缺点**：使用了额外的栈空间

## 常见错误

### 1. 忘记排序
```javascript
// 错误：没有排序就直接合并
var merge = function(intervals) {
  // 直接遍历合并，会导致遗漏重叠的区间
}
```

### 2. 重叠判断错误
```javascript
// 错误：使用 > 而不是 >=
if (curr[1] > interval[0]) { // 边界情况会遗漏
```

### 3. 合并策略错误
```javascript
// 错误：合并时只更新了结束位置，但没有取最大值
curr[1] = interval[1]; // 应该是 Math.max(curr[1], interval[1])
```

### 4. 忘记添加最后一个区间
```javascript
// 错误：循环结束后忘记添加最后一个区间
for (const interval of intervals) {
  // 合并逻辑
}
// 忘记 result.push(curr);
```

## 扩展思考

### 变体问题
- **插入区间**：向已排序的区间数组中插入新区间并合并
- **区间交集**：计算多个区间的交集
- **区间覆盖**：判断一个区间是否被其他区间覆盖

### 应用场景
- **会议室安排**：合并重叠的会议时间
- **资源分配**：合并连续的资源占用时间段
- **数据压缩**：合并连续的数据范围

### 算法优化
- **原地合并**：不使用额外空间，在原数组上修改
- **并行处理**：将区间分组并行处理
- **增量处理**：支持动态添加新区间

## 相关题型
- [插入区间](https://leetcode.cn/problems/insert-interval/)
- [区间列表的交集](https://leetcode.cn/problems/interval-list-intersections/)
- [汇总区间](https://leetcode.cn/problems/summary-ranges/)