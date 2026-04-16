const l1 = createLinkedList([1, 3, 4, 9]);
const l2 = createLinkedList([1, 2, 4, 7, 21]);

/**
 *  将有序链表合并
 * 链表、递归
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @returns {ListNode}
 */
const mergeTwoList = function (l1, l2) {
  let curr = new ListNode();
  const dummy = curr;
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

console.log(linkedListToArray(mergeTwoList(l1, l2)));

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
