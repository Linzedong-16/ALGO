# 零置矩阵

## 题目描述
给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用原地算法。

## 题型分析
- **题型分类**：矩阵操作、原地算法、空间优化
- **难度等级**：中等
- **核心考点**：原地修改、标记技巧、空间复杂度优化

## 解题思路

### 方法：使用首行首列作为标记空间

#### 思路解析
为了达到O(1)的空间复杂度，我们可以利用矩阵的第一行和第一列来记录哪些行和列需要被置零。这样就不需要额外的存储空间。

#### 核心思想
1. **标记阶段**：用首行首列记录需要置零的行和列
2. **预处理**：先检查首行首列本身是否需要置零
3. **置零阶段**：根据标记信息置零对应的行和列
4. **后处理**：最后处理首行首列

#### 算法步骤
1. 检查并标记首行和首列是否需要置零
2. 遍历矩阵（除首行首列外）：
   - 如果某元素为0，标记其对应的首行和首列位置为0
3. 根据首行的标记，置零对应的列
4. 根据首列的标记，置零对应的行
5. 根据预处理结果，置零首行和首列

## 代码实现

```javascript
/**
 * 73.零置矩阵
 * @param {Array<Array<number>>} matrix
 * @returns {Array<Array<number>>} res
 */
var setZeros = (matrix) => {
  // 第一行、列是否有零
  let firstColHasZero = false;
  let firstRowHasZero = false;
  
  // 检查第一列是否有零
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }
  
  // 检查第一行是否有零
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix[0][i] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // 给第一行一列标零（标记阶段）
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[0].length; col++) {
      if (matrix[row][col] === 0) {
        // 内部有0，给外层0标记
        matrix[0][col] = 0;
        matrix[row][0] = 0;
      }
    }
  }
  
  // 根据刚才标的0再去反推内部的0（置零阶段）
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[0].length; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }
  
  // 后处理：根据预处理结果置零首列
  if (firstColHasZero) {
    for (let row = 0; row < matrix.length; row++) {
      matrix[row][0] = 0;
    }
  }
  
  // 后处理：根据预处理结果置零首行
  if (firstRowHasZero) {
    for (let col = 0; col < matrix[0].length; col++) {
      matrix[0][col] = 0;
    }
  }
  
  return matrix;
};
```

## 复杂度分析

- **时间复杂度**：O(m × n)
  - m 是行数，n 是列数
  - 需要多次遍历整个矩阵
  - 常数因子较大，但仍是线性复杂度

- **空间复杂度**：O(1)
  - 只使用了常数个额外变量
  - 利用矩阵本身的空间进行标记

## 示例演示

### 示例1：3×3矩阵

```
输入矩阵：
[[1,1,1],
 [1,0,1],
 [1,1,1]]

步骤1：检查首行首列
- 首列：[1,1,1] → 无零
- 首行：[1,1,1] → 无零
firstColHasZero = false, firstRowHasZero = false

步骤2：标记阶段
遍历内部矩阵：
- matrix[1][1] = 0 → 标记 matrix[0][1] = 0, matrix[1][0] = 0
标记后矩阵：
[[1,0,1],
 [0,0,1],
 [1,1,1]]

步骤3：根据标记置零
- 根据matrix[0][1]=0：置零第1列
- 根据matrix[1][0]=0：置零第1行
置零后矩阵：
[[1,0,1],
 [0,0,0],
 [1,0,1]]

步骤4：后处理
首行首列无需置零

最终结果：
[[1,0,1],
 [0,0,0],
 [1,0,1]]
```

### 示例2：边角有零

```
输入矩阵：
[[0,2,3],
 [4,5,6],
 [7,8,0]]

步骤1：检查首行首列
- 首列：[0,4,7] → 有零
- 首行：[0,2,3] → 有零
firstColHasZero = true, firstRowHasZero = true

步骤2：标记阶段
遍历内部矩阵：
- matrix[2][2] = 0 → 标记 matrix[0][2] = 0, matrix[2][0] = 0
标记后矩阵：
[[0,2,0],
 [4,5,6],
 [0,8,0]]

步骤3：根据标记置零
- 根据matrix[0][2]=0：置零第2列
- 根据matrix[2][0]=0：置零第2行
置零后矩阵：
[[0,2,0],
 [4,5,0],
 [0,0,0]]

步骤4：后处理
- 置零首列：matrix[0][0]=0, matrix[1][0]=0, matrix[2][0]=0
- 置零首行：matrix[0][0]=0, matrix[0][1]=0, matrix[0][2]=0

最终结果：
[[0,0,0],
 [0,5,0],
 [0,0,0]]
```

### 示例3：单行矩阵

```
输入矩阵：
[[1,0,3,4]]

步骤1：检查首行首列
- 首列：[1] → 无零
- 首行：[1,0,3,4] → 有零
firstColHasZero = false, firstRowHasZero = true

步骤2：标记阶段（跳过，只有首行）

步骤3：根据标记置零（跳过）

步骤4：后处理
置零首行：

最终结果：
[[0,0,0,0]]
```

## 关键点总结

### 1. **空间优化技巧**
- 利用矩阵的首行首列作为标记空间
- 避免使用额外的O(m+n)空间
- 实现真正的原地操作

### 2. **处理顺序的重要性**
1. 先检查首行首列是否需要置零
2. 用内部元素标记首行首列
3. 根据首行首列标记置零内部元素
4. 最后处理首行首列本身

### 3. **边界条件的处理**
- 单行或单列矩阵的特殊处理
- 首行首列与内部元素的区别处理
- 避免循环依赖和标记覆盖

### 4. **原地算法的要求**
- 不能使用额外的大空间
- 可以修改原始矩阵
- 时间复杂度可以适当牺牲

## 其他解法对比

### 方法2：使用额外空间（直观但不满足题目要求）

```javascript
var setZeroes = function(matrix) {
  const rows = new Set();
  const cols = new Set();
  
  // 第一次遍历：记录需要置零的行和列
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        rows.add(i);
        cols.add(j);
      }
    }
  }
  
  // 第二次遍历：根据记录置零
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (rows.has(i) || cols.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
};
```
**空间复杂度**：O(m + n)
**优点**：逻辑清晰，容易理解
**缺点**：不满足原地算法要求

### 方法3：使用特殊值标记

```javascript
var setZeroes = function(matrix) {
  // 使用一个不在矩阵中出现的特殊值（如NaN）作为临时标记
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        // 标记整行整列
        for (let k = 0; k < matrix[0].length; k++) {
          if (matrix[i][k] !== 0) matrix[i][k] = NaN;
        }
        for (let k = 0; k < matrix.length; k++) {
          if (matrix[k][j] !== 0) matrix[k][j] = NaN;
        }
      }
    }
  }
  
  // 将标记的NaN转换为0
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (isNaN(matrix[i][j])) {
        matrix[i][j] = 0;
      }
    }
  }
};
```
**缺点**：需要矩阵中不存在NaN，且需要额外遍历

## 常见错误

### 1. 处理顺序错误
```javascript
// 错误：没有先检查首行首列
for (let row = 1; row < matrix.length; row++) {
  for (let col = 1; col < matrix[0].length; col++) {
    if (matrix[row][col] === 0) {
      matrix[0][col] = 0; // 可能覆盖首行原有的零信息
      matrix[row][0] = 0; // 可能覆盖首列原有的零信息
    }
  }
}
```

### 2. 边界条件处理遗漏
```javascript
// 错误：没有处理单行或单列的情况
if (matrix.length === 1 || matrix[0].length === 1) {
  // 需要特殊处理
}
```

### 3. 循环范围错误
```javascript
// 错误：循环范围包含了所有元素
for (let row = 0; row < matrix.length; row++) { // 应该从1开始
  for (let col = 0; col < matrix[0].length; col++) { // 应该从1开始
```

### 4. 后处理遗漏
```javascript
// 错误：忘记处理首行首列本身
// 标记和置零后，还需要根据预处理结果处理首行首列
```

## 扩展思考

### 变体问题
- **彩色矩阵置零**：不同颜色的零有不同的置零规则
- **游戏生命**：根据周围邻居状态更新矩阵
- **矩阵变换**：更复杂的原地矩阵变换

### 应用场景
- **图像处理**：像素值的批量修改
- **数据清洗**：基于特定条件的批量修改
- **游戏开发**：游戏地图的状态更新

### 算法优化
- **并行处理**：可以并行处理不同的行或列
- **缓存优化**：考虑矩阵访问的缓存友好性
- **位操作优化**：对于稀疏矩阵，可以使用位图优化

## 相关题型
- [旋转图像](https://leetcode.cn/problems/rotate-image/)
- [螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)
- [生命游戏](https://leetcode.cn/problems/game-of-life/)