function runAsync(num) {
  return new Promise((resolve) => setTimeout(() => resolve(num, console.log(num)), 1000));
}

function runReject(num) {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(`Error: ${num}`, console.log(num)), 1000 * num)
  );
}

Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then((res) => console.log('res', res))
  .catch((err) => console.log('err回调', err));

/// 一秒后
// 1
// 3
/// 第二秒后
// err回调 Error: 2
/// 因为 runReject(4) 要四秒，虽然Promise.all 已经在第二秒后因为 runReject(2) 结束，但 runReject(4)依旧会执行
// 4
