import { createCycleList, printList, getCycleNodeVal } from './utils.js';
import { assertEquals } from '@std/assert';

/**
 * @param {ListNode} head
 * @return {ListNode} node
 */
function detectCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      // 有环找入环点
      fast = head;
      while (fast !== slow) {
        fast = fast.next;
        slow = slow.next;
      }
      return fast;
    }
  }

  return null;
}

Deno.test('环形链表II测试 - 有环场景', () => {
  console.log('\n===== 测试有环链表 =====');

  // 测试用例4：环入口在索引1（节点值2）
  const cycleList1 = createCycleList([3, 2, 0, -4], 1);
  printList(cycleList1, 1);
  const cycleNode1 = detectCycle(cycleList1);
  console.log('环入口节点值：', getCycleNodeVal(cycleNode1)); // 预期 2
  assertEquals(getCycleNodeVal(cycleNode1), 2);

  // 测试用例5：环入口在索引0（头节点，值1）
  const cycleList2 = createCycleList([1, 2], 0);
  printList(cycleList2, 0);
  const cycleNode2 = detectCycle(cycleList2);
  console.log('环入口节点值：', getCycleNodeVal(cycleNode2)); // 预期 1
  assertEquals(getCycleNodeVal(cycleNode2), 1);

  // 测试用例6：单节点自环（环入口是自己，值5）
  const cycleList3 = createCycleList([5], 0);
  printList(cycleList3, 0);
  const cycleNode3 = detectCycle(cycleList3);
  console.log('环入口节点值：', getCycleNodeVal(cycleNode3)); // 预期 5
  assertEquals(getCycleNodeVal(cycleNode3), 5);
});
