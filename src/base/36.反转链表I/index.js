/**
 *
 * @param {ListNode} head
 */
function reverseList(head) {
  // 三指针逆转
  let pre = null;
  let curr = head;
  let next = null;
  while (curr !== null) {
    next = curr.next;
    curr.next = pre;
    pre = curr;
    curr = next;
  }
  return pre;
}

Deno.test('测试反转链表', () => {
  console.log(linkedListToArray(reverseList(createLinkedList([1, 2, 3, 4, 5, 6, 7]))));
});

// 单链表节点构造函数
function ListNode(val, next) {
  // 节点值，默认为 0（兼容未传值的情况）
  this.val = val === undefined ? 0 : val;
  // 指向下一个节点的指针，默认为 null
  this.next = next === undefined ? null : next;
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
