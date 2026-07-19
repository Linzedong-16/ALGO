const promise = new Promise((resolve, reject) => {
  // 只认准第一个
  resolve('succeed1');
  reject('error');
  resolve('succeed2');
});
promise
  .then((res) => {
    console.log('then: ', res);
  })
  .catch((err) => {
    console.log('catch: ', err);
  });

// then: succeed1
