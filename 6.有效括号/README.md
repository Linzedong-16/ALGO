# 有效括号

## 题目描述
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

## 题型分析
- **题型分类**：栈应用、字符串处理、匹配问题
- **难度等级**：简单
- **核心考点**：栈的LIFO特性、括号匹配规则

## 解题思路

### 方法：栈（Stack）

#### 思路解析
括号匹配问题是栈的经典应用场景。由于后遇到的左括号要先闭合（后进先出），这正好符合栈的特性。

#### 核心思想
1. **栈存储右括号**：遇到左括号时，将对应的右括号入栈
2. **匹配检查**：遇到右括号时，检查是否与栈顶匹配
3. **最终验证**：遍历结束后，栈为空则完全匹配

#### 算法步骤
1. 创建映射关系：Map存储左右括号对应关系
2. 创建空数组作为栈使用
3. 遍历字符串的每个字符：
   - 如果是左括号：将对应的右括号入栈
   - 如果是右括号：检查栈顶是否匹配
     - 不匹配或栈为空：返回false
     - 匹配：弹出栈顶
4. 遍历结束后：检查栈是否为空
   - 为空：所有括号都正确匹配
   - 不为空：有多余的左括号未闭合

## 代码实现

```javascript
/**
 * 判断括号字符串是否有效
 * @param {string} codeStr
 * @returns {boolean}
 */
var isValid = function (codeStr) {
  // 创建映射关系：左括号 -> 右括号
  const mappings = new Map();
  mappings.set("(", ")");
  mappings.set("[", "]");
  mappings.set("{", "}");
  
  const stack = []; // 存储期望的右括号
  
  for (const char of codeStr) {
    if (mappings.has(char)) {
      // 遇到左括号，将对应的右括号入栈
      stack.push(mappings.get(char));
    } else {
      // 遇到右括号，检查是否与栈顶匹配
      if (stack.pop() !== char) {
        return false;
      }
    }
  }
  
  // 栈为空说明所有括号都正确匹配
  return stack.length === 0;
};
```

## 复杂度分析

- **时间复杂度**：O(n)
  - n 是字符串的长度
  - 每个字符只处理一次

- **空间复杂度**：O(n)
  - 最坏情况下，所有字符都是左括号，需要全部入栈

## 示例演示

### 示例1："()"
```
遍历过程：
1. '(' → 入栈 ')'
   stack: [')']
2. ')' → 栈顶匹配，弹出
   stack: []
3. 结束：栈为空 → true

输出：true
```

### 示例2："()[]{}"
```
遍历过程：
1. '(' → 入栈 ')'
   stack: [')']
2. ')' → 匹配，弹出
   stack: []
3. '[' → 入栈 ']'
   stack: [']']
4. ']' → 匹配，弹出
   stack: []
5. '{' → 入栈 '}'
   stack: ['}']
6. '}' → 匹配，弹出
   stack: []
7. 结束：栈为空 → true

输出：true
```

### 示例3："(]"
```
遍历过程：
1. '(' → 入栈 ')'
   stack: [')']
2. ']' → 栈顶是')'，不匹配
   stack.pop() = ']' !== ')' → false

输出：false
```

### 示例4："([)]"
```
遍历过程：
1. '(' → 入栈 ')'
   stack: [')']
2. '[' → 入栈 ']'
   stack: [')', ']']
3. ')' → 栈顶是']'，不匹配
   stack.pop() = ']' !== ')' → false

输出：false
```

### 示例5："({[]})"
```
遍历过程：
1. '(' → 入栈 ')'
   stack: [')']
2. '{' → 入栈 '}'
   stack: [')', '}']
3. '[' → 入栈 ']'
   stack: [')', '}', ']']
4. ']' → 匹配，弹出
   stack: [')', '}']
5. '}' → 匹配，弹出
   stack: [')']
6. ')' → 匹配，弹出
   stack: []
7. 结束：栈为空 → true

输出：true
```

## 关键点总结

### 1. **栈的LIFO特性**
- 后遇到的左括号要先闭合
- 使用栈天然满足这个要求

### 2. **存储策略**
- **存储右括号**：遇到左括号时，存储期望的右括号
- **直接比较**：遇到右括号时，直接与栈顶比较
- **简化逻辑**：避免了反向查找映射关系的麻烦

### 3. **边界条件处理**
- 右括号多于左括号：栈为空时遇到右括号
- 左括号多于右括号：遍历结束后栈不为空
- 不匹配的括号类型：栈顶与当前右括号不匹配

### 4. **映射表的使用**
- 便于快速查找对应的右括号
- 代码更加清晰和可维护

## 常见错误

### 1. 存储左括号而不是右括号
```javascript
// 错误：存储左括号，需要反向查找
if (mappings.has(char)) {
  stack.push(char); // 存储左括号
} else {
  const expected = stack.pop(); // 需要查找对应的左括号
  // 还需要反向查找映射关系，逻辑复杂
}
```

### 2. 忘记检查栈是否为空
```javascript
// 错误：当栈为空时，stack.pop()返回undefined
if (stack.pop() !== char) { // 可能为空栈
  return false;
}
```

### 3. 使用错误的集合类型
```javascript
// 错误：使用Set而不是Map
const mappings = new Set(['(', ')', '[', ']', '{', '}']);
// 无法建立左右括号的对应关系
```

## 其他解法对比

### 方法1：存储左括号（需要反向查找）
```javascript
var isValid = function(s) {
  const stack = [];
  const pairs = {'(': ')', '[': ']', '{': '}'};
  
  for (const char of s) {
    if (char in pairs) {
      stack.push(char);
    } else {
      const left = stack.pop();
      if (pairs[left] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
```
**缺点**：需要反向查找映射关系

### 方法2：使用数组模拟栈
```javascript
var isValid = function(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(') stack.push(')');
    else if (c === '[') stack.push(']');
    else if (c === '{') stack.push('}');
    else if (stack.length === 0 || stack.pop() !== c) return false;
  }
  return stack.length === 0;
};
```
**优点**：避免使用Map，但代码重复较多

## 扩展思考

### 变体问题
- **最长有效括号**：找出最长的有效括号子串
- **生成括号**：生成n对有效括号的所有组合
- **删除无效括号**：删除最少的括号使字符串有效

### 应用场景
- **代码编辑器**：括号匹配检查
- **编译器**：语法分析中的符号匹配
- **数学表达式**：确保括号的正确性

### 技巧扩展
- **多种括号类型**：可以扩展支持更多括号类型
- **嵌套深度**：可以计算最大嵌套深度
- **错误定位**：可以指出哪个位置出错

## 相关题型
- [最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/)
- [生成括号](https://leetcode.cn/problems/generate-parentheses/)
- [删除无效的括号](https://leetcode.cn/problems/remove-invalid-parentheses/)