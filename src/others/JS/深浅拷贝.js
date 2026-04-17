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

// 1刷
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

// 2刷
function deepClone2(obj, hash = new WeakMap()) {
  // 基本数据类型 和 Function 直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 是不是循环引用的
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 创建副本：对象 Or 数组
  const copyObj = Array.isArray(obj) ? [] : {};

  // 缓存副本引用: k: 原始对象 v: 副本对象
  hash.set(obj, copyObj);

  for (const key in obj) {
    // for in 循环要避免检查原型对象的属性
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 防止obj 对象上有同名 属性hasOwnProperty
      copyObj[key] = deepClone2(obj[key], hash);
    }
  }
  return copyObj;
}

// 3刷
function deepCloneIII(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 循环引用问题
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // ❌: 未判断数组还是对象
  const copyObj = Array.isArray(obj) ? [] : {};

  // ❌：未存储到hash
  hash.set(obj, copyObj);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // ❌：没有给递归函数传递hash，导致hash重复创建
      copyObj[key] = deepCloneIII(obj[key], hash);
    }
  }

  return copyObj;
}

import { assertEquals } from '@std/assert';
Deno.test('深浅拷贝', () => {
  const deepClone = deepCloneIII(origin);
  deepClone.d.f = 0;
  console.log(origin);
});
