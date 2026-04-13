/* eslint-disable @typescript-eslint/no-unused-vars */
// PDD 4.12 败北
// import { assertEquals } from '@std/assert';
// deno-lint-ignore-file

// eslint-disable-next-line no-var
var name = 'window'; // 浏览器环境下，name自动挂载到 window上
const p = {
  name: 'linzex',
  s1: function () {
    console.log(this.name);
  },
  s2: () => {
    // 浏览器环境this指向window
    console.log(this.name);
  }
};
p.s1(); // 普通函数，this指向取决于 调用者p -> linzex
p.s2(); // 箭头函数，this指向取决于 上下文作用域（字面量声明的p的{}不是作用域），根据作用域链查找到 全局的 name -> linzex

// 2

const obj = {
  name: 'OBJ',
  method: function () {
    // 动态找this，被字面量声明的对象 obj调用，this动态指向obj
    console.log(this.name); // OBJ

    const say = () => {
      // 箭头函数没有this，this 从外层作用域继承，外层作用域是函数作用域，所以this指向 obj
      // 这里不是指向 全局对象，而是指向 obj 对象，区别于 person 对象，两者的箭头函数位置不一样
      console.log(this.name); // OBJ
    };
    say();
  }
};

obj.method();
/**
 * 控制台输出：
 * OBJ
 * OBJ
 */

// 3

const timer = {
  second: 0,
  start() {
    setTimeout(function () {
      // this 只能被 该function捕获，并且开启默认模式即 this指向全局window
      console.log(this.second++); // undefined++ === NaN
    }, 1000);
    // 修改方式1：使用箭头函数 this被外层 start 的函数作用域捕获 start 又被 timer 调用 this指向 timer对象
    setTimeout(() => {
      console.log(this.second++); // 0
    }, 1000);
    // 修改方式2：使用bind()方法
    setTimeout(
      function () {
        console.log(this.second++); // 1
      }.bind(this), // 与上一个同理，把start的this绑定到function中强行改变this指向
      1000
    );
  }
};
timer.start(); // this 没有指向 timer 对象，而是指向 全局对象

// 优先级规则: new 绑定 > 显式绑定 (bind) > 隐式绑定 > 默认绑定。箭头函数的 this 不参与这个优先级比较，因为它在定义时就已固定。
// bind 的硬绑定: bind 创建的新函数，其 this 无法被后续的 call 或 apply 修改（但 new 依然可以覆盖 bind 的绑定）。
// 回调函数中的 this 丢失: 在 setTimeout, 事件监听器等场景中，回调函数通常作为独立函数被调用，会触发默认绑定规则。这是箭头函数 或 .bind(this) 最常见的应用场景。
// 严格模式的影响: 在严格模式下，默认绑定的 this 是 undefined 而不是全局对象，这有助于提早发现错误。

/**
 * 1. new 绑定: 当函数被 new 关键字调用时，this 指向新创建的对象
 * 2. 显式绑定 (bind): 当函数被 call, apply 或 bind 方法调用时，this 指向指定的对象
 * 3. 隐式绑定: 当函数被当作对象的方法调用时，this 指向该对象
 * 4. 默认绑定: 当函数没有被调用时，只是普通执行 时，this 指向全局对象
 */
