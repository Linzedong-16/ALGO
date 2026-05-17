// 父类
export function Parent(name) {
  this.name = name;
  this.arr = [1, 2, 3]; // 引用类型属性
}
Parent.prototype.say = function () {
  console.log('我是父类方法');
};
