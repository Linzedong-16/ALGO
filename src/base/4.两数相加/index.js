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

const l1 = createLinkedList([2, 4, 3]);
const l2 = createLinkedList([7, 0, 8]);

/**
 * 两数相加
 * 链表、数学
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @returns {ListNode} list
 */
const addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(); // 链表头
  let curr = dummy; // 指针
  let carry = 0; // 进位
  while (l1 !== null || l2 !== null) {
    let sum = 0;
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }
    sum += carry;
    curr.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    curr = curr.next;
  }
  if (carry > 0) {
    curr.next = new ListNode(carry);
  }
  return dummy.next;
};

const l3 = addTwoNumbers(l1, l2);

console.log(linkedListToArray(l3));
