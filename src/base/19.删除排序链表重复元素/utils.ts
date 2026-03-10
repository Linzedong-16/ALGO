// 单链表节点类
export class ListNode {
  // 定义节点属性类型
  val: number;
  next: ListNode | null;

  // 构造函数：参数添加类型注解，使用 TS 可选参数+默认值简化逻辑
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

// 辅助函数：根据数组创建链表，参数和返回值添加类型注解
export function createLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) {
    return null;
  }
  const head: ListNode = new ListNode(arr[0]);
  let current: ListNode = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// 辅助函数：链表转数组，参数和返回值添加类型注解
export function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current: ListNode | null = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// 测试用例
export const l1: ListNode | null = createLinkedList([2, 4, 3]);
export const l2: ListNode | null = createLinkedList([7, 0, 8]);
