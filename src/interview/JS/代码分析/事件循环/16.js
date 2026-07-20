function runAsync(num) {
  return new Promise((resolve) => setTimeout(() => resolve(num, console.log(num)), 1000));
}

Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then((res) => console.log('res: ', res))
  .catch((err) => console.log(err));
/// 错误答案
// res: 1

// 完整答案：
// 1
// res: 1
// 2
// 3

/**
 * race是不管其他运行的函数了，而不是把其他函数销毁了
 */
