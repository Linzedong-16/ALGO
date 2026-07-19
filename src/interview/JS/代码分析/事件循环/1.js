const myPromise = new Promise((resolve, reject) => {
  console.log('A');
  console.log('B');
});

myPromise.then(() => {
  console.log('C');
});

console.log('D');

// A
// B
// D
