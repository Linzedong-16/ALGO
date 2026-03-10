# 爬楼梯

## 题目描述
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

## 题型分析
- **题型分类**：动态规划、斐波那契数列、递推关系
- **难度等级**：简单
- **核心考点**：动态规划状态转移、递推关系、最优子结构

## 解题思路

### 方法：动态规划

#### 思路解析
要到达第n阶楼梯，最后一步可能是从第(n-1)阶爬1阶上来，也可能是从第(n-2)阶爬2阶上来。这两种情况是互斥的，所以总的方法数就是这两种情况的和。

#### 核心思想
1. **状态定义**：dp[i] 表示爬到第i阶楼梯的方法数
2. **状态转移**：dp[i] = dp[i-1] + dp[i-2]
3. **边界条件**：dp[1] = 1, dp[2] = 2
4. **递推关系**：这实际上就是斐波那契数列

#### 算法步骤
1. 创建数组 memo 存储每阶的方法数
2. 初始化边界条件：memo[1] = 1, memo[2] = 2
3. 从第3阶开始递推：
   - memo[i] = memo[i-1] + memo[i-2]
4. 返回 memo[n]

## 代码实现

```javascript
/**
 * 爬楼梯问题：爬一步、两步，爬法
 * 第 n 级台阶 前一步 从 (n-1)阶爬上来 或 (n-2)阶爬上来，共两类，这两类细分共有多少种，则第 n 阶就有几个爬法
 * @param {number} n
 * @returns {number}
 */
var climbStairs = function (n) {
  const memo = [];
  
  // 边界条件
  memo[1] = 1; // 爬1阶只有1种方法：爬1步
  memo[2] = 2; // 爬2阶有2种方法：1+1 或 2
  
  // 从第3阶开始递推
  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  
  return memo[n];
};
```

### 优化版本：空间优化

```javascript
/**
 * 空间优化版本：只存储前两个状态
 * @param {number} n
 * @returns {number}
 */
var climbStairs = function (n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  
  let prev2 = 1; // dp[i-2]
  let prev1 = 2; // dp[i-1]
  let current;
  
  for (let i = 3; i <= n; i++) {
    current = prev1 + prev2; // dp[i] = dp[i-1] + dp[i-2]
    prev2 = prev1; // 更新前一个状态
    prev1 = current; // 更新当前状态
  }
  
  return current;
};
```

### 递归版本（带记忆化）

```javascript
/**
 * 递归版本：带记忆化搜索
 * @param {number} n
 * @returns {number}
 */
var climbStairs = function (n) {
  const memo = new Array(n + 1).fill(-1);
  
  const climb = (i) => {
    if (i <= 2) return i; // 边界条件
    if (memo[i] !== -1) return memo[i]; // 已经计算过
    
    memo[i] = climb(i - 1) + climb(i - 2); // 递归计算
    return memo[i];
  };
  
  return climb(n);
};
```

### 数学方法：斐波那契数列公式

```javascript
/**
 * 数学方法：使用斐波那契数列的通项公式
 * @param {number} n
 * @returns {number}
 */
var climbStairs = function (n) {
  // 斐波那契数列：F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5...
  // 爬楼梯问题：f(1)=1, f(2)=2, f(3)=3, f(4)=5, f(5)=8...
  // 实际上是 F(n+1)
  
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  
  // 斐波那契数列通项公式
  const fib = Math.floor(
    Math.pow(goldenRatio, n + 1) / Math.sqrt(5) + 0.5
  );
  
  return fib;
};
```

## 复杂度分析

### 动态规划方法
- **时间复杂度**：O(n)
- **空间复杂度**：O(n) 或 O(1)（空间优化版）

### 递归方法（无记忆化）
- **时间复杂度**：O(2^n) - 会超时
- **空间复杂度**：O(n) - 递归栈深度

### 数学方法
- **时间复杂度**：O(1)
- **空间复杂度**：O(1)

## 示例演示

### 示例1：n = 2

```
分析：
- 1步 + 1步
- 2步

方法数：2

动态规划：
memo[1] = 1
memo[2] = 2
result = memo[2] = 2
```

### 示例2：n = 3

```
分析：
- 1步 + 1步 + 1步
- 1步 + 2步
- 2步 + 1步

方法数：3

动态规划：
memo[1] = 1
memo[2] = 2
memo[3] = memo[2] + memo[1] = 2 + 1 = 3
result = memo[3] = 3
```

### 示例3：n = 4

```
分析：
- 1+1+1+1
- 1+1+2
- 1+2+1
- 2+1+1
- 2+2

方法数：5

动态规划：
memo[1] = 1
memo[2] = 2
memo[3] = 3
memo[4] = memo[3] + memo[2] = 3 + 2 = 5
result = memo[4] = 5
```

### 示例4：n = 5

```
动态规划递推过程：
memo[1] = 1
memo[2] = 2
memo[3] = memo[2] + memo[1] = 3
memo[4] = memo[3] + memo[2] = 5
memo[5] = memo[4] + memo[3] = 8

结果：8

与斐波那契数列的关系：
F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8
爬楼梯：f(n) = F(n+1)
```

## 关键点总结

### 1. **递推关系的理解**
- 最后一步的选择决定了递推关系
- 从第n-1阶爬1步，或者从第n-2阶爬2步
- `f(n) = f(n-1) + f(n-2)`

### 2. **边界条件的设定**
- `f(1) = 1`：只有一种方法
- `f(2) = 2`：两种方法
- 这是递推的基础

### 3. **斐波那契数列的关联**
- 爬楼梯问题实际上是斐波那契数列的变种
- `f(n) = F(n+1)`，其中F是标准斐波那契数列

### 4. **空间优化的技巧**
- 只需要前两个状态，不需要存储整个数组
- 使用滚动变量法，空间复杂度从O(n)降到O(1)

## 其他解法对比

### 方法4：暴力递归（不推荐）

```javascript
var climbStairs = function(n) {
  if (n <= 2) return n;
  return climbStairs(n - 1) + climbStairs(n - 2);
};
```
**时间复杂度**：O(2^n) - 存在大量重复计算
**缺点**：效率极低，会超时

### 方法5：矩阵快速幂

```javascript
var climbStairs = function(n) {
  if (n <= 2) return n;
  
  // 矩阵快速幂求斐波那契数
  const multiply = (a, b) => {
    return [
      [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
      [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
    ];
  };
  
  const matrixPower = (matrix, power) => {
    if (power === 1) return matrix;
    if (power % 2 === 0) {
      const half = matrixPower(matrix, power / 2);
      return multiply(half, half);
    } else {
      return multiply(matrix, matrixPower(matrix, power - 1));
    }
  };
  
  const baseMatrix = [[1, 1], [1, 0]];
  const result = matrixPower(baseMatrix, n);
  return result[0][0];
};
```
**时间复杂度**：O(log n)

## 常见错误

### 1. 边界条件错误
```javascript
// 错误：边界条件设置不正确
if (n === 0) return 0; // 应该是 n=0时返回0（题目保证n>=1）
if (n === 1) return 0; // 应该返回1
```

### 2. 递推关系错误
```javascript
// 错误：递推公式错误
memo[i] = memo[i-1] * 2; // 应该是加法
```

### 3. 数组越界
```javascript
// 错误：没有处理n=1或n=2的情况
for (let i = 3; i <= n; i++) {
  memo[i] = memo[i-1] + memo[i-2]; // 当n<3时会越界
}
```

### 4. 递归栈溢出
```javascript
// 错误：使用普通递归，没有记忆化
var climbStairs = function(n) {
  if (n <= 2) return n;
  return climbStairs(n-1) + climbStairs(n-2); // 对于大n会栈溢出
};
```

## 扩展思考

### 变体问题
- **爬楼梯问题扩展**：每次可以爬1、2、3步
- **障碍物版本**：某些台阶不能踩
- **最小步数**：求最少需要多少步

### 应用场景
- **组合数学**：排列组合问题
- **动态规划教学**：DP入门经典问题
- **算法设计**：递推关系的理解和应用

### 数学联系
- **斐波那契数列**：深入理解递推关系
- **黄金分割**：与黄金比例的联系
- **矩阵运算**：用矩阵快速幂求解

## 相关题型
- [斐波那契数](https://leetcode.cn/problems/fibonacci-number/)
- [第N个泰波那契数](https://leetcode.cn/problems/n-th-tribonacci-number/)
- [使用最小花费爬楼梯](https://leetcode.cn/problems/min-cost-climbing-stairs/)