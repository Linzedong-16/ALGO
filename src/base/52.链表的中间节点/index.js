import { arrayToList, listToArray } from '#utils/LinkList/LinkListUtils.js';

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 链表的中间节点
 * 链表、双指针
 * @param {ListNode} head
 * @return {ListNode}
 */
const middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next; // 速度2 ，快指针到尾，慢指针一定在中间
    slow = slow.next; // 速度 1
  }

  return slow;
};
import { assertEquals } from '@std/assert';
Deno.test('快慢指针解决中间节点', () => {
  assertEquals(listToArray(middleNode(arrayToList([1, 2, 3, 4, 5]))), [3, 4, 5]);
});
