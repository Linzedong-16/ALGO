# 加一

## 题目描述
给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。你可以假设除了整数 0 之外，这个整数不会以零开头。

## 题型分析
- **题型分类**：数组操作、数学运算、进位处理
- **难度等级**：简单
- **核心考点**：进位处理、数组遍历、边界条件

## 解题思路

### 方法：模拟加法运算

#### 思路解析
这是一个模拟十进制加法的问题。从个位开始加1，然后处理进位。如果进位一直传递到最高位，需要在数组前面添加新的位。

#### 核心思想
1. **从右往左遍历**：从最低位（数组末尾）开始处理
2. **加一操作**：当前位加1，然后处理进位
3. **进位规则**：当前位 >= 10 时，当前位减10，向高位进1
4. **最高位处理**：如果最高位也有进位，需要在前面添加1

#### 算法步骤
1. 从数组最后一个元素开始遍历
2. 对当前元素加1：
   - 如果加1后 < 10：直接返回数组（无需进位）
   - 如果加1后 = 10：设为0，继续处理前一位（进位）
3. 如果遍历完所有位都有进位（如999→1000）
4. 在数组前面添加1
5. 返回结果数组

## 代码实现

```javascript
/**
 * 加一操作
 * @param {Array<number>} digits
 * @returns {Array<number>} res
 */
var plusOne = function (digits) {
  // 从右往左遍历，从最低位开始
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] !== 9) {
      // 当前位不为9，直接加1，无需进位
      digits[i]++;
      return digits;
    } else {
      // 当前位为9，加1后变成0，需要进位
      digits[i] = 0;
    }
  }
  
  // 如果所有位都处理完还有进位（如999→1000）
  // 在数组前面添加1
  return [1, ...digits];
};
```

### 递归解法

```javascript
/**
 * 递归解法
 * @param {Array<number>} digits
 * @returns {Array<number>} res
 */
var plusOne = function(digits) {
  const addOne = (index) => {
    if (index < 0) {
      // 越界处理：在前面添加1
      digits.unshift(1);
      return digits;
    }
    
    if (digits[index] < 9) {
      // 当前位加1
      digits[index]++;
      return digits;
    } else {
      // 当前位为9，设为0，继续处理前一位
      digits[index] = 0;
      return addOne(index - 1);
    }
  };
  
  return addOne(digits.length - 1);
};
```

## 复杂度分析

- **时间复杂度**：O(n)
  - n 是数组的长度
  - 最坏情况下需要遍历整个数组（如999...9）

- **空间复杂度**：O(1) 或 O(n)
  - O(1)：不考虑返回的数组，只使用常数个额外空间
  - O(n)：如果考虑扩展运算符创建新数组的情况

## 示例演示

### 示例1：digits = [1,2,3]

```
处理过程：
1. 从最后一位开始：digits[2] = 3
   3 ≠ 9 → 3 + 1 = 4
   digits = [1,2,4]
   直接返回结果

输出：[1,2,4]
表示：123 + 1 = 124
```

### 示例2：digits = [4,3,2,1]

```
处理过程：
1. 从最后一位开始：digits[3] = 1
   1 ≠ 9 → 1 + 1 = 2
   digits = [4,3,2,2]
   直接返回结果

输出：[4,3,2,2]
表示：4321 + 1 = 4322
```

### 示例3：digits = [9]

```
处理过程：
1. 最后一位：digits[0] = 9
   9 = 9 → 设为0，继续处理前一位
   digits = [0]

2. 越界处理：在前面添加1
   return [1, ...[0]] = [1,0]

输出：[1,0]
表示：9 + 1 = 10
```

### 示例4：digits = [9,9,9]

```
处理过程：
1. i=2, digits[2] = 9
   9 = 9 → 设为0
   digits = [9,9,0]

2. i=1, digits[1] = 9
   9 = 9 → 设为0
   digits = [9,0,0]

3. i=0, digits[0] = 9
   9 = 9 → 设为0
   digits = [0,0,0]

4. 越界处理：在前面添加1
   return [1,0,0,0]

输出：[1,0,0,0]
表示：999 + 1 = 1000
```

### 示例5：digits = [0]

```
处理过程：
1. i=0, digits[0] = 0
   0 ≠ 9 → 0 + 1 = 1
   digits = [1]
   直接返回结果

输出：[1]
表示：0 + 1 = 1
```

## 关键点总结

### 1. **从右往左的处理顺序**
- 模拟手工加法的习惯
- 最低位开始，逐步向高位处理进位

### 2. **进位的关键判断**
- `digits[i] !== 9`：无需进位，直接返回
- `digits[i] === 9`：需要进位，设为0，继续处理

### 3. **边界条件的处理**
- 数组越界：所有位都是9的情况
- 使用扩展运算符 `[1, ...digits]` 在前面添加1

### 4. **提前返回的优化**
- 只要某一位不需要进位，就可以立即返回
- 避免不必要的继续遍历

## 其他解法对比

### 方法2：转换为数字再转换回数组（不推荐）

```javascript
var plusOne = function(digits) {
  // 将数组转换为数字
  let num = 0;
  for (let i = 0; i < digits.length; i++) {
    num = num * 10 + digits[i];
  }
  
  // 加1
  num += 1;
  
  // 转换回数组
  return num.toString().split('').map(Number);
};
```
**缺点**：
- 可能超出JavaScript数字的最大安全整数范围
- 时间复杂度和空间复杂度都不优

### 方法3：使用BigInt处理大数

```javascript
var plusOne = function(digits) {
  // 使用BigInt避免溢出
  let num = 0n;
  for (let i = 0; i < digits.length; i++) {
    num = num * 10n + BigInt(digits[i]);
  }
  
  num += 1n;
  
  return num.toString().split('').map(Number);
};
```
**优点**：可以处理任意大的数字
**缺点**：转换开销大

### 方法4：字符串处理

```javascript
var plusOne = function(digits) {
  const str = digits.join('');
  const num = BigInt(str) + 1n;
  return num.toString().split('').map(Number);
};
```

## 常见错误

### 1. 进位处理错误
```javascript
// 错误：没有正确处理进位
for (let i = digits.length - 1; i >= 0; i--) {
  digits[i] = (digits[i] + 1) % 10; // 没有处理前一位的进位
}
```

### 2. 返回错误
```javascript
// 错误：没有返回正确的数组
for (let i = digits.length - 1; i >= 0; i--) {
  if (digits[i] !== 9) {
    digits[i]++;
    // 忘记 return，继续循环
  }
}
```

### 3. 边界条件遗漏
```javascript
// 错误：没有处理所有位都是9的情况
for (let i = digits.length - 1; i >= 0; i--) {
  // 处理逻辑
}
// 忘记处理需要额外添加1的情况
```

### 4. 数组修改错误
```javascript
// 错误：直接修改原数组而不考虑返回新数组的场景
// 应该创建新数组或明确说明会修改原数组
```

## 扩展思考

### 变体问题
- **加K**：给数组表示的数字加上K
- **减一**：数组表示的数字减一
- **加法运算**：两个大数数组相加
- **乘法运算**：大数数组乘以单个数字

### 应用场景
- **大数运算**：处理超出基本类型范围的数字
- **计数器实现**：实现一个可以无限增加的计数器
- **进制转换**：不同进制间的转换和运算

### 算法优化
- **并行处理**：对于超长数组，可以分段并行处理
- **空间优化**：原地修改，避免创建新数组
- **缓存优化**：考虑缓存友好的访问模式

## 相关题型
- [字符串相加](https://leetcode.cn/problems/add-strings/)
- [二进制求和](https://leetcode.cn/problems/add-binary/)
- [两数相加](https://leetcode.cn/problems/add-two-numbers/)