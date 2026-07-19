const newPromise1 = new Promise((resolve, reject) => {
  console.log('A');
  resolve('B');
});
const newPromise2 = newPromise1.then((res) => {
  console.log(res);
});
console.log('C', newPromise1);
console.log('D', newPromise2); // promose1.then 的回调会返回一个新的Promise，且还未执行即 Pending

// A
// C Promise { 'B' }
// D Promise { <pending> }
// B
