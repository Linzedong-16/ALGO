const promise = Promise.resolve().then(() => {
  return promise;
});
promise.catch(console.err);

// Promise 设计规范 - 如果返回值是 promise自身，直接报错，提示有循环调用问题
// [TypeError: Chaining cycle detected for promise #<Promise>]

// 需要注意的是，可以利用Promise 结合V8的事件循环机制，实现一些无限异步递归调用的方法，面试常考
// const loop = () => Promise.resolve().then(() => loop);
