// import { ListNode } from '../../utils/LinkList/ListNode.js';
// import { ListNode } from '#utils/LinkList/ListNode.js';
import { assertListEqual, arrayToList } from '#utils/LinkList/LinkListUtils.js';

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const oddEvenList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  // 奇偶双指针迭代
  let odd = head;
  let even = head.next;
  const evenHead = even; // 暂存偶数链表的头节点

  // even === null 表示长度为奇数的链表已遍历完
  // even.next === null 表示长度为偶数的链表已无下一个奇节点
  // 都会导致奇接节点迭代失败
  while (even !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;

    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
};

Deno.test('奇偶链表', () => {
  const head = arrayToList([1, 2, 3, 4, 5]);
  const result = oddEvenList(head);
  assertListEqual(result, arrayToList([1, 3, 5, 2, 4]));
});
