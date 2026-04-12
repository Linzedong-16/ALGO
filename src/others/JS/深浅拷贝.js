// 浅拷贝
// 1. ES6扩展运算符
// 2. Object.assign({}, origin);

// 深拷贝

// 1. structuredClone
const origin = {
  a: 1,
  b: '1',
  c: new Date(),
  d: {
    f: '1'
  }
};

function deepCopy1(obj, hash = new WeakMap()) {
  // 基本数据类型直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  // 有缓存的对象复用（循环引用问题）
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 初始化拷贝
  const copyObj = Array.isArray(obj) ? [] : {};
  // 目标对象的对象为键，拷贝对象为值
  hash.set(obj, copyObj);

  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      copyObj[k] = deepCopy1(obj[k], hash);
    }
  }
  return copyObj;
}

import { assertEquals } from '@std/assert';
Deno.test('深浅拷贝', () => {
  const deepClone = deepCopy1(origin);
  deepClone.d.f = 0;
  console.log(origin);
});
