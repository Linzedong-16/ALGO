import { createCycleList, printList, createNoCycleList } from './utils.js';
/**
 * 快慢指针判断是否成环
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
  // 快慢指针 相遇
  let fast = head;
  let slow = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }

  return false;
}

Deno.test('环形链表测试', () => {
  console.log('===== 测试无环链表 =====');
  // 测试用例1：空链表
  const emptyList = createNoCycleList([]);
  printList(emptyList);
  console.log('是否有环：', hasCycle(emptyList)); // 预期 false

  console.log('\n===== 测试有环链表 =====');
  // 测试用例4：环入口在索引1（节点2）
  const cycleList1 = createCycleList([3, 2, 0, -4], 1);
  printList(cycleList1, 1);
  console.log('是否有环：', hasCycle(cycleList1)); // 预期 true
});
