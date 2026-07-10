class LRUCache {
  /**
   * 缓存容量
   */
  private readonly capacity: number;
  /**
   * 键-缓存节点对象引用 映射表
   */
  private readonly hashMap: Map<number, Node>;
  /**
   * 头节点
   */
  private readonly head: Node = new Node(0, 0);
  /**
   * 尾节点
   */
  private readonly tail: Node = new Node(0, 0);

  /**
   * 将节点在链表中移除
   * @param node
   */
  private removeNodeFromList(node: Node): void {
    const prev = node.prev!;
    const next = node.next!;

    prev.next = next;
    next.prev = prev;
  }

  /**
   * 将节点追加到末尾
   * @param node
   */
  private addToTail(node: Node): void {
    if (!node) {
      return;
    }
    const last = this.tail.prev!;
    last.next = node;
    node.prev = last;
    node.next = this.tail;
    this.tail.prev = node;
  }

  /**
   * 将节点移到尾部 - 最近使用的缓存更新
   * @param node
   */
  private moveToTail(node: Node): void {
    this.removeNodeFromList(node);
    this.addToTail(node);
  }

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw Error('缓存容量不能小于0');
    }
    this.capacity = capacity;
    this.hashMap = new Map<number, Node>();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * 获取缓存值
   * @param key
   * @returns
   */
  public get(key: number): number {
    if (this.hashMap.has(key)) {
      this.moveToTail(this.hashMap.get(key)!);
      return this.hashMap.get(key)!.val;
    }
    return -1;
  }

  /**
   * 设置值
   * @param key
   * @param value
   */
  public put(key: number, value: number): void {
    if (this.hashMap.has(key)) {
      const node = this.hashMap.get(key)!;
      node.val = value;
      this.moveToTail(node);
      return;
    }
    if (this.capacity === this.hashMap.size) {
      // 需要移除很久没用的缓存
      const node = this.head.next!;
      this.hashMap.delete(node.key);
      this.removeNodeFromList(node);
    }
    const node = new Node(key, value);
    this.hashMap.set(key, node);
    this.addToTail(node);
  }
}

/**
 * 存储缓存节点
 */
class Node {
  constructor(
    public key: number,
    public val: number,
    public prev?: Node,
    public next?: Node
  ) {}
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

import { assertEquals, assertThrows } from '@std/assert';
Deno.test('LRUCache basic test case (LeetCode 146 示例流程)', () => {
  console.time('LRU执行耗时');
  const cache = new LRUCache(2);

  cache.put(1, 1);
  cache.put(2, 2);
  assertEquals(cache.get(1), 1); // 返回1，此时顺序：2(旧) ->1(最新)

  cache.put(3, 3); // 容量满，淘汰key=2
  assertEquals(cache.get(2), -1);

  assertEquals(cache.get(1), 1);
  assertEquals(cache.get(3), 3);

  cache.put(4, 4); // 淘汰key=1
  assertEquals(cache.get(1), -1);
  assertEquals(cache.get(3), 3);
  assertEquals(cache.get(4), 4);
  console.timeEnd('LRU执行耗时');
});

Deno.test('LRU 更新已存在的key', () => {
  const cache = new LRUCache(2);
  cache.put(1, 10);
  cache.put(1, 99);
  assertEquals(cache.get(1), 99);
});

Deno.test('构造函数传入小于等于0抛出异常', () => {
  assertThrows(() => new LRUCache(0), Error, '缓存容量不能小于0');
  assertThrows(() => new LRUCache(-5), Error, '缓存容量不能小于0');
});

Deno.test('get不存在的key返回 -1', () => {
  const cache = new LRUCache(3);
  assertEquals(cache.get(99), -1);
});
