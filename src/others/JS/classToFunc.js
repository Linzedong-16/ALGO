// 完美的ES6 class 转 构造函数
// class Person {
//   constructor(name) {
//     this.name = name;
//   }
//   sayHi() {
//     console.log('hi', this.name);
//   }
// }

function Person(name) {
  'use strict';
  if (new.target === undefined) {
    throw TypeError("Class constructor Person cannot be invoked without 'new'");
  }
  this.name = name;
}

Object.defineProperty(Person.prototype, 'sayHi', {
  value: function () {
    'use strict';
    if (new.target) {
      throw TypeError('sayHi is not a constructor');
    }
    console.log('hi', this.name);
  },
  enumerable: false,
  writable: true,
  configurable: true
});

Deno.test('完美的ES6 class 转 构造函数', () => {
  console.time('耗时');
  const p = new Person();
  //   Person(); 无法直接使用
  //   new Person.prototype.sayHi();
  for (const k in p) {
    console.log(k);
  }
  console.timeEnd('耗时');
});
