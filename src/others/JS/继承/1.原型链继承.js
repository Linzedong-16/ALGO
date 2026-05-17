import { Parent } from './Parent.js';

function Child() {}

// 构造函数的原型对象覆盖为 父类实例
Child.prototype = new Parent('Parent');

Deno.test('原型链继承', () => {
  console.time('耗时');
  const c = new Child();
  c.say();
  console.log(c.name);
  console.timeEnd('耗时');
});
