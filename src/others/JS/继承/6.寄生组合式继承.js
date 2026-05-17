import { Parent } from './Parent.js';

// 综合优劣吧
function Child(name) {
  Parent.call(this, name);
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Deno.test('寄生组合式继承', () => {
  console.time('耗时');
  const c = new Child('Parent');
  c.say();
  console.log(c.name);
  console.timeEnd('耗时');
});
