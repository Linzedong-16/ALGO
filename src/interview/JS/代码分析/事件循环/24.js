const promiseWrapper = () =>
  new Promise((resolve, reject) => {
    console.log('A');
    const p = new Promise((resolve, reject) => {
      console.log('B');
      setTimeout(() => {
        console.log('timer start');
        resolve('timer succeed');
        console.log('timer end');
      }, 0);
      resolve('inner succeed');
    });
    resolve('outer succeed');
    p.then((res) => {
      console.log(res);
    });
  });

promiseWrapper().then((res) => {
  console.log(res);
});
console.log(4);

/// 粗心大意：微任务队列先后搞反
// A
// B
// 4
// outer succeed
// inner succeed
// timer start
// timer end

// inner 先推送到微任务队列的
// inner succeed
// outer succeed
