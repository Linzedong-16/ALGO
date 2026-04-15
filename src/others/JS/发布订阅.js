class EventEmitter {
  constructor() {
    /**
     * 事件总线
     * @type {Object<string, Function[]>}
     */
    this.eventBus = {};
  }
  /**
   * 订阅事件
   * @param {string} eventType - 事件类型
   * @param {Function} handler - 事件处理函数
   */
  subscribe(eventType, handler) {
    // 没有事件需要初始化 数组
    if (!this.eventBus[eventType]) {
      this.eventBus[eventType] = [handler];
    } else {
      this.eventBus[eventType].push(handler);
    }
  }
  /**
   * 取消订阅事件
   * @param {string} eventType - 事件类型
   * @param {Function} handler - 事件处理函数
   */
  unsubscribe(eventType, handler) {
    // 是否有该事件
    if (!this.eventBus[eventType]) {
      return;
    }

    const idx = this.eventBus[eventType].indexOf(handler);
    if (idx !== -1) {
      this.eventBus[eventType].splice(idx, 1);
    }
  }

  /**
   * 发布事件
   * @param {string} eventType - 事件类型
   * @param {...*} args - 事件参数
   */
  publish(eventType, ...args) {
    // 有没有事件
    if (!this.eventBus[eventType]) {
      return;
    }
    // fix: 防止执行过程中有新的事件订阅 创建副本保证副本的执行函数不变
    const handlers = [...this.eventBus[eventType]];

    handlers.forEach((handler) => {
      try {
        handler.apply(null, args);
      } catch (error) {
        console.error(`${eventType}事件执行错误`);
      }
    });
  }
}

import { assertEquals } from '@std/assert';
Deno.test('发布订阅', () => {
  console.time('耗时');
  console.log('--- 初始化 ---');
  const emitter = new EventEmitter();

  // 定义几个测试函数
  const fn1 = (msg) => console.log('🔵 监听者1:', msg);
  const fn2 = (msg) => console.log('🟢 监听者2:', msg);
  const fn3 = (msg) => console.log('🔴 监听者3 (会报错):', msg);
  const fnError = () => {
    throw new Error('故意报错');
  };

  console.log('\n--- 测试 1: 基础订阅与发布 ---');
  emitter.subscribe('click', fn1);
  emitter.subscribe('click', fn2);
  emitter.publish('click', 'Hello World');
  // 预期输出: 蓝色1, 绿色2

  console.log('\n--- 测试 2: 参数透传 ---');
  emitter.subscribe('login', (user, time) => {
    console.log(`用户 ${user} 在 ${time} 登录`);
  });
  emitter.publish('login', '张三', '10:00');

  console.log('\n--- 测试 3: 取消订阅 ---');
  emitter.unsubscribe('click', fn1);
  emitter.publish('click', 'fn1 应该消失了');
  // 预期输出: 只有 绿色2 (fn1 已移除)

  console.log('\n--- 测试 4: 错误隔离 ---');
  emitter.subscribe('errorTest', fn3);
  emitter.subscribe('errorTest', fnError); // 这个会报错
  emitter.subscribe('errorTest', fn2);
  emitter.publish('errorTest', '测试错误隔离');
  // 预期输出: 红色3 -> 报错信息 -> 绿色2
  // (证明 fnError 没有阻断后续 fn2 的执行)

  console.log('\n--- 测试 5: 遍历时订阅 (验证 [...array] 修复) ---');
  const fnSelfDestroy = () => {
    console.log('我是 fnSelfDestroy，我要自杀 (取消订阅自己)');
    emitter.unsubscribe('danger', fnSelfDestroy);
    // 同时我还想加一个新监听者
    emitter.subscribe('danger', () => console.log('我是被临时加进来的'));
  };
  emitter.subscribe('danger', fn1);
  emitter.subscribe('danger', fnSelfDestroy);
  emitter.subscribe('danger', fn2);

  console.log('发布 danger 事件 (此时数组长度会变化)...');
  emitter.publish('danger');

  console.timeEnd('耗时');
});
