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

const head = createLinkedList([1, 2, 3, 4, 5]);

/**
 * 一次遍历完成倒序删除
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {
  // 0号节点
  const dummy = new ListNode();
  dummy.next = head;
  let pre = dummy,
    last = dummy;
  for (let i = 0; i < n; i++) {
    last = last.next;
  }
  while (last.next !== null) {
    pre = pre.next;
    last = last.next;
  }
  pre.next = pre.next.next;
  return dummy.next;
};

const node = removeNthFromEnd(head, 2);

console.log(linkedListToArray(node));
