// 计算器
class calculator {
  constructor() {
    this.value = 0;
  }

  add(x) {
    this.value += x;
    return this;
  }

  subtract(x) {
    this.value -= x;
    return this;
  }

  multiply(x) {
    this.value *= x;
    return this;
  }

  getResult() {
    return this.value;
  }
}

import { assertEquals } from '@std/assert';
Deno.test('计算器', () => {
  const c = new calculator();
  assertEquals(c.add(10).subtract(3).multiply(2).getResult(), 14);
});

// AsyncRequest 链式 + Promise
class AsyncRequest {}

// TODO: JQuery链式调用
