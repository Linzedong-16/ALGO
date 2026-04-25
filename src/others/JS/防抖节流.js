// /**
//  *
//  * @param {Function} callback
//  * @param {number} delay
//  */
// function debounce(callback, delay) {
//   let timer = null; // 定时器的闭包变量
//   // 剩余参数数组args(数组)
//   return function (...args) {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       callback.apply(this, args); // 第二个参数是数组
//     }, delay);
//   };
// }

// /**
//  * 节流函数用于优化频繁出发的操作，滚动条、事件监听等
//  * @param {Function} callback
//  * @param {number} interval
//  */
// function throttle(callback, interval) {
//   let lastTime = 0;
//   return function (...args) {
//     const now = Date.now();
//     if (now - lastTime >= interval) {
//       callback.apply(this, args);
//       lastTime = now;
//     }
//   };
// }

// function debounce(callback, delay) {
//   let timer = null;
//   return function (...args) {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       // callback.call(this, args);
//       callback.apply(this, args); // apply才传递数组的！！！！！！！！！！
//     }, delay);
//   };
// }

// function throttle(callback, interval) {
//   let last = 0;
//   return function (...args) {
//     const now = Date.now();
//     if (now - last >= interval) {
//       callback.apply(this, args);
//       last = now;
//     }
//   };
// }

/**
 *
 * @param {Function} callback
 * @param {number} delay
 * @returns {Function}
 */
function debounce(callback, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

/**
 *
 * @param {Function} callback
 * @param {number} interval
 * @returns {Function}
 */
function throttle(callback, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      callback.apply(this, args);
      lastTime = now;
    }
  };
}

// import { assertEquals } from '@std/assert';
Deno.test('防抖测试 - 仅最后一次生效', async () => {
  let count = 0;
  const fn = debounce(() => count++, 100);

  fn();
  fn();
  fn(); // 连续调用3次
  await new Promise((resolve) => setTimeout(resolve, 150)); // 等待150ms

  if (count !== 1) {
    throw new Error(`防抖测试失败，期望执行1次，实际执行${count}次`);
  }
  console.log('防抖测试通过 ✅');
});

Deno.test('节流测试 - 间隔内仅一次生效', async () => {
  let count = 0;
  const fn = throttle(() => count++, 100);

  fn();
  fn();
  fn(); // 连续调用3次
  await new Promise((resolve) => setTimeout(resolve, 50)); // 等待50ms
  fn(); // 间隔内再次调用

  if (count !== 1) {
    throw new Error(`节流测试失败，期望执行1次，实际执行${count}次`);
  }
  console.log('节流测试通过 ✅');
});
