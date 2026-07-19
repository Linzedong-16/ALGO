const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});
const promise2 = promise1.then(() => {
  throw new Error('error');
});
console.log('promise1', promise1);
console.log('promise2', promise2);
setTimeout(() => {
  console.log('innerPromise1', promise1);
  console.log('innerPromise2', promise2);
}, 2000);

// promise1 Promise { <pending> }
// promise2 Promise { <pending> }

// 浏览器报错 nodejs报错并终止进程

// innerPromise1 Promise { 'success }
// innerPromise2 Promise {<rejected>: Error: error}
