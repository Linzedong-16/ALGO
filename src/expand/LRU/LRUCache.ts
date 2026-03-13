export class LRUCache {
  private capacity: number;
  private head: ListNode;
  private tail: ListNode;
  private hashMap: Map<number, ListNode>;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.head = new ListNode(-1, 0);
    this.tail = new ListNode(-1, 0);

    this.head.next = this.tail;
    this.tail.pre = this.head;

    this.hashMap = new Map<number, ListNode>();
  }

  get(key: number): number {
    const node = this.hashMap.get(key);
    if (!node) {
      return -1;
    }
    this.moveToTail(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const node = this.hashMap.get(key);
    if (node) {
      // 更新操作
      node.value = value;
      this.moveToTail(node);
    } else {
      const curr = new ListNode(key, value);
      // 是否已经满容量
      if (this.hashMap.size === this.capacity) {
        // 删除旧节点
        const oldNode = this.head.next!;
        this.removeNodeFromLinkList(oldNode);
        // 哈希表删除
        this.hashMap.delete(oldNode.key!);
      }
      // 加入到尾部
      this.addToTail(curr);
      // 哈希表映射
      this.hashMap.set(key, curr);
    }
  }

  private removeNodeFromLinkList(node: ListNode) {
    const preNode = node.pre!;
    const nextNode = node.next!;

    // 跳过node
    preNode.next = nextNode;
    nextNode.pre = preNode;
  }

  private addToTail(node: ListNode) {
    const lastNode = this.tail.pre!;
    lastNode.next = node;
    node.pre = lastNode;
    node.next = this.tail;
    this.tail.pre = node;
  }

  private moveToTail(node: ListNode) {
    this.removeNodeFromLinkList(node);
    this.addToTail(node);
  }
}

class ListNode {
  public key: number;
  public value: number;
  public pre: ListNode | null;
  public next: ListNode | null;

  constructor(
    key: number,
    value: number,
    pre: ListNode | null = null,
    next: ListNode | null = null
  ) {
    this.key = key;
    this.value = value;
    this.pre = pre;
    this.next = next;
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
