Promise.resolve('A')
  .then((res) => {
    console.log('promise1', res);
  })
  .finally(() => {
    console.log('finally1');
  });

Promise.resolve('B')
  .finally(() => {
    console.log('finally2');
    return 'result';
  })
  .then((res) => {
    console.log('promise2', res);
  });

/**
 * .fianlly 源码类似：核心逻辑就是不管状态怎样，都同样执行，并且将 上有返回值 “透传”！！ 这点和 .then机制不一样
 * .then(
 *   val => { fn(); return val; }, // 强制返回上游原始值，丢弃fn的return
 *   err => { fn(); throw err; }
 *  )
 */

// 错误答案：没有理解 finally本质
// promise1 A
// finally2
// finally1
// promise2 result

// 正确答案：
// promise1 A
// finally2
// finally1
// promise2 B
