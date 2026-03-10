# 最大子序和

## 题目描述
给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

## 题型分析
- **题型分类**：动态规划、数组处理、最值问题
- **难度等级**：中等
- **核心考点**：动态规划思想、状态转移、最优子结构

## 解题思路

### 方法：动态规划（Kadane算法）

#### 思路解析
对于每个位置i，我们要决定是以当前元素开始新的子数组，还是继续之前的子数组。这个决策基于"当前元素之前的最优解"来做出。

#### 核心思想
1. **状态定义**：dp[i] 表示以 nums[i] 结尾的连续子数组的最大和
2. **状态转移**：dp[i] = max(nums[i], dp[i-1] + nums[i])
3. **全局最优**：在所有dp[i]中取最大值
4. **空间优化**：只需记录前一个状态，不需要完整数组

#### 算法步骤
1. 初始化：max = nums[0], memo[0] = nums[0]
2. 遍历数组（从第2个元素开始）：
   - 计算当前位置的最优解：memo[i] = max(nums[i], memo[i-1] + nums[i])
   - 更新全局最大值：max = max(max, memo[i])
3. 返回max

## 代码实现

### 方法1：动态规划（自底向上）

```javascript
/**
 * 动态规划典型：跟着状态(memo[i]的确定)走，每步都选最优，最后全局最优
 * @param {Array<number>} num
 * @returns {number} max
 */
var maxSubArray = function (num) {
  let max = num[0]; // 要返回的最大值(数组只有一个元素返回起始位)
  let memo = []; // 连续数组计算序列和计算值，将数组每个元素看作一个子数组
  memo[0] = max; // 起始位数组: [ num[0] ]
  
  for (let i = 1; i < num.length; i++) {
    // 状态转移：要么重新开始，要么继续之前的子数组
    memo[i] = Math.max(num[i] + memo[i - 1], num[i]);
    max = Math.max(memo[i], max); // 更新全局最大值
  }
  
  return max;
};
```

### 方法2：动态规划（自顶向下）

```javascript
/**
 * 动态规划典型思路二：自顶向下,有递归开销
 * @param {Array<number>} num
 * @returns {number} max
 */
var maxSubArray = function (num) {
  const memo = Array(num.length).fill(undefined);

  const dp = (i) => {
    if (i === 0) return (memo[i] = num[0]);
    
    // 递归计算前一个状态的最优解
    memo[i] = Math.max(dp(i - 1) + num[i], num[i]);
    return memo[i];
  };
  
  dp(num.length - 1); // 计算所有状态
  return Math.max(...memo); // 返回最大值
};
```

### 方法3：Kadane算法（空间优化）

```javascript
/**
 * Kadane算法：空间优化版本
 * @param {Array<number>} num
 * @returns {number} max
 */
var maxSubArray = function (num) {
  let maxSoFar = num[0]; // 当前子数组的最大和
  let maxEndingHere = num[0]; // 以当前位置结尾的最大和
  
  for (let i = 1; i < num.length; i++) {
    // 状态转移
    maxEndingHere = Math.max(num[i], maxEndingHere + num[i]);
    // 更新全局最大值
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
};
```

## 复杂度分析

- **时间复杂度**：O(n)
  - n 是数组的长度
  - 只需要遍历数组一次

- **空间复杂度**：O(1) 或 O(n)
  - O(n)：使用完整memo数组
  - O(1)：只使用常数个变量（Kadane算法）

## 示例演示

### 示例1：nums = [-2,1,-3,4,-1,2,1,-5,4]

```
动态规划过程：
i=0: dp[0] = -2, max = -2
i=1: dp[1] = max(1, -2+1) = 1, max = 1
i=2: dp[2] = max(-3, 1-3) = -2, max = 1
i=3: dp[3] = max(4, -2+4) = 4, max = 4
i=4: dp[4] = max(-1, 4-1) = 3, max = 4
i=5: dp[5] = max(2, 3+2) = 5, max = 5
i=6: dp[6] = max(1, 5+1) = 6, max = 6
i=7: dp[7] = max(-5, 6-5) = 1, max = 6
i=8: dp[8] = max(4, 1+4) = 5, max = 6

结果：6
子数组：[4,-1,2,1]
```

### 示例2：nums = [1]

```
i=0: dp[0] = 1, max = 1
结果：1
```

### 示例3：nums = [5,4,-1,7,8]

```
i=0: dp[0] = 5, max = 5
i=1: dp[1] = max(4, 5+4) = 9, max = 9
i=2: dp[2] = max(-1, 9-1) = 8, max = 9
i=3: dp[3] = max(7, 8+7) = 15, max = 15
i=4: dp[4] = max(8, 15+8) = 23, max = 23

结果：23
子数组：[5,4,-1,7,8]
```

## 关键点总结

### 1. **状态转移方程**
`dp[i] = max(nums[i], dp[i-1] + nums[i])`
- `nums[i]`：从当前元素重新开始
- `dp[i-1] + nums[i]`：继续之前的子数组

### 2. **全局最优 vs 局部最优**
- `dp[i]`：以i结尾的最优解（局部）
- `max(dp[0...i])`：全局最优解
- 每步都要更新全局最大值

### 3. **动态规划思想**
- 最优子结构：当前最优解依赖于前一个最优解
- 重叠子问题：重复计算相同的子问题
- 自底向上：从小问题推导到大问题

### 4. **空间优化**
- 只需要前一个状态，不需要完整数组
- Kadane算法是经典的空间优化版本

## 其他解法对比

### 方法1：暴力枚举（不推荐）
```javascript
var maxSubArray = function(nums) {
  let max = nums[0];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      let sum = 0;
      for (let k = i; k <= j; k++) {
        sum += nums[k];
      }
      max = Math.max(max, sum);
    }
  }
  return max;
};
```
**时间复杂度**：O(n³)

### 方法2：前缀和优化
```javascript
var maxSubArray = function(nums) {
  const prefixSum = [0];
  for (let i = 0; i < nums.length; i++) {
    prefixSum[i + 1] = prefixSum[i] + nums[i];
  }
  
  let max = nums[0];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      max = Math.max(max, prefixSum[j + 1] - prefixSum[i]);
    }
  }
  return max;
};
```
**时间复杂度**：O(n²)

### 方法3：分治法
```javascript
var maxSubArray = function(nums) {
  const divideAndConquer = (left, right) => {
    if (left === right) return nums[left];
    
    const mid = Math.floor((left + right) / 2);
    const leftMax = divideAndConquer(left, mid);
    const rightMax = divideAndConquer(mid + 1, right);
    
    // 计算跨越中点的最大子数组
    let leftSum = -Infinity;
    let sum = 0;
    for (let i = mid; i >= left; i--) {
      sum += nums[i];
      leftSum = Math.max(leftSum, sum);
    }
    
    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
      sum += nums[i];
      rightSum = Math.max(rightSum, sum);
    }
    
    const crossMax = leftSum + rightSum;
    return Math.max(leftMax, rightMax, crossMax);
  };
  
  return divideAndConquer(0, nums.length - 1);
};
```
**时间复杂度**：O(n log n)

## 常见错误

### 1. 初始化错误
```javascript
// 错误：初始化为0而不是第一个元素
let max = 0;
```

### 2. 状态转移错误
```javascript
// 错误：没有考虑重新开始的情况
memo[i] = memo[i-1] + nums[i]; // 应该是 Math.max(nums[i], memo[i-1] + nums[i])
```

### 3. 全局最大值更新错误
```javascript
// 错误：只更新了局部最优解
memo[i] = Math.max(nums[i], memo[i-1] + nums[i]);
// 忘记更新全局最大值
```

### 4. 边界条件处理
```javascript
// 错误：没有考虑空数组的情况
if (num.length === 0) return 0;
```

## 扩展思考

### 变体问题
- **最大子数组乘积**：乘积版本，需要处理负数
- **环形数组最大子数组**：数组是环形的
- **最大子数组的起始和结束位置**：还要返回子数组的索引

### 应用场景
- **股票买卖**：找到最佳买入卖出时机
- **信号处理**：寻找信号的最强片段
- **游戏设计**：计算连续得分

### 算法优化
- **并行计算**：可以将数组分段并行处理
- **在线算法**：可以处理流式数据
- **多维扩展**：扩展到二维数组的最大子矩阵

## 相关题型
- [乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/)
- [环形子数组的最大和](https://leetcode.cn/problems/maximum-sum-circular-subarray/)
- [最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)