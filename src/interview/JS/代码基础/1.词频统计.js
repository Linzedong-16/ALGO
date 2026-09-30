const str = 'sadwqfwqfqjibonbvsibq';

/// 1. 用扩展运算符 + reduce函数迭代计数
const res = [...str].reduce((obj, key) => {
  if (!obj[key]) {
    obj[key] = 1;
  } else {
    obj[key]++;
  }
  return obj;
}, {});

/// 2. 用 || 惰性求值进一步化简：undefined++ 会变成 NaN
const res2 = [...str].reduce((obj, key) => {
  obj[key]++ || (obj[key] = 1);
  return obj;
}, {});

/// 3. 逗号表达式最终精简版,逗号表达式只返回最后一个值
const res3 = [...str].reduce((obj, key) => (obj[key]++ || (obj[key] = 1), obj), {});
console.log(res);
console.log(res2);
console.log(res3);
