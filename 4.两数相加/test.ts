import { ListNode, l1, l2, linkedListToArray } from './utils.ts';

/**
 * 两数相加
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @returns {ListNode} list
 */
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let curr = dummy; // 指针
  let carry: number = 0;
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
    curr.next = new ListNode(Math.floor(sum % 10));
    carry = Math.floor(sum / 10);
    curr = curr.next;
  }
  return dummy.next;
}

const l3 = addTwoNumbers(l1, l2);

console.log(linkedListToArray(l3));
