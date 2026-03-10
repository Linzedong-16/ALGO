export function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * 工具函数1：生成无环链表
 * @param {number[]} arr - 链表节点值的数组
 * @return {ListNode} 链表头节点
 */
export function createNoCycleList(arr) {
  if (arr.length === 0) {
    return null;
  }
  // 创建头节点
  const head = new ListNode(arr[0]);
  let current = head;
  // 遍历数组生成后续节点
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

/**
 * 工具函数2：生成有环链表
 * @param {number[]} arr - 链表节点值的数组
 * @param {number} pos - 环的入口位置（索引，从0开始，-1表示无环）
 * @return {ListNode} 链表头节点
 */
export function createCycleList(arr, pos) {
  if (arr.length === 0) {
    return null;
  }
  // 先生成普通链表
  const head = new ListNode(arr[0]);
  let current = head;
  let cycleNode = null; // 保存环的入口节点
  // 遍历生成节点，记录环入口
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
    // 找到环入口位置
    if (i === pos) {
      cycleNode = current;
    }
  }
  // 特殊处理：pos=0 表示头节点是环入口
  if (pos === 0) {
    cycleNode = head;
  }
  // 将最后一个节点的next指向环入口，形成环
  if (pos >= 0 && cycleNode) {
    current.next = cycleNode;
  }
  return head;
}

/**
 * 工具函数3：打印链表（方便调试，有环时标注环入口）
 * @param {ListNode} head
 * @param {number} pos - 环的入口位置（仅用于打印提示）
 */
export function printList(head, pos = -1) {
  if (!head) {
    console.log('空链表');
    return;
  }
  const visited = new Set(); // 避免环的无限循环
  let current = head;
  const result = [];
  let index = 0;
  while (current && !visited.has(current)) {
    visited.add(current);
    result.push(current.val);
    // 标注环入口
    if (index === pos) {
      result.push('【环入口】');
    }
    current = current.next;
    index++;
  }
  // 有环时补充提示
  if (current) {
    result.push(`→ 环回到 ${current.val}`);
  }
  console.log('链表结构：', result.join(' → '));
}
