/** 普通闭包 */
function gen() {
  let n = 1;
  return function () {
    if (n % 2 === 0) {
      console.log(2);
    } else {
      console.log(1);
    }
    n++;
  };
}

let foo = gen();

foo();
foo();
foo();
foo();

foo = null;

/** 迭代器方法 */
function* gen2() {
  let n = 1;
  while (true) {
    if (n % 2 !== 0) {
      yield 1;
    } else {
      yield 2;
    }
    n++;
  }
}

const func = () => {
  const g = gen2();
  return () => {
    console.log(g.next().value);
  };
};

let foo2 = func();

foo2();
foo2();
foo2();

foo2 = null;
