import { assertEquals } from '@std/assert';

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
const getIntersectionNode = function (headA, headB) {
  let a = headA,
    b = headB;
  // 为什么不需要标记下两个节点是否跑完两段路而确认是否有相交节点？
  // a 和 b 无论是否相交，所经过的总路程永远相等，如果相交，
  // 返回某个中间节点，如果不相交，走完两段路后自动指向null 此时两个节点相等(null)正好返回null

  while (a !== b) {
    if (a === null) {
      a = headB;
    } else {
      a = a.next;
    }

    if (b === null) {
      b = headA;
    } else {
      b = b.next;
    }
  }
  return a;
};

Deno.test('相交链表测试', () => {
  const { headA, headB, intersection } = createIntersectedLists([1, 9, 1, 2, 4], [3, 2, 4], 2);

  assertEquals(getIntersectionNode(headA, headB), intersection);
  console.log(intersection);
});

/**
 * 修复版：创建相交链表（按「值数组 + 相交节点值」生成）
 * @param {number[]} listAValues 链表A的完整值数组（包含相交部分）
 * @param {number[]} listBValues 链表B的完整值数组（包含相交部分）
 * @param {number} intersectVal 相交节点的值（两个链表从此节点开始共享引用）
 * @returns {Object} { headA, headB, intersection } 头节点 + 相交节点
 */
function createIntersectedLists(listAValues, listBValues, intersectVal) {
  // 1. 处理无相交的情况（intersectVal 为 null/undefined 时）
  if (intersectVal === null || intersectVal === undefined) {
    const headA = buildList(listAValues);
    const headB = buildList(listBValues);
    return { headA, headB, intersection: null };
  }

  // 2. 找到两个值数组中相交节点的位置
  const aIntersectIdx = listAValues.findIndex((val) => val === intersectVal);
  const bIntersectIdx = listBValues.findIndex((val) => val === intersectVal);

  // 校验：确保相交值在两个数组中都存在
  if (aIntersectIdx === -1 || bIntersectIdx === -1) {
    throw new Error(`相交值 ${intersectVal} 未在两个链表值数组中同时找到`);
  }

  // 3. 提取相交部分的数值（必须保证两个数组的相交部分完全一致）
  const aCommonPart = listAValues.slice(aIntersectIdx);
  const bCommonPart = listBValues.slice(bIntersectIdx);
  if (JSON.stringify(aCommonPart) !== JSON.stringify(bCommonPart)) {
    throw new Error(`相交部分数值不一致：A的相交部分 ${aCommonPart}，B的相交部分 ${bCommonPart}`);
  }

  // 4. 创建公共相交节点链（核心：两个链表共享这部分引用）
  const intersectionHead = buildList(aCommonPart);

  // 5. 创建链表A的独立部分，并拼接相交部分
  const aIndependentPart = listAValues.slice(0, aIntersectIdx);
  let headA = buildList(aIndependentPart);
  if (headA) {
    let curr = headA;
    while (curr.next) {
      curr = curr.next;
    } // 找到A独立部分的尾节点
    curr.next = intersectionHead; // 拼接公共相交部分
  } else {
    // A无独立部分，直接以相交部分为头
    headA = intersectionHead;
  }

  // 6. 创建链表B的独立部分，并拼接相交部分
  const bIndependentPart = listBValues.slice(0, bIntersectIdx);
  let headB = buildList(bIndependentPart);
  if (headB) {
    let curr = headB;
    while (curr.next) {
      curr = curr.next;
    } // 找到B独立部分的尾节点
    curr.next = intersectionHead; // 拼接同一个公共相交部分（引用一致）
  } else {
    // B无独立部分，直接以相交部分为头
    headB = intersectionHead;
  }

  return {
    headA,
    headB,
    intersection: intersectionHead
  };
}

/**
 * 辅助函数：根据值数组构建普通链表
 * @param {number[]} values 节点值数组
 * @returns {ListNode|null} 链表头节点
 */
function buildList(values) {
  if (!values || values.length === 0) {
    return null;
  }
  const head = new ListNode(values[0]);
  let curr = head;
  for (let i = 1; i < values.length; i++) {
    curr.next = new ListNode(values[i]);
    curr = curr.next;
  }
  return head;
}
