import { createLinkedList, linkedListToArray, ListNode } from './utils.ts';

const head = createLinkedList([1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 8, 8, 10]);

/**
 * 删除排序链表中的重复元素
 * 链表、双指针
 * @param {ListNode} head
 * @returns {ListNode}
 */
function deleteDuplicates(head: ListNode) {
  let curr = head;

  while (curr !== null && curr.next !== null) {
    if (curr.val === curr.next.val) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }

  return head;
}

console.log(linkedListToArray(deleteDuplicates(head!)));
