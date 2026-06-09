/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
import { ListNode } from '#utils/LinkList/ListNode.js';
import { arrayToList, listToArray } from '#utils/LinkList/LinkListUtils.js';
import { assertEquals } from '@std/assert';

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // 计数
  let n = 0;
  let curr = head;
  while (curr !== null) {
    n++;
    curr = curr.next;
  }

  const dummy: ListNode | null = new ListNode();
  dummy.next = head;
  curr = dummy;

  for (; n >= k; n -= k) {
    const fir = curr;
    const tail: ListNode | null = curr!.next;

    let prev: ListNode | null = null;
    let p: ListNode | null = curr!.next;
    for (let i = 0; i < k; i++) {
      const next = p!.next;
      p!.next = prev;
      prev = p;
      p = next;
    }
    fir!.next = prev;
    tail!.next = p;

    curr = tail;
  }

  return dummy.next;
}

Deno.test('k个一组翻转链表', () => {
  assertEquals(
    listToArray(reverseKGroup(arrayToList([1, 2, 3, 4, 5]), 2) as ListNode),
    [2, 1, 4, 3, 5]
  );
  assertEquals(
    listToArray(reverseKGroup(arrayToList([1, 2, 3, 4, 5]), 3) as ListNode),
    [3, 2, 1, 4, 5]
  );
});
