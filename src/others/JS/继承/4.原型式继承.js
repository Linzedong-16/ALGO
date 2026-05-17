import { Parent } from './Parent.js';
// 用父类的原型对象创建新实例
const child = Object.create(Parent.prototype);

Deno.test('组合式继承', () => {
  console.time('耗时');
  child.name = 'aaa';
  child.say();
  console.log(child);
  console.timeEnd('耗时');
});
