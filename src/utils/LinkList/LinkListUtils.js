import { ListNode } from './ListNode.js';
import { assertEquals } from '@std/assert';

/**
 * 数组 -> 单链表
 * @param {number[]} arr
 * @return {ListNode} 链表头节点
 */
export function arrayToList(arr) {
  if (!arr || arr.length === 0) {
    return null;
  }

  const dummy = new ListNode();
  let current = dummy;

  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }

  return dummy.next;
}

/**
 * 单链表 -> 数组
 * @param {ListNode} head
 * @return {number[]}
 */
export function listToArray(head) {
  const result = [];
  let current = head;

  while (current) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

/**
 * Deno 专用：断言两个链表相等
 * @param {ListNode} actual
 * @param {ListNode} expected
 */
export function assertListEqual(actual, expected) {
  const actualArr = listToArray(actual);
  const expectedArr = listToArray(expected);
  assertEquals(actualArr, expectedArr);
}
