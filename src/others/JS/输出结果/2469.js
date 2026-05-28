Deno.test('测试-then方法的细节', () => {
  // 关键：then方法接收 非函数值时，会忽略该值并返回新的 包装了上一个 Promise值的新Promise，这个机制可认为，避免错误回调影响了数据处理传递
  // 保证链式回调的 Promise结果被正确消费
  Promise.resolve('A').then('B').then(Promise.resolve('C')).then(console.log);
});
