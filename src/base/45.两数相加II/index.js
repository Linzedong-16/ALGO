import { ListNode } from '#utils/LinkList/ListNode.js';
import { arrayToList, listToArray } from '#utils/LinkList/LinkListUtils.js';
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 两数相加 II
 * 链表、栈
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
  const stack1 = [];
  const stack2 = [];

  while (l1 !== null || l2 !== null) {
    if (l1 !== null) {
      stack1.push(l1.val);
      l1 = l1.next;
    }
    if (l2 !== null) {
      stack2.push(l2.val);
      l2 = l2.next;
    }
  }
  let carry = 0;
  let curr = null;
  while (stack1.length !== 0 || stack2.length !== 0) {
    let sum = 0;
    if (stack1.length !== 0) {
      sum += stack1.pop();
    }

    if (stack2.length !== 0) {
      sum += stack2.pop();
    }

    sum += carry;
    const node = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    node.next = curr;
    curr = node;
  }

  if (carry !== 0) {
    const node = new ListNode(carry);
    node.next = curr;
    curr = node;
  }
  return curr;
};

import { assertEquals } from '@std/assert';
Deno.test('两数相加II', () => {
  assertEquals(
    listToArray(addTwoNumbers(arrayToList([7, 2, 4, 3]), arrayToList([5, 6, 4]))),
    [7, 8, 0, 7] // 直接对比数组，不需要再转链表
  );
});
