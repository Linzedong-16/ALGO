Promise.resolve()
  .then(() => {
    // 没有抛出，只是把Error对象当作正常的 对象处理，保证成Promise直接返回
    return new Error('error');
  })
  .then((res) => {
    console.log('then: ', res);
  })
  .catch((err) => {
    console.log('catch: ', err);
  });

// then: Error: error
