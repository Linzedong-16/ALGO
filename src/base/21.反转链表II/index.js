/**
 * 反转链表 II
 * 链表、递归
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
function reverseBetween(head, left, right) {
  // 三指针逆转
  let pre = null;
  let curr = head;
  let next = null;

  for (let i = 1; i < left; i++) {
    pre = curr;
    curr = curr.next;
  }
  const pre2 = pre;
  const curr2 = curr;

  for (let i = left; i <= right; i++) {
    next = curr.next;
    curr.next = pre;
    pre = curr;
    curr = next;
  }
  if (pre2 !== null) {
    pre2.next = pre;
  } else {
    head = pre;
  }
  curr2.next = curr;
  return head;
}

// 单链表节点构造函数
class ListNode {
  constructor(val, next) {
    // 节点值，默认为 0（兼容未传值的情况）
    this.val = val === undefined ? 0 : val;
    // 指向下一个节点的指针，默认为 null
    this.next = next === undefined ? null : next;
  }
}

// 辅助函数：根据数组快速创建链表（可选，用于测试时构造输入用例）
function createLinkedList(arr) {
  if (arr.length === 0) {
    return null;
  }
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// 辅助函数：将链表转为数组（可选，用于测试时查看结果）
function linkedListToArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

Deno.test('反转链表', () => {
  console.log(linkedListToArray(reverseBetween(createLinkedList([1, 2, 3, 4, 5]), 2, 4)));
});
