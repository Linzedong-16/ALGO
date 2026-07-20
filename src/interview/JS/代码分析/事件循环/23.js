async function runAsync() {
  await promiseFunc();
  console.log('async');
  return 'async result';
}

async function promiseFunc() {
  return new Promise((resolve, reject) => {
    console.log('promise');
    reject('error666');
  });
}

runAsync().then((res) => console.log(res));

// promise
// Uncaught (in promise) error666

/// 因为 runAsync 没有对await的函数做错误捕获，后面会报错
