// --- 数据结构定义 ---
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- 辅助函数：数组转链表 ---
function arrayToLinkedList(arr: number[]): ListNode | null {
  const dummy = new ListNode(0);
  let cur: ListNode | null = dummy;
  for (const val of arr) {
    cur.next = new ListNode(val);
    cur = cur.next;
  }
  return dummy.next;
}

// --- 辅助函数：链表转数组 ---
function linkedListToArray(list: ListNode | null): number[] {
  const res: number[] = [];
  let cur: ListNode | null = list;
  while (cur !== null) {
    res.push(cur.val);
    cur = cur.next;
  }
  return res;
}

// --- [解题区域] ---
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode();
  dummy.next = head;

  let curr = dummy;
  let last = dummy;

  for (let i = 0; i < n; i++) {
    last = last.next!;
  }

  while (last !== null && last.next !== null) {
    curr = curr.next!;
    last = last.next;
  }

  /// 删除
  //   curr.next = last;
  curr.next = curr.next?.next!;

  // 在这里编写你的解题逻辑
  return dummy.next;
}
// --- 解题结束 ---

// --- 测试用例 ---
import { assertEquals } from '@std/assert';

Deno.test('19. 删除链表的倒数第 N 个结点', () => {
  console.time('耗时');

  // 辅助断言：比较数组
  const assertListEqual = (a: number[], b: number[], msg: string) => {
    assertEquals(a, b, msg);
  };

  // 示例 1
  assertListEqual(
    linkedListToArray(removeNthFromEnd(arrayToLinkedList([1, 2, 3, 4, 5]), 2)),
    [1, 2, 3, 5],
    '示例 1 不通过'
  );

  // 示例 2
  assertListEqual(
    linkedListToArray(removeNthFromEnd(arrayToLinkedList([1]), 1)),
    [],
    '示例 2 不通过'
  );

  // 示例 3
  assertListEqual(
    linkedListToArray(removeNthFromEnd(arrayToLinkedList([1, 2]), 1)),
    [1],
    '示例 3 不通过'
  );

  console.timeEnd('耗时');
});
