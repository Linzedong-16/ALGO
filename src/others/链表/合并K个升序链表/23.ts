import { ListNode } from '#utils/LinkList/ListNode.ts';
import { arrayToList, listToArray } from '#utils/LinkList/LinkListUtils.js';

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

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) {
    return null;
  }
  if (lists.length === 1) {
    return lists[0];
  }
  const mid = Math.floor(lists.length / 2);
  const left = mergeKLists(lists.slice(0, mid));
  const right = mergeKLists(lists.slice(mid));

  return mergeList(left, right);
}

/**
 *
 * @param h1
 * @param h2
 * @returns
 */
function mergeList(h1: ListNode | null, h2: ListNode | null): ListNode | null {
  // 归并排序关键：合并链表
  const dummy = new ListNode();
  let curr: ListNode | null = dummy;

  while (h1 !== null && h2 !== null) {
    if (h1.val >= h2.val) {
      curr.next = h2;
      h2 = h2.next;
    } else {
      curr.next = h1;
      h1 = h1.next;
    }
    curr = curr.next;
  }

  if (h1 !== null) {
    curr.next = h1;
  }
  if (h2 !== null) {
    curr.next = h2;
  }

  return dummy.next;
}

import { assertEquals } from '@std/assert';
Deno.test('合并k个升序链表', () => {
  console.time('耗时');
  assertEquals(
    listToArray(
      mergeKLists(
        [
          [1, 4, 5],
          [1, 3, 4],
          [2, 6]
        ].map((arr) => arrayToList(arr))
      ) as ListNode
    ),
    [1, 1, 2, 3, 4, 4, 5, 6]
  );
  assertEquals(listToArray(mergeKLists([[]].map((arr) => arrayToList(arr))) as ListNode), []);
  console.timeEnd('耗时');
});
