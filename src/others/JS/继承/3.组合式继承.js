import { Parent } from './Parent.js';
// 将 1与2 继承方式组合
function Child(name) {
  // 1. 先构造函数继承属性
  Parent.call(this, name);
}

// 2. 原型链继承
Child.prototype = new Parent('lin');

Deno.test('组合式继承', () => {
  console.time('耗时');
  const c = new Child('Parent');
  // 不报错，因为用原型链继承弥补了
  c.say();
  console.log(c.name);
  console.timeEnd('耗时');
});
