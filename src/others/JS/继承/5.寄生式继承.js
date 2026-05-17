import { Parent } from './Parent.js';

// 其实就是原型式继承通过函数工厂增强了一点
function createChild(prototype) {
  const o = Object.create(prototype);
  o.name = '1';
  o.do = function () {
    console.log('do');
  };
  return o;
}

Deno.test('寄生式继承', () => {
  console.time('耗时');
  const c = createChild(Parent.prototype);
  c.do();
  c.say();
  console.log(c.name);
  console.timeEnd('耗时');
});
