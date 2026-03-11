/**
 * 注：原题要求没有关于任何取出元素的操作，可以随意处置'无用'数据
 */
class ProductOfNumbers {
  private nums: number[]; // 1是初始前缀，理论上不是k包含的数据
  constructor() {
    this.nums = [1];
  }

  add(num: number): void {
    if (num === 0) {
      this.nums = [1];
    } else {
      this.nums.push(this.nums[this.nums.length - 1] * num);
    }
  }

  getProduct(k: number): number {
    if (k >= this.nums.length) {
      // k === this.nums.length 说明要取的数包括了前缀“1”，因此必然是0
      return 0;
    } else {
      return this.nums[this.nums.length - 1] / this.nums[this.nums.length - 1 - k];
    }
  }
}

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * var obj = new ProductOfNumbers()
 * obj.add(num)
 * var param_2 = obj.getProduct(k)
 */
import { assertEquals } from '@std/assert';
Deno.test('测试最后k个数乘积', () => {
  const productOfNumbers = new ProductOfNumbers();
  productOfNumbers.add(3); // [3]
  productOfNumbers.add(0); // [3,0]
  productOfNumbers.add(2); // [3,0,2]
  productOfNumbers.add(5); // [3,0,2,5]
  productOfNumbers.add(4); // [3,0,2,5,4]
  assertEquals(productOfNumbers.getProduct(2), 20); // 返回 20 。最后 2 个数字的乘积是 5 * 4 = 20
  // 实际上的数组：[1,2,5,4] len = 4, k = 3
  assertEquals(productOfNumbers.getProduct(3), 40); // 返回 40 。最后 3 个数字的乘积是 2 * 5 * 4 = 40
  assertEquals(productOfNumbers.getProduct(4), 0); // 返回  0 。最后 4 个数字的乘积是 0 * 2 * 5 * 4 = 0
  productOfNumbers.add(8); // [3,0,2,5,4,8]
  assertEquals(productOfNumbers.getProduct(2), 32); // 返回 32 。最后 2 个数字的乘积是 4 * 8 = 32
});
