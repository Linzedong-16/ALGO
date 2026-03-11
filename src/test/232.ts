class MyQueue {
  private FE: InnerStack;
  private BE: InnerStack;
  constructor() {
    this.FE = new InnerStack();
    this.BE = new InnerStack();
  }
  addToFE() {
    if (this.FE.length === 0) {
      // 先入前栈
      while (this.BE.length !== 0) {
        this.FE.push(this.BE.pop()!);
      }
    }
  }

  push(x: number): void {
    this.BE.push(x);
  }

  pop(): number | null {
    this.addToFE();
    return this.FE.pop();
  }

  peek(): number | null {
    this.addToFE();
    return this.FE.peak();
  }

  empty(): boolean {
    return this.BE.length + this.FE.length === 0;
  }
}
class InnerStack {
  private stack: number[] = [];

  get length() {
    return this.stack.length;
  }

  push(x: number) {
    this.stack.push(x);
  }

  pop(): number | null {
    return this.stack.pop() || null;
  }

  peak(): number | null {
    return this.stack[this.stack.length - 1] || null;
  }
}
/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

Deno.test('测试双栈队列', () => {
  const queue = new MyQueue();

  queue.push(1);
  queue.push(2);
  queue.push(3);
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
});
