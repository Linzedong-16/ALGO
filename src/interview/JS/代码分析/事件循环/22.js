async function runAsync() {
  console.log('async start');
  await asyncFunc();
  console.log('async end');
}

async function asyncFunc() {
  console.log('do something');
}

console.log('main start');
setTimeout(function () {
  console.log('timer');
}, 0);
runAsync();
new Promise((resolve) => {
  console.log('promise');
  resolve();
}).then(function () {
  console.log('promise then');
});
console.log('main end');

// main start
// async start
// do something
// promise
// main end
// async end
// promise then
// timer
