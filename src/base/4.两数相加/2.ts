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
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let carry = 0;
  const dummy = new ListNode();
  let curr = dummy;

  while (l1 !== null || l2 !== null) {
    let sum = 0;
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }

    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }
    sum += carry;
    carry = Math.floor(sum / 10);
    const node = new ListNode(sum % 10);

    curr.next = node;
    curr = curr.next;
  }

  if (carry !== 0) {
    curr.next = new ListNode(carry);
  }
  return dummy.next;
}
// --- 解题结束 ---

// --- 测试用例 ---
import { assertEquals } from '@std/assert';

Deno.test('2. 两数相加', () => {
  console.time('耗时');

  // 辅助断言：比较数组
  const assertListEqual = (a: number[], b: number[], msg: string) => {
    assertEquals(a, b, msg);
  };

  // 示例 1: [2,4,3] + [5,6,4]
  const res1 = linkedListToArray(
    addTwoNumbers(arrayToLinkedList([2, 4, 3]), arrayToLinkedList([5, 6, 4]))
  );
  assertListEqual(res1, [7, 0, 8], '示例 1 不通过');

  // 示例 2: [0] + [0]
  const res2 = linkedListToArray(addTwoNumbers(arrayToLinkedList([0]), arrayToLinkedList([0])));
  assertListEqual(res2, [0], '示例 2 不通过');

  // 示例 3: [9,9,9] + [9,9,9,9,9,9,9]
  const res3 = linkedListToArray(
    addTwoNumbers(arrayToLinkedList([9, 9, 9]), arrayToLinkedList([9, 9, 9, 9, 9, 9, 9]))
  );
  assertListEqual(res3, [8, 9, 9, 0, 0, 0, 0, 1], '示例 3 不通过');

  console.timeEnd('耗时');
});
