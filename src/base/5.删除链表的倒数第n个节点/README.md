# 删除链表的倒数第N个节点

## 题目描述
给你一个链表，删除链表的倒数第 n 个节点，并且返回链表的头节点。

## 题型分析
- **题型分类**：链表操作、双指针、快慢指针
- **难度等级**：中等
- **核心考点**：快慢指针技巧、哑节点应用

## 解题思路

### 方法：快慢指针（一次遍历）

#### 思路解析
要删除倒数第n个节点，需要找到倒数第n+1个节点（前驱节点）。使用快慢指针可以在一次遍历中同时找到目标位置。

#### 核心思想
1. **快慢指针**：快指针先走n步，然后慢指针开始走
2. **保持距离**：快慢指针始终保持n步的距离
3. **哑节点**：使用dummy节点简化头节点删除的处理

#### 算法步骤
1. 创建哑节点 dummy，指向头节点
2. 初始化两个指针：pre = dummy（慢指针）, last = dummy（快指针）
3. 快指针先走n步：for (let i = 0; i < n; i++) last = last.next
4. 同时移动快慢指针：while (last.next !== null)
   - pre = pre.next
   - last = last.next
5. 当快指针到达末尾时，慢指针指向要删除节点的前驱
6. 执行删除：pre.next = pre.next.next
7. 返回 dummy.next

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
 * 一次遍历完成倒序删除
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // 创建哑节点，指向头节点
  const dummy = new ListNode();
  dummy.next = head;
  
  let pre = dummy,    // 慢指针：指向要删除节点的前驱
      last = dummy;   // 快指针：先走n步
  
  // 快指针先走n步
  for (let i = 0; i < n; i++) {
    last = last.next;
  }
  
  // 同时移动快慢指针，保持n步距离
  while (last.next !== null) {
    pre = pre.next;
    last = last.next;
  }
  
  // 删除倒数第n个节点
  pre.next = pre.next.next;
  
  return dummy.next;
};
```

## 复杂度分析

- **时间复杂度**：O(L)
  - L 是链表的长度
  - 快指针走完整個链表，慢指针走（L-n）步

- **空间复杂度**：O(1)
  - 只使用了常数个额外空间

## 示例演示

### 示例1：删除倒数第2个节点

```
输入：head = [1,2,3,4,5], n = 2

初始状态：
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
pre, last = dummy

第1步：快指针先走2步
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
  pre       last

第2步：同时移动快慢指针
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
       pre        last

第3步：继续移动
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
            pre         last

第4步：继续移动
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
               pre          last

第5步：last.next为null，停止
删除操作：pre.next = pre.next.next
        3 -> 5

输出：[1,2,3,5]
```

### 示例2：删除头节点（n=链表长度）

```
输入：head = [1,2,3], n = 3

过程：
- 快指针走3步到达null
- 慢指针仍在dummy位置
- 删除：dummy.next = dummy.next.next
- 删除的是第一个节点

输出：[2,3]
```

### 示例3：单节点情况

```
输入：head = [1], n = 1

过程：
- 快指针走1步到null
- 慢指针在dummy位置
- 删除：dummy.next = null

输出：[]
```

## 关键点总结

### 1. **快慢指针的优势**
- 一次遍历解决问题
- 空间复杂度最优
- 时间复杂度最优

### 2. **哑节点的重要性**
- 统一处理头节点删除的情况
- 避免特殊情况的判断
- 简化代码逻辑

### 3. **指针移动的理解**
- 快指针先走n步，建立n步的差距
- 同时移动时，始终保持n步距离
- 当快指针到达末尾时，慢指针正好在目标位置

### 4. **边界条件**
- n等于链表长度（删除头节点）
- 链表只有一个节点
- n=1（删除尾节点）

## 其他解法对比

### 方法1：两次遍历（不推荐）
```javascript
var removeNthFromEnd = function(head, n) {
  // 第一次遍历：计算链表长度
  let length = 0;
  let curr = head;
  while (curr !== null) {
    length++;
    curr = curr.next;
  }
  
  // 第二次遍历：删除第(length-n+1)个节点
  const dummy = new ListNode();
  dummy.next = head;
  let pre = dummy;
  for (let i = 0; i < length - n; i++) {
    pre = pre.next;
  }
  pre.next = pre.next.next;
  
  return dummy.next;
};
```
**缺点**：需要遍历两次

### 方法2：栈解法
```javascript
var removeNthFromEnd = function(head, n) {
  const stack = [];
  const dummy = new ListNode();
  dummy.next = head;
  let curr = dummy;
  
  // 所有节点入栈
  while (curr !== null) {
    stack.push(curr);
    curr = curr.next;
  }
  
  // 弹出n个节点，栈顶就是前驱节点
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  const pre = stack[stack.length - 1];
  pre.next = pre.next.next;
  
  return dummy.next;
};
```
**缺点**：空间复杂度O(n)

## 常见错误

### 1. 忘记使用哑节点
```javascript
// 错误：当删除头节点时出现问题
if (head === null || head.next === null) return null;
let slow = head, fast = head;
// 如果删除的是头节点，无法正确处理
```

### 2. 快指针移动次数错误
```javascript
// 错误：快指针应该移动n步，不是n-1步
for (let i = 0; i < n - 1; i++) { // 应该是 n
  fast = fast.next;
}
```

### 3. 循环条件错误
```javascript
// 错误：应该是last.next !== null
while (last !== null) { // 这样慢指针会多走一步
  pre = pre.next;
  last = last.next;
}
```

## 扩展思考

### 变体问题
- **删除中间节点**：删除链表的中间节点
- **删除指定值节点**：删除所有值为val的节点
- **旋转链表**：将链表向右旋转k个位置

### 技巧应用
- **删除倒数第k个节点组**：连续的k个节点
- **查找倒数第k个节点**：只查找不删除
- **查找中间节点**：快指针走两步，慢指针走一步

## 相关题型
- [删除链表中的节点](https://leetcode.cn/problems/delete-node-in-a-linked-list/)
- [环形链表](https://leetcode.cn/problems/linked-list-cycle/)
- [链表的中间节点](https://leetcode.cn/problems/middle-of-the-linked-list/)