/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  this.head = new ListNode();
  this.tail = new ListNode();
  this.cap = capacity;
  this.hashMap = new Map();

  // 形成闭环，防止边界冗余操作
  this.head.next = this.tail;
  this.tail.pre = this.head;
};
/**
 *
 * @param {ListNode} node
 */
LRUCache.prototype.moveToEnd = function (node) {
  this.removeNodeFromLinkList(node);
  this.addToEnd(node);
};

/**
 *
 * @param {ListNode} node
 */
LRUCache.prototype.removeNodeFromLinkList = function (node) {
  // 因为LRU缓存链表是闭环的，两个节点必然存在
  const preNode = node.pre;
  const nextNode = node.next;
  // 引用绕过 node, 不做除了LinkList以外操作
  preNode.next = nextNode;
  nextNode.pre = preNode;
};

/**
 *
 * @param {ListNode} node
 */
LRUCache.prototype.addToEnd = function (node) {
  // 尾节点指向 node
  this.tail.pre.next = node;
  node.pre = this.tail.pre;
  // 更新尾虚拟节点指向
  this.tail.pre = node;
  node.next = this.tail;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.hashMap.get(key);
  if (!node) {
    return -1;
  }
  this.moveToEnd(node);
  return node.val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const node = this.hashMap.get(key);
  if (node) {
    node.val = value;
    this.moveToEnd(node);
  } else {
    const curr = new ListNode(key, value);

    // 缓存已满，先删除旧数据
    if (this.cap === this.hashMap.size) {
      // ❌：先把头节点从链表删除了，再删除哈希表中原头节点的下一个节点删除，导致映射依赖混乱
      //   this.removeNodeFromLinkList(this.head.next);
      //   this.hashMap.delete(this.head.next.key);
      const oldNode = this.head.next;
      this.removeNodeFromLinkList(oldNode);
      this.hashMap.delete(oldNode.key);
    }
    this.addToEnd(curr);
    this.hashMap.set(key, curr);
  }
};

/**
 * @param {number | undefined} key
 * @param {number | undefined} val
 * @param {ListNode | null} pre
 * @param {ListNode | null} next
 */
function ListNode(key, val, pre = null, next = null) {
  this.key = key;
  this.val = val;
  this.pre = pre;
  this.next = next;
}

/**
 * 注意事项：边界处理、虚拟节点、辅助函数解耦、权责分明
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
