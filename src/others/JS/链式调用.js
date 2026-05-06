/**
 *
 * @param {number} ms
 * @returns {Promise}
 */
function delay(ms) {
  let timer = null;
  return new Promise((resolve) => {
    timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, ms);
  });
}

/**
 * 打印函数
 */
function printHello() {
  console.log('hello');
  delay(3000).then(() => printHello());
}
printHello();
