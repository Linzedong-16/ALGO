// 21. 合并两个有序链表

// 链表节点定义
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

// 辅助函数：链表转数组（便于断言比较）
function listToArray(head: ListNode | null): number[] {
  const res: number[] = [];
  let cur = head;
  while (cur) {
    res.push(cur.val);
    cur = cur.next;
  }
  return res;
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let curr = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val >= list2.val) {
      curr.next = list2;
      list2 = list2.next;
    } else {
      curr.next = list1;
      list1 = list1.next;
    }
    curr = curr.next;
  }

  if (list1 !== null) {
    curr.next = list1;
  }
  if (list2 !== null) {
    curr.next = list2;
  }
  // 你的实现代码
  return dummy.next;
}

import { assertEquals } from '@std/assert';

Deno.test('21. 合并两个有序链表', () => {
  console.time('耗时');

  // 示例 1：l1 = [1,2,4], l2 = [1,3,4]
  const res1 = mergeTwoLists(createList([1, 2, 4]), createList([1, 3, 4]));
  assertEquals(listToArray(res1), [1, 1, 2, 3, 4, 4]);

  // 示例 2：两个空链表
  const res2 = mergeTwoLists(createList([]), createList([]));
  assertEquals(listToArray(res2), []);

  // 示例 3：一个为空，一个非空
  const res3 = mergeTwoLists(createList([]), createList([0]));
  assertEquals(listToArray(res3), [0]);

  console.timeEnd('耗时');
});
