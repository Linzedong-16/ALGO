export class MinStack {
  private stack: number[];
  private minIdx: number | undefined;
  constructor() {
    this.stack = [];
  }

  push(x: number): void {
    if (this.minIdx === undefined || this.stack[this.minIdx] > x) {
      this.minIdx = this.stack.length;
    }
    this.stack.push(x);
  }

  pop(): void {
    this.stack.pop();
    if (this.minIdx !== this.stack.length) {
      return;
    }
    if (this.stack.length === 1) {
      this.minIdx = 0;
      return;
    }
    if (this.stack.length === 0) {
      this.minIdx = undefined;
      return;
    }
    if (this.stack.length === 2) {
      this.minIdx = this.stack[0] > this.stack[1] ? 1 : 0;
    }
    // 🤡 能过就行
    let num = this.stack[0];
    for (let i = 1; i < this.stack.length; i++) {
      if (num > this.stack[i]) {
        this.minIdx = i;
        num = this.stack[i];
      }
    }
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.stack[this.minIdx!];
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
