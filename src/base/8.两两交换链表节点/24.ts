// 24. 两两交换链表中的节点

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 辅助函数：数组转链表
function createList(arr: number[]): ListNode | null {
  if (arr.length === 0) {
    return null;
  }
  const head = new ListNode(arr[0]);
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return head;
}

// 辅助函数：链表转数组
function listToArray(head: ListNode | null): number[] {
  const res: number[] = [];
  let cur = head;
  while (cur) {
    res.push(cur.val);
    cur = cur.next;
  }
  return res;
}

function swapPairs(head: ListNode | null): ListNode | null {
  // 你的实现代码
  // 要求：两两交换相邻节点，且不能修改节点内部的值，只能进行节点交换

  const dummy = new ListNode();
  dummy.next = head;

  let prev = dummy;
  let curr = dummy.next;
  let last: ListNode;

  while (curr !== null && curr.next !== null) {
    last = curr.next;

    // 交换两个节点
    curr.next = last.next;
    last.next = curr;
    prev.next = last;

    prev = curr;
    curr = prev.next;
  }

  return dummy.next;
}

import { assertEquals } from '@std/assert';

Deno.test('24. 两两交换链表中的节点', () => {
  console.time('耗时');

  // 示例 1: head = [1,2,3,4]
  const res1 = swapPairs(createList([1, 2, 3, 4]));
  assertEquals(listToArray(res1), [2, 1, 4, 3]);

  // 示例 2: head = []
  const res2 = swapPairs(createList([]));
  assertEquals(listToArray(res2), []);

  // 示例 3: head = [1]
  const res3 = swapPairs(createList([1]));
  assertEquals(listToArray(res3), [1]);

  console.timeEnd('耗时');
});
