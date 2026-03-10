# 螺旋矩阵

## 题目描述
给你一个 m 行 n 列的矩阵 matrix ，请按照顺时针螺旋顺序，返回矩阵中的所有元素。

## 题型分析
- **题型分类**：数组遍历、模拟问题、边界控制
- **难度等级**：中等
- **核心考点**：边界控制、方向遍历、循环终止条件

## 解题思路

### 方法：方向控制 + 边界收缩

#### 思路解析
螺旋遍历的实质是按照四个方向（右、下、左、上）依次遍历矩阵的边界，每完成一个方向就收缩对应的边界，直到所有元素都被访问。

#### 核心思想
1. **方向枚举**：定义四个遍历方向（右、下、左、上）
2. **边界变量**：用四个变量表示当前遍历边界
3. **方向切换**：完成一个方向后切换到下一个方向
4. **边界收缩**：每完成一个方向的遍历就收缩对应边界

#### 算法步骤
1. 初始化方向枚举和边界变量
2. while循环，条件是左边界 ≤ 右边界 且 上边界 ≤ 下边界：
   - 向右遍历：从左到右遍历上边界，上边界++
   - 向下遍历：从上到下遍历右边界，右边界--
   - 向左遍历：从右到左遍历下边界，下边界--
   - 向上遍历：从下到上遍历左边界，左边界++
3. 返回结果数组

## 代码实现

```javascript
/**
 * 螺旋矩阵遍历
 * @param {Array<Array<number>>} spiralArray
 */
var spiralMatrix = function (spiralArray) {
  const res = [];
  
  // 方向枚举值
  const directions = Object.freeze({
    RIGHT: 0,
    LEFT: 1,
    DOWN: 2,
    TOP: 3,
  });
  
  // 初始向右遍历
  let direction = directions.RIGHT; // 方向变量
  let left = 0,
      right = spiralArray[0].length - 1;
  let top = 0,
      down = spiralArray.length - 1;
  
  while (left <= right && top <= down) {
    switch (direction) {
      case directions.RIGHT:
        for (let i = left; i <= right; i++) {
          res.push(spiralArray[top][i]);
        }
        top++; // 上边界下移
        direction = directions.DOWN;
        break;
        
      case directions.DOWN:
        for (let i = top; i <= down; i++) {
          res.push(spiralArray[i][right]);
        }
        right--; // 右边界左移
        direction = directions.LEFT;
        break;
        
      case directions.LEFT:
        for (let i = right; i >= left; i--) {
          res.push(spiralArray[down][i]);
        }
        down--; // 下边界上移
        direction = directions.TOP;
        break;
        
      default: // TOP
        for (let i = down; i >= top; i--) {
          res.push(spiralArray[i][left]);
        }
        left++; // 左边界右移
        direction = directions.RIGHT;
        break;
    }
  }
  
  return res;
};
```

## 复杂度分析

- **时间复杂度**：O(m × n)
  - m 是行数，n 是列数
  - 每个元素恰好被访问一次

- **空间复杂度**：O(1)
  - 不考虑结果数组，只使用常数个额外空间

## 示例演示

### 示例1：3×4矩阵

```
输入：
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
]

初始化：
left=0, right=3, top=0, down=2
direction=RIGHT

第1轮（向右）：
遍历：matrix[0][0..3] → [1,2,3,4]
top=1, direction=DOWN

第2轮（向下）：
遍历：matrix[1..2][3] → [8,12]
right=2, direction=LEFT

第3轮（向左）：
遍历：matrix[2][2..0] → [11,10,9]
down=1, direction=TOP

第4轮（向上）：
遍历：matrix[1..1][0] → [5]
left=1, direction=RIGHT

第2轮开始（新的内圈）：
向右：matrix[1][1..2] → [6,7]
top=2, direction=DOWN
但 top(2) > down(1)，循环结束

最终结果：[1,2,3,4,8,12,11,10,9,5,6,7]
```

### 示例2：3×3矩阵

```
输入：
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

遍历顺序：
右：[1,2,3] → top=1
下：[6,9] → right=1
左：[8,7] → down=1
上：[4] → left=1

内圈：
右：[5] → top=2
此时 top > down，结束

结果：[1,2,3,6,9,8,7,4,5]
```

### 示例3：1×4矩阵

```
输入：
[
  [1, 2, 3, 4]
]

遍历顺序：
右：[1,2,3,4] → top=1
此时 top > down，结束

结果：[1,2,3,4]
```

## 关键点总结

### 1. **方向控制策略**
- 使用枚举值表示四个方向
- 按照顺时针顺序切换：右→下→左→上→右...
- 每完成一个方向就切换到下一个方向

### 2. **边界收缩规则**
- **向右遍历**后：上边界下移（top++）
- **向下遍历**后：右边界左移（right--）
- **向左遍历**后：下边界上移（down--）
- **向上遍历**后：左边界右移（left++）

### 3. **循环终止条件**
- `while (left <= right && top <= down)`
- 当左右边界或上下边界交叉时，说明遍历完成

### 4. **边界值处理**
- 遍历时使用闭区间 `[left, right]` 和 `[top, down]`
- 注意不同方向的遍历顺序（升序 vs 降序）

## 其他解法对比

### 方法1：访问标记法
```javascript
var spiralOrder = function(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const visited = Array(m).fill().map(() => Array(n).fill(false));
  const directions = [[0,1], [1,0], [0,-1], [-1,0]]; // 右下左上
  let dir = 0, row = 0, col = 0;
  const result = [];
  
  for (let i = 0; i < m * n; i++) {
    result.push(matrix[row][col]);
    visited[row][col] = true;
    
    let nextRow = row + directions[dir][0];
    let nextCol = col + directions[dir][1];
    
    // 如果下一个位置越界或已访问，改变方向
    if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n || visited[nextRow][nextCol]) {
      dir = (dir + 1) % 4;
      nextRow = row + directions[dir][0];
      nextCol = col + directions[dir][1];
    }
    
    row = nextRow;
    col = nextCol;
  }
  
  return result;
};
```
**缺点**：需要额外的O(m×n)空间存储访问标记

### 方法2：逐层访问法
```javascript
var spiralOrder = function(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    // 从左到右
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;
    
    // 从上到下
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;
    
    if (top <= bottom) {
      // 从右到左
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }
    
    if (left <= right) {
      // 从下到上
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }
  
  return result;
};
```
**优点**：逻辑清晰，不需要方向枚举

## 常见错误

### 1. 边界检查错误
```javascript
// 错误：没有在遍历前检查边界条件
for (let i = left; i <= right; i++) {
  // 应该先检查 top <= bottom
}
```

### 2. 方向切换错误
```javascript
// 错误：忘记切换方向
case directions.RIGHT:
  // ... 遍历代码
  // 忘记 direction = directions.DOWN;
```

### 3. 边界收缩时机错误
```javascript
// 错误：在遍历前收缩边界
top++; // 应该在遍历后收缩
for (let i = left; i <= right; i++) {
  result.push(matrix[top][i]);
}
```

### 4. 循环终止条件错误
```javascript
// 错误：只用一个边界判断
while (left <= right) { // 应该是 left <= right && top <= down
```

## 扩展思考

### 变体问题
- **逆时针螺旋矩阵**：按照逆时针方向遍历
- **螺旋生成矩阵**：按照螺旋顺序填充矩阵
- **螺旋打印二叉树**：按照螺旋顺序打印二叉树节点

### 应用场景
- **矩阵压缩**：螺旋顺序存储矩阵
- **图像处理**：螺旋扫描像素
- **数据可视化**：螺旋展示数据

### 算法优化
- **内存访问优化**：考虑缓存友好的访问模式
- **并行处理**：分块并行处理
- **流式处理**：支持超大矩阵的处理

## 相关题型
- [螺旋矩阵 II](https://leetcode.cn/problems/spiral-matrix-ii/)
- [螺旋矩阵 III](https://leetcode.cn/problems/spiral-matrix-iii/)
- [旋转矩阵](https://leetcode.cn/problems/rotate-matrix-lcci/)