import { ListNode, createLinkedList, linkedListToArray } from './utils.ts';
const l1 = createLinkedList([1, 3, 4, 9]);
const l2 = createLinkedList([1, 2, 4, 7, 21, 100]);
function mergeTwoList(l1: ListNode, l2: ListNode): ListNode {
  let curr = new ListNode();
  const dummy = curr;
  while (l1 !== null && l2 !== null) {
    if (l1.val > l2.val) {
      curr.next = l2;
      l2 = l2.next!;
    } else {
      curr.next = l1;
      l1 = l1.next!;
    }
    curr = curr.next;
  }
  if (l1 !== null) {
    curr.next = l1;
  }
  if (l2 !== null) {
    curr.next = l2;
  }
  return dummy.next!;
}

console.log(linkedListToArray(mergeTwoList(l1!, l2!)));
