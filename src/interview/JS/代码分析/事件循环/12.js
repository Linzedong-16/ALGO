Promise.reject('error')
  .then(
    (res) => {
      console.log('succeed', res);
    },
    (err) => {
      console.log('innerError', err);
    }
  )
  .catch((err) => {
    console.log('catch', err);
  });

// catch回调是基于 then的语法糖，类似 .then(undefined, (err) => {}) 也就是没有那么多弯弯绕绕的问题，谁在前谁就先捕获
// innerError error
