# 两数相加

## 题目描述
给你两个非空的链表，表示两个非负整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。请你将两个数相加，并以相同形式返回一个表示和的链表。

## 题型分析
- **题型分类**：链表操作、数学运算、模拟加法
- **难度等级**：中等
- **核心考点**：链表遍历、进位处理、哑节点技巧

## 解题思路

### 方法：模拟竖式加法

#### 思路解析
这道题本质上是在模拟我们小学学过的竖式加法：
1. 从个位开始相加
2. 如果和大于等于10，需要进位
3. 依次处理十位、百位...
4. 最后处理可能的进位

#### 核心思想
1. **并行遍历**：同时遍历两个链表，对应位相加
2. **进位处理**：维护进位变量carry
3. **哑节点**：使用头节点简化链表构建逻辑
4. **边界处理**：处理两个链表长度不一致的情况

#### 算法步骤
1. 创建哑节点 dummy 和当前指针 curr
2. 初始化进位 carry = 0
3. 同时遍历两个链表（l1 和 l2）：
   - 获取当前位的值：sum = l1.val + l2.val + carry
   - 创建新节点：curr.next = new ListNode(sum % 10)
   - 更新进位：carry = Math.floor(sum / 10)
   - 移动指针：curr = curr.next, l1 = l1.next, l2 = l2.next
4. 处理剩余的链表节点
5. 如果最后还有进位，添加新节点
6. 返回 dummy.next

## 代码实现

```javascript
// 单链表节点构造函数
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// 辅助函数：根据数组快速创建链表
function createLinkedList(arr) {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// 辅助函数：将链表转为数组
function linkedListToArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

/**
 * 两数相加
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @returns {ListNode} list
 */
var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode(); // 链表头
  let curr = dummy; // 指针
  let carry = 0; // 进位
  
  while (l1 !== null || l2 !== null) {
    let sum = 0;
    
    // 加上l1当前位的值
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }
    
    // 加上l2当前位的值
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }
    
    // 加上进位
    sum += carry;
    
    // 创建新节点，只保留个位数
    curr.next = new ListNode(sum % 10);
    // 计算新的进位
    carry = Math.floor(sum / 10);
    // 移动指针
    curr = curr.next;
  }
  
  // 处理最后的进位
  if (carry > 0) {
    curr.next = new ListNode(carry);
  }
  
  return dummy.next;
};
```

## 复杂度分析

- **时间复杂度**：O(max(m, n))
  - m 和 n 分别是两个链表的长度
  - 需要遍历较长的那个链表

- **空间复杂度**：O(max(m, n))
  - 需要创建新的链表存储结果
  - 最坏情况下比原来链表长1位（有进位）

## 示例演示

### 示例1：342 + 465 = 807

```
输入：l1 = [2,4,3], l2 = [5,6,4]

过程：
个位：2 + 5 = 7, carry = 0
十位：4 + 6 = 10 → 0, carry = 1  
百位：3 + 4 + 1 = 8, carry = 0

输出：[7,0,8] （表示807）
```

### 示例2：999 + 999 = 1998

```
输入：l1 = [9,9,9], l2 = [9,9,9]

过程：
个位：9 + 9 = 18 → 8, carry = 1
十位：9 + 9 + 1 = 19 → 9, carry = 1
百位：9 + 9 + 1 = 19 → 9, carry = 1
进位：carry = 1 → 新节点1

输出：[8,9,9,1] （表示1998）
```

### 示例3：长度不等的情况

```
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]

过程：
- 逐位相加，处理进位
- l1较长时，继续处理l1剩余位数
- 最后需要处理进位

输出：[8,9,9,9,0,0,0,1]
```

## 关键点总结

### 1. **哑节点技巧**
- 使用 dummy 节点简化链表构建逻辑
- 避免处理头节点的特殊情况

### 2. **进位处理**
- 使用 carry 变量维护进位
- 每次计算后更新 carry = Math.floor(sum / 10)
- 最后记得检查是否还有进位

### 3. **边界条件**
- 两个链表长度不一致
- 最后一个进位的处理
- 空链表的处理（题目保证非空）

### 4. **遍历条件**
- `while (l1 !== null || l2 !== null)`
- 只要有一个链表还有节点，就继续遍历

## 常见错误

### 1. 忘记处理进位
```javascript
// 错误：没有处理最后的进位
while (l1 !== null || l2 !== null) {
  // ... 处理相加
  // 忘记检查最后的进位
}
```

### 2. 链表遍历错误
```javascript
// 错误：遍历条件不对
while (l1 !== null && l2 !== null) { // 应该用 ||
  // 当一个链表结束时，另一个链表的剩余位没处理
}
```

### 3. 指针移动错误
```javascript
// 错误：忘记移动指针
curr.next = new ListNode(sum % 10);
// 忘记 curr = curr.next;
```

## 扩展思考

### 变体问题
- **两数相加 II**：链表按正序存储
- **链表中的两数相加**：可能包含前导零
- **k个链表相加**：扩展为多个链表相加

### 优化思路
- 可以递归实现，但可能栈溢出
- 可以预先计算链表长度，优化空间

## 相关题型
- [两数相加 II](https://leetcode.cn/problems/add-two-numbers-ii/)
- [回文链表](https://leetcode.cn/problems/palindrome-linked-list/)
- [反转链表](https://leetcode.cn/problems/reverse-linked-list/)