# 跳跃游戏

## 题目描述
给定一个非负整数数组 nums ，你最初位于数组的第一个下标。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个下标。

## 题型分析
- **题型分类**：贪心算法、动态规划、数组遍历
- **难度等级**：中等
- **核心考点**：贪心思想、 reachable 状态、最优解

## 解题思路

### 方法1：贪心算法（最优解）

#### 思路解析
从后往前思考，如果我们能够到达某个位置，那么这个位置之前能够跳跃到这个位置的所有位置也都是可以到达终点的。我们维护一个最远可达位置，如果当前位置能够到达这个最远位置，就更新最远位置。

#### 核心思想
1. **反向贪心**：从最后一个位置开始，往前找能够到达当前位置的最远位置
2. **可达性更新**：如果当前位置可以到达目标，就更新目标为当前位置
3. **最终判断**：看是否能到达第0个位置

#### 算法步骤
1. 初始化最远可达位置 `maxJump = nums.length - 1`
2. 从倒数第二个位置往前遍历：
   - 如果当前位置可以跳到最远位置：`nums[i] + i >= maxJump`
   - 更新最远位置：`maxJump = i`
3. 返回 `maxJump === 0`

### 方法2：动态规划（Top-Down）

#### 思路解析
使用记忆化搜索，对每个位置递归判断是否可以到达终点。

#### 算法步骤
1. 创建记忆数组 `memo`，1表示可到达，-1表示不可到达，0表示未计算
2. 初始化最后一个位置为可到达：`memo[lastIndex] = 1`
3. 递归函数 `jump(position)`：
   - 如果已计算过，直接返回结果
   - 计算从当前位置能跳到的最远位置
   - 递归检查所有可达位置
   - 缓存结果并返回

### 方法3：动态规划（Bottom-Up）

#### 思路解析
从前往后计算每个位置是否可以到达终点。

#### 算法步骤
1. 初始化记忆数组，最后一个位置为可到达
2. 从倒数第二个位置往前遍历：
   - 检查从当前位置能跳到的所有位置
   - 如果有任一位置可到达终点，当前位置也可到达
3. 返回第一个位置的状态

## 代码实现

### 方法1：贪心算法

```javascript
/**
 * 跳跃游戏 - 贪心算法
 * 将算法进一步简化，把很多对比、标记通路的步骤，简化替换为 只要够得着 就是通路
 * @param {Array<number>} nums
 * @returns {boolean} result 该数组是否可抵达最后一个位置
 */
var canJump = function (nums) {
  let maxJump = nums.length - 1; // 需要抵达的最远位置
  
  // 从后往前贪心
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] + i >= maxJump) {
      maxJump = i; // 更新需要到达的位置
    }
  }
  
  // 完全通路的情况是只要抵达0号位即可到达终点
  return maxJump === 0;
};
```

### 方法2：动态规划（Top-Down）

```javascript
/**
 * 跳跃游戏 - Top-Down 动态规划
 * @param {Array<number>} nums
 * @returns {boolean} result 该数组是否可抵达最后一个位置
 */
var canJump = function (nums) {
  const totalLength = nums.length;
  const memo = Array(totalLength).fill(0); // 缓存数组记录点位是否通路
  memo[totalLength - 1] = 1; // 最后一个位置肯定可以到达终点
  
  /**
   * 该点是否可通
   * @param {number} position 索引值
   */
  const jump = (position) => {
    if (memo[position] === 1) return true;
    if (memo[position] === -1) return false;

    // 对比最大索引与当前位置可移动最大位置
    const maxJump = Math.min(position + nums[position], totalLength - 1);

    for (let i = position + 1; i <= maxJump; i++) {
      const jumpRes = jump(i); // 递归
      if (jumpRes === true) {
        memo[position] = 1;
        return true;
      }
    }
    
    memo[position] = -1;
    return false;
  };

  const result = jump(0);
  return result;
};
```

### 方法3：动态规划（Bottom-Up）

```javascript
/**
 * 跳跃游戏 - Bottom-Up 动态规划
 * @param {Array<number>} nums
 * @returns {boolean} result 该数组是否可抵达最后一个位置
 */
var canJump = function (nums) {
  const totalLength = nums.length;
  const memo = Array(totalLength).fill(0); // 缓存数组记录点位是否通路
  memo[totalLength - 1] = 1;

  for (let i = totalLength - 2; i >= 0; i--) {
    const maxJump = Math.min(nums[i] + i, totalLength - 1); // 当前位置最大步数
    for (let j = i + 1; j <= maxJump; j++) {
      if (memo[j] === 1) {
        memo[i] = 1;
        break;
      }
    }
  }
  
  return memo[0] === 1;
};
```

## 复杂度分析

### 贪心算法
- **时间复杂度**：O(n)
- **空间复杂度**：O(1)

### 动态规划
- **时间复杂度**：O(n²) - Top-Down
- **时间复杂度**：O(n²) - Bottom-Up  
- **空间复杂度**：O(n)

## 示例演示

### 示例1：nums = [2,3,1,1,4]

```
贪心算法过程：
maxJump = 4 (最后一个位置)

i=3: nums[3] + 3 = 1 + 3 = 4 >= 4 → maxJump = 3
i=2: nums[2] + 2 = 1 + 2 = 3 < 3 → 不更新
i=1: nums[1] + 1 = 3 + 1 = 4 >= 3 → maxJump = 1  
i=0: nums[0] + 0 = 2 + 0 = 2 >= 1 → maxJump = 0

maxJump === 0 → true

路径：0→1→4 或 0→2→3→4
```

### 示例2：nums = [3,2,1,0,4]

```
贪心算法过程：
maxJump = 4

i=3: nums[3] + 3 = 0 + 3 = 3 < 4 → 不更新
i=2: nums[2] + 2 = 1 + 2 = 3 < 4 → 不更新
i=1: nums[1] + 1 = 2 + 1 = 3 < 4 → 不更新
i=0: nums[0] + 0 = 3 + 0 = 3 < 4 → 不更新

maxJump !== 0 → false

分析：从0位置最多跳到3位置，无法到达4位置
```

### 示例3：nums = [2,0,0]

```
贪心算法过程：
maxJump = 2

i=1: nums[1] + 1 = 0 + 1 = 1 < 2 → 不更新
i=0: nums[0] + 0 = 2 + 0 = 2 >= 2 → maxJump = 0

maxJump === 0 → true

路径：0→2
```

## 关键点总结

### 1. **贪心算法的核心思想**
- 反向思考：从终点往起点看
- 维护最远可达位置：如果能到达目标，就更新目标
- 局部最优导致全局最优

### 2. **状态转移的理解**
- 可达性是传递的：如果B可达终点，A可达B，则A可达终点
- 只需要关注边界条件，不需要考虑具体路径

### 3. **动态规划 vs 贪心**
- 动态规划：考虑所有可能，保证找到最优解
- 贪心：在每步做最优选择，通常能得到正确结果且更高效

### 4. **边界条件处理**
- 空数组：长度为0或1时直接返回true
- 零的障碍：0可能阻断跳跃路径
- 超出边界：确保索引不会越界

## 其他解法对比

### 方法4：正向贪心
```javascript
var canJump = function(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
};
```
**优点**：更直观，从前向后思考
**缺点**：需要在循环中提前返回

### 方法5：广度优先搜索
```javascript
var canJump = function(nums) {
  const n = nums.length;
  const visited = new Set();
  const queue = [0];
  visited.add(0);
  
  while (queue.length > 0) {
    const pos = queue.shift();
    if (pos === n - 1) return true;
    
    const maxJump = Math.min(pos + nums[pos], n - 1);
    for (let i = pos + 1; i <= maxJump; i++) {
      if (!visited.has(i)) {
        visited.add(i);
        queue.push(i);
      }
    }
  }
  
  return false;
};
```
**缺点**：空间复杂度高，效率低

## 常见错误

### 1. 贪心方向错误
```javascript
// 错误：正向贪心但没有处理不可达情况
let maxReach = 0;
for (let i = 0; i < nums.length; i++) {
  maxReach = Math.max(maxReach, i + nums[i]);
  // 忘记检查 i > maxReach 的情况
}
```

### 2. 边界条件处理错误
```javascript
// 错误：没有处理数组长度为0或1的情况
if (nums.length === 0) return false; // 应该返回true
```

### 3. 索引越界
```javascript
// 错误：没有限制最大跳跃距离
const maxJump = position + nums[position]; // 可能超出数组边界
```

### 4. 状态转移错误
```javascript
// 错误：动态规划中的状态转移不正确
for (let j = i; j <= maxJump; j++) { // 应该从 i+1 开始
```

## 扩展思考

### 变体问题
- **跳跃游戏 II**：计算最少跳跃次数到达终点
- **跳跃游戏 III**：判断能否到达特定索引
- **跳跃游戏 IV**：数组有重复值时的跳跃

### 应用场景
- **游戏开发**：角色移动路径规划
- **网络路由**：数据包跳转路径
- **资源调度**：任务分配和执行顺序

### 算法优化
- **并行处理**：可以并行计算多个位置的可达性
- **记忆化优化**：智能选择记忆化的位置
- **启发式搜索**：使用启发函数指导搜索方向

## 相关题型
- [跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/)
- [跳跃游戏 III](https://leetcode.cn/problems/jump-game-iii/)
- [跳跃游戏 IV](https://leetcode.cn/problems/jump-game-iv/)