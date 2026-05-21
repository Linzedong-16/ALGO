function p() {
  return this.host;
}

p.host = ['h1'];
p.prototype.host = ['h2'];
/**
 * new 构造时，优先按照构造函数的返回值处理（实际上就是返回了原型链上的['h2']）
 */
const p1 = new p();

/**
 * 普通调用时，this指向全局作用域的window对象
 */
// const p2 = p();

console.log(p1.host); // 不是['h2]，而是undefined
console.log(p1); // 直接等于 ['h2']
// console.log(p2.host); // this指向 window，undefined,报错的
