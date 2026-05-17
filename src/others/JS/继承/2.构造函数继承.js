import { Parent } from './Parent.js';

function Child(name) {
  Parent.call(this, name);
}

Deno.test('构造函数继承', () => {
  console.time('耗时');
  const c = new Child('Parent');
  //   c.say(); 原型链上的方法无法继承，这里会报错
  console.log(c.name);
  console.timeEnd('耗时');
});
