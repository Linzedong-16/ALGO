Promise.resolve('A')
  .then('B')
  .then(Promise.resolve('C'))
  //   .then(() => '被我中断了')
  .then(console.log);
// Promise.then() 的原理：接收回调函数或值，并返回新的Promise
// 具体规则：如果then回调传入的是 非函数类型，该值会被忽略，并且接收上一个Promise的值作为新的Promise 的值一并返回
// A
