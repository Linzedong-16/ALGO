# 合并两个有序链表

## 题目描述
将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

## 题型分析
- **题型分类**：链表操作、双指针、归并排序
- **难度等级**：简单
- **核心考点**：链表合并、哑节点应用、双指针遍历

## 解题思路

### 方法：迭代法（双指针）

#### 思路解析
由于两个链表都是有序的，我们可以使用双指针的方法，类似归并排序中的合并过程。每次比较两个链表当前节点的值，选择较小的节点链接到结果链表中。

#### 核心思想
1. **哑节点技巧**：使用dummy节点简化头节点处理
2. **双指针遍历**：分别指向两个链表的当前节点
3. **逐个比较**：每次选择较小的节点连接到结果链表
4. **剩余处理**：将剩余的链表直接连接到结果末尾

#### 算法步骤
1. 创建哑节点 dummy 和当前指针 curr
2. 初始化两个指针：p1 = l1, p2 = l2
3. 同时遍历两个链表：
   - 比较 p1.val 和 p2.val
   - 将较小的节点连接到 curr.next
   - 移动相应的指针（p1 或 p2）和 curr
4. 当一个链表遍历完时：
   - 将另一个链表的剩余部分直接连接到 curr.next
5. 返回 dummy.next

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
 * 将有序链表合并
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @returns {ListNode}
 */
var mergeTwoList = function (l1, l2) {
  let curr = new ListNode();
  const dummy = curr; // 哑节点，用于返回合并后的链表头
  
  // 对齐节点添加
  while (l1 !== null && l2 !== null) {
    if (l1.val > l2.val) {
      curr.next = l2;
      l2 = l2.next;
    } else {
      curr.next = l1;
      l1 = l1.next;
    }
    curr = curr.next;
  }
  
  // 对不齐时将剩余节点直接追加
  if (l1 !== null) {
    curr.next = l1;
  }
  if (l2 !== null) {
    curr.next = l2;
  }
  
  return dummy.next;
};
```

## 复杂度分析

- **时间复杂度**：O(m + n)
  - m 和 n 分别是两个链表的长度
  - 每个节点只被访问一次

- **空间复杂度**：O(1)
  - 只使用了常数个额外空间（不计算结果链表）

## 示例演示

### 示例1：l1 = [1,2,4], l2 = [1,3,4]

```
初始状态：
l1: 1 -> 2 -> 4 -> null
l2: 1 -> 3 -> 4 -> null
dummy -> curr

步骤1：比较 1 和 1
- l1.val <= l2.val，选择 l1
- curr.next = l1
l1: 2 -> 4 -> null
l2: 1 -> 3 -> 4 -> null
dummy -> 1 -> curr

步骤2：比较 2 和 1
- l2.val < l1.val，选择 l2
- curr.next = l2
l1: 2 -> 4 -> null
l2: 3 -> 4 -> null
dummy -> 1 -> 1 -> curr

步骤3：比较 2 和 3
- l1.val < l2.val，选择 l1
- curr.next = l1
l1: 4 -> null
l2: 3 -> 4 -> null
dummy -> 1 -> 1 -> 2 -> curr

步骤4：比较 4 和 3
- l2.val < l1.val，选择 l2
- curr.next = l2
l1: 4 -> null
l2: 4 -> null
dummy -> 1 -> 1 -> 2 -> 3 -> curr

步骤5：比较 4 和 4
- l1.val <= l2.val，选择 l1
- curr.next = l1
l1: null
l2: 4 -> null
dummy -> 1 -> 1 -> 2 -> 3 -> 4 -> curr

步骤6：l1为空，连接剩余的l2
curr.next = l2
结果：1 -> 1 -> 2 -> 3 -> 4 -> 4
```

### 示例2：l1 = [], l2 = [0]

```
初始状态：
l1: null
l2: 0 -> null

由于 l1 为空，直接返回 l2
结果：0
```

### 示例3：l1 = [1,3,5], l2 = [2,4,6,7,8]

```
合并过程：
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
剩余的l2：7 → 8 直接连接
结果：1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
```

## 关键点总结

### 1. **哑节点的作用**
- 简化头节点处理逻辑
- 避免处理第一个节点的特殊情况
- 统一所有节点的处理方式

### 2. **双指针遍历**
- 两个指针分别指向当前要比较的节点
- 每次选择较小的值连接到结果链表
- 保证结果链表的有序性

### 3. **剩余链表处理**
- 当一个链表遍历完时，另一个链表必然有序
- 可以直接连接剩余部分，无需继续比较
- 提高效率

### 4. **指针移动的时机**
- 选择节点后立即移动相应的链表指针
- 同时移动结果链表的指针
- 确保不丢失任何节点

## 其他解法对比

### 方法1：递归解法
```javascript
var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```
**优点**：代码简洁
**缺点**：递归深度可能过大，存在栈溢出风险

### 方法2：数组辅助
```javascript
var mergeTwoLists = function(l1, l2) {
  // 将两个链表转为数组，合并后排序，再转回链表
  const arr1 = linkedListToArray(l1);
  const arr2 = linkedListToArray(l2);
  const merged = arr1.concat(arr2).sort((a, b) => a - b);
  return createLinkedList(merged);
};
```
**缺点**：空间复杂度高，时间复杂度不如迭代法

## 常见错误

### 1. 忘记处理剩余链表
```javascript
// 错误：只处理共同部分
while (l1 !== null && l2 !== null) {
  // 比较和连接
}
// 忘记处理剩余的节点
```

### 2. 指针移动错误
```javascript
// 错误：忘记移动当前指针
if (l1.val < l2.val) {
  curr.next = l1;
  // 忘记 l1 = l1.next;
}
curr = curr.next; // 可能导致无限循环
```

### 3. 哑节点使用错误
```javascript
// 错误：直接返回curr而不是dummy.next
return curr; // curr指向链表末尾
```

## 扩展思考

### 变体问题
- **合并K个有序链表**：扩展到多个链表的合并
- **合并两个倒序链表**：链表按降序排列
- **原地合并**：不创建新节点，重新组织现有节点

### 应用场景
- **归并排序**：合并阶段就是链表合并
- **外部排序**：合并多个有序文件
- **数据库查询**：合并多个有序结果集

### 优化思路
- **K个链表合并**：可以使用优先队列优化
- **并行处理**：可以并行处理多个链表段
- **内存优化**：原地合并减少内存使用

## 相关题型
- [合并K个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)
- [链表的中间节点](https://leetcode.cn/problems/middle-of-the-linked-list/)
- [排序链表](https://leetcode.cn/problems/sort-list/)