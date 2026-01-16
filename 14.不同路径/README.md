# 不同路径

## 题目描述
一个机器人位于一个 m x n 网格的左上角（起始点在下图中标记为 "Start"）。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 "Finish"）。问总共有多少条不同的路径？

## 题型分析
- **题型分类**：动态规划、组合数学、网格问题
- **难度等级**：中等
- **核心考点**：动态规划状态转移、组合数计算、最优子结构

## 解题思路

### 方法：动态规划

#### 思路解析
机器人只能向右或向下移动，所以要到达位置 (i,j)，只能从 (i-1,j) 或 (i,j-1) 来。这就是典型的动态规划问题。

#### 核心思想
1. **状态定义**：dp[i][j] 表示从起点到位置 (i,j) 的路径数
2. **状态转移**：dp[i][j] = dp[i-1][j] + dp[i][j-1]
3. **边界条件**：第一行和第一列都只有1种路径
4. **最优解**：dp[m-1][n-1] 就是最终答案

#### 算法步骤
1. 创建 m×n 的二维数组 memo
2. 初始化第一行和第一列为1（只能沿直线到达）
3. 填充剩余位置：
   - 从第2行第2列开始
   - 每个位置 = 上方位置 + 左方位置
4. 返回右下角位置的值

## 代码实现

```javascript
/**
 * 终点的所有路径
 * @param {number} m 列数
 * @param {number} n 行数
 * @returns {number} res
 */
var uniquePaths = function (m, n) {
  const memo = [];
  
  // 初始化二维数组
  for (let i = 0; i < n; i++) {
    memo.push([]); // 每个数组固定长 m
  }
  
  // 初始化第一行：只有向右走一种方式
  for (let i = 0; i < m; i++) {
    memo[0][i] = 1;
  }
  
  // 初始化第一列：只有向下走一种方式
  for (let i = 0; i < n; i++) {
    memo[i][0] = 1;
  }

  // 填充其余位置
  for (let row = 1; row < n; row++) {
    for (let col = 1; col < m; col++) {
      // 当前位置路径数 = 上方位置路径数 + 左方位置路径数
      memo[row][col] = memo[row - 1][col] + memo[row][col - 1];
    }
  }
  
  return memo[n - 1][m - 1];
};
```

### 优化版本：空间优化

```javascript
/**
 * 空间优化版本：使用一维数组
 * @param {number} m 列数
 * @param {number} n 行数
 * @returns {number} res
 */
var uniquePaths = function (m, n) {
  const dp = new Array(m).fill(1); // 初始化第一行
  
  for (let row = 1; row < n; row++) {
    for (let col = 1; col < m; col++) {
      dp[col] = dp[col] + dp[col - 1];
    }
  }
  
  return dp[m - 1];
};
```

### 数学方法：组合数

```javascript
/**
 * 数学方法：组合数 C(m+n-2, m-1)
 * @param {number} m 列数
 * @param {number} n 行数
 * @returns {number} res
 */
var uniquePaths = function (m, n) {
  // 总共需要走 m-1 次向右，n-1 次向下
  // 问题转化为从 m+n-2 步中选择 m-1 步向右
  const totalSteps = m + n - 2;
  const rightSteps = Math.min(m - 1, n - 1); // 取较小值避免溢出
  
  let result = 1;
  
  // 计算 C(totalSteps, rightSteps)
  for (let i = 1; i <= rightSteps; i++) {
    result = result * (totalSteps - rightSteps + i) / i;
  }
  
  return Math.round(result);
};
```

## 复杂度分析

### 动态规划方法
- **时间复杂度**：O(m × n)
- **空间复杂度**：O(m × n) 或 O(m)（空间优化版）

### 数学方法
- **时间复杂度**：O(min(m,n))
- **空间复杂度**：O(1)

## 示例演示

### 示例1：m=3, n=7（3×7网格）

```
网格布局：
[Start][ ][ ][ ][ ][ ][ ]
[    ][ ][ ][ ][ ][ ][ ]
[    ][ ][ ][ ][ ][ ][Finish]

动态规划填充过程：
1. 初始化第一行和第一列：
   [1][1][1][1][1][1][1]
   [1][ ][ ][ ][ ][ ][ ]
   [1][ ][ ][ ][ ][ ][ ]

2. 填充第二行：
   [1][1][1][1][1][1][1]
   [1][2][3][4][5][6][7]
   [1][ ][ ][ ][ ][ ][ ]

3. 填充第三行：
   [1][1][1][1][1][1][1]
   [1][2][3][4][5][6][7]
   [1][3][6][10][15][21][28]

结果：28

解释：总共需要走 2+6=8 步，其中 2 步向下，6 步向右
      从8步中选择2步向下：C(8,2) = 28
```

### 示例2：m=3, n=2（3×2网格）

```
网格布局：
[Start][ ][ ]
[    ][ ][ ]
[    ][ ][Finish]

动态规划填充：
1. 初始化：
   [1][1][1]
   [1][ ][ ]
   [1][ ][ ]

2. 填充第二行：
   [1][1][1]
   [1][2][3]
   [1][ ][ ]

3. 填充第三行：
   [1][1][1]
   [1][2][3]
   [1][3][6]

结果：6

路径示例：
1. 右右下下
2. 右下右下
3. 右下下右
4. 下右右下
5. 下右下右
6. 下下右右
```

### 示例3：m=1, n=1

```
特殊情况：起点就是终点
结果：1
```

## 关键点总结

### 1. **动态规划状态转移**
- `dp[i][j] = dp[i-1][j] + dp[i][j-1]`
- 只能从上方或左方到达当前位置
- 状态转移具有无后效性

### 2. **边界条件处理**
- 第一行：只能一直向右，路径数为1
- 第一列：只能一直向下，路径数为1
- 起点位置：路径数为1（原地不动）

### 3. **空间优化技巧**
- 发现每行只依赖于上一行和当前行
- 可以使用一维数组逐行更新
- `dp[j] = dp[j] + dp[j-1]`

### 4. **数学方法的理解**
- 总步数：向右(m-1)步 + 向下(n-1)步 = m+n-2步
- 选择问题：从总步数中选择向右（或向下）的步数
- 组合数：C(m+n-2, m-1) = C(m+n-2, n-1)

## 其他解法对比

### 方法3：递归（不推荐）
```javascript
var uniquePaths = function(m, n) {
  const dfs = (i, j) => {
    if (i === m - 1 && j === n - 1) return 1;
    if (i >= m || j >= n) return 0;
    return dfs(i + 1, j) + dfs(i, j + 1);
  };
  
  return dfs(0, 0);
};
```
**缺点**：时间复杂度 O(2^(m+n))，会超时

### 方法4：记忆化搜索
```javascript
var uniquePaths = function(m, n) {
  const memo = Array(m).fill().map(() => Array(n).fill(-1));
  
  const dfs = (i, j) => {
    if (i === m - 1 && j === n - 1) return 1;
    if (i >= m || j >= n) return 0;
    if (memo[i][j] !== -1) return memo[i][j];
    
    memo[i][j] = dfs(i + 1, j) + dfs(i, j + 1);
    return memo[i][j];
  };
  
  return dfs(0, 0);
};
```
**时间复杂度**：O(m × n)

## 常见错误

### 1. 边界条件处理错误
```javascript
// 错误：没有正确初始化边界
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (i === 0 || j === 0) {
      memo[i][j] = 0; // 应该是 1
    }
  }
}
```

### 2. 状态转移错误
```javascript
// 错误：状态转移公式错误
memo[i][j] = memo[i-1][j] * memo[i][j-1]; // 应该是加法
```

### 3. 数组索引错误
```javascript
// 错误：混淆了行和列
for (let row = 1; row < m; row++) { // 应该是 n
  for (let col = 1; col < n; col++) { // 应该是 m
```

### 4. 整数溢出
```javascript
// 错误：大数计算时可能溢出
// 应该使用 BigInt 或数学方法
```

## 扩展思考

### 变体问题
- **不同路径 II**：网格中有障碍物的情况
- **不同路径 III**：可以四个方向移动的情况
- **不同路径 IV**：求k条不同路径

### 应用场景
- **路径规划**：机器人导航、物流配送
- **游戏开发**：角色移动、地图设计
- **网络路由**：数据包传输路径

### 算法扩展
- **多维扩展**：3D网格的路径计算
- **约束条件**：加入其他移动限制
- **动态规划优化**：使用滚动数组等技巧

## 相关题型
- [不同路径 II](https://leetcode.cn/problems/unique-paths-ii/)
- [最小路径和](https://leetcode.cn/problems/minimum-path-sum/)
- [三角形最小路径和](https://leetcode.cn/problems/triangle/)