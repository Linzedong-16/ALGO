import { ListNode, createLinkedList, linkedListToArray } from './utils.ts';

function removeNthFromEnd(head: ListNode, n: number): ListNode {
  const dummy = new ListNode();
  dummy.next = head;
  let pre: ListNode | null = dummy.next;
  let last: ListNode | null = dummy.next;

  for (let i = 0; i < n; i++) {
    last = last.next!;
  }
  while (last!.next !== null) {
    last = last.next;
    pre = pre!.next;
  }
  pre!.next = pre!.next!.next;
  return dummy.next;
}
const head = createLinkedList([1, 2, 3, 4, 5]);
const node = removeNthFromEnd(head!, 2);

console.log(linkedListToArray(node));
