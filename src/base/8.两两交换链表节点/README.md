# 两两交换链表节点

## 题目描述
给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

## 题型分析
- **题型分类**：链表操作、节点交换、双指针
- **难度等级**：中等
- **核心考点**：链表节点重新连接、哑节点应用、指针操作

## 解题思路

### 方法：迭代法（节点交换）

#### 思路解析
需要交换相邻的两个节点，关键在于正确处理节点之间的连接关系。每次交换涉及四个节点：前驱节点、第一个节点、第二个节点、第三个节点。

#### 核心思想
1. **哑节点技巧**：使用dummy节点简化头节点交换的处理
2. **节点分组**：每次处理两个节点为一组
3. **重新连接**：改变节点的next指针完成交换
4. **移动指针**：处理完一组后，移动到下一组

#### 算法步骤
1. 创建哑节点 dummy，指向头节点
2. 初始化当前指针 curr = dummy
3. 当 curr.next 和 curr.next.next 都存在时：
   - 标记要交换的两个节点：n1 = curr.next, n2 = curr.next.next
   - 执行交换：
     - curr.next = n2
     - n1.next = n2.next
     - n2.next = n1
   - 移动指针到下一组：curr = n1
4. 返回 dummy.next

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
 * 使用节点交换实现两两交换
 * @param {ListNode} head
 * @returns {ListNode}
 */
var swapPairs = function (head) {
  let dummy = new ListNode();
  dummy.next = head;
  let curr = dummy;
  
  while (curr.next !== null && curr.next.next !== null) {
    let n1 = curr.next;      // 第一个节点
    let n2 = curr.next.next; // 第二个节点
    
    // 交换节点
    curr.next = n2;      // 前驱节点连接第二个节点
    n1.next = n2.next;   // 第一个节点连接第二个节点的下一个节点
    n2.next = n1;        // 第二个节点连接第一个节点
    
    // 移动到下一组的前驱节点
    curr = n1;
  }
  
  return dummy.next;
};
```

## 复杂度分析

- **时间复杂度**：O(n)
  - n 是链表的长度
  - 每个节点只被访问一次

- **空间复杂度**：O(1)
  - 只使用了常数个额外空间

## 示例演示

### 示例1：[1,2,3,4]

```
初始状态：
dummy -> 1 -> 2 -> 3 -> 4 -> null
curr = dummy

第1组交换 (1,2)：
- n1 = curr.next = 1
- n2 = curr.next.next = 2
- curr.next = n2      → dummy -> 2
- n1.next = n2.next   → 1 -> 3
- n2.next = n1        → 2 -> 1
- curr = n1           → curr = 1

当前状态：
dummy -> 2 -> 1 -> 3 -> 4 -> null
          curr

第2组交换 (3,4)：
- n1 = curr.next = 3
- n2 = curr.next.next = 4
- curr.next = n2      → 1 -> 4
- n1.next = n2.next   → 3 -> null
- n2.next = n1        → 4 -> 3
- curr = n1           → curr = 3

最终状态：
dummy -> 2 -> 1 -> 4 -> 3 -> null
                    curr

curr.next.next 为 null，循环结束
结果：[2,1,4,3]
```

### 示例2：[1]

```
初始状态：
dummy -> 1 -> null
curr = dummy

检查条件：curr.next = 1, curr.next.next = null
不满足 while 条件，直接返回
结果：[1]
```

### 示例3：[]

```
初始状态：
dummy -> null
curr = dummy

检查条件：curr.next = null
不满足 while 条件，直接返回
结果：[]
```

## 关键点总结

### 1. **交换逻辑的顺序**
1. `curr.next = n2`：前驱节点连接第二个节点
2. `n1.next = n2.next`：第一个节点连接剩余部分
3. `n2.next = n1`：第二个节点连接第一个节点

**顺序很重要**：必须先处理前驱节点的连接，避免丢失后续节点引用

### 2. **指针移动策略**
- 交换完成后，curr 移动到第一个节点（原第二个位置）
- 这样 curr.next 就是下一组的第一个节点
- 保证下一轮循环可以正常处理

### 3. **哑节点的作用**
- 统一处理头节点的交换
- 避免单独处理第一个节点的特殊情况
- 简化代码逻辑

### 4. **循环条件**
- `curr.next !== null && curr.next.next !== null`
- 确保有两个节点可供交换
- 避免空指针异常

## 其他解法对比

### 方法1：递归解法
```javascript
var swapPairs = function(head) {
  if (head === null || head.next === null) {
    return head;
  }
  
  const newHead = head.next;
  head.next = swapPairs(newHead.next);
  newHead.next = head;
  
  return newHead;
};
```
**优点**：代码简洁
**缺点**：递归深度可能过大，存在栈溢出风险

### 方法2：数值交换（不推荐）
```javascript
var swapPairs = function(head) {
  let curr = head;
  while (curr !== null && curr.next !== null) {
    // 交换节点的值（题目要求不允许）
    [curr.val, curr.next.val] = [curr.next.val, curr.val];
    curr = curr.next.next;
  }
  return head;
};
```
**缺点**：违反题目要求，只交换值而不是节点

## 常见错误

### 1. 节点连接顺序错误
```javascript
// 错误：先修改 n1.next 会丢失 n2.next 的引用
n1.next = n2.next; // n2.next 还没保存就丢失了
n2.next = n1;
curr.next = n2;
```

### 2. 指针移动错误
```javascript
// 错误：curr 应该移动到 n1，不是 n2
curr = n2; // 应该是 curr = n1
```

### 3. 循环条件错误
```javascript
// 错误：可能导致空指针异常
while (curr.next.next !== null) { // 应该先检查 curr.next
  // ...
}
```

### 4. 忘记使用哑节点
```javascript
// 错误：处理头节点需要特殊逻辑
if (head !== null && head.next !== null) {
  // 特殊处理头节点
  // 然后处理剩余部分
}
```

## 扩展思考

### 变体问题
- **k个一组翻转链表**：扩展到每k个节点为一组进行翻转
- **交换奇偶位节点**：不是相邻节点，而是奇数位和偶数位交换
- **翻转链表**：整个链表翻转

### 应用场景
- **数据结构调整**：重新组织链表结构
- **算法优化**：某些算法需要特定的节点排列
- **数据处理**：重新排列数据顺序

### 技巧应用
- **多指针操作**：同时操作多个指针
- **节点重连**：安全地重新连接节点
- **边界处理**：正确处理各种边界情况

## 相关题型
- [K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/)
- [反转链表](https://leetcode.cn/problems/reverse-linked-list/)
- [旋转链表](https://leetcode.cn/problems/rotate-list/)