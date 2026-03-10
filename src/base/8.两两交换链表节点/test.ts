import { ListNode, createLinkedList, linkedListToArray } from './utils.ts';

function swapParis(head: ListNode | null): ListNode | null {
  if (head === null) {
    return null;
  }
  const dummy = new ListNode();
  dummy.next = head;
  let curr = dummy;
  while (curr.next !== null && curr.next.next !== null) {
    // 哨兵 curr
    const pre = curr.next; // 0
    const post = curr.next.next; // 1
    pre.next = post.next;
    post.next = pre;
    curr.next = post;
    curr = pre; // 哨兵节点为交换后的后一个节点,直接指向pre(因为是引用赋值，curr.next不会再指向post)
  }

  return dummy.next;
}

console.log(linkedListToArray(swapParis(createLinkedList([1, 2, 3, 4, 5, 6]))));
