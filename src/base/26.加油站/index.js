/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
function canCompleteCircuit(gas, cost) {
  let totalGas = 0;
  let totalCost = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
  }
  // 总开支更大一定没有
  if (totalCost > totalGas) {
    return -1;
  }

  let tank = gas[0];
  let start = 0;
  // 贪心算法核心：
  for (let i = 0; i < gas.length - 1; i++) {
    tank -= cost[i]; // 去下一个加油站
    if (tank < 0) {
      // 如果到了这一步，说明之前的所有点到 i + 1的加油站都走不通，这些点全部一定不能当作起点
      tank = gas[i + 1]; // 从下一个加油站开始
      start = i + 1;
    } else {
      tank += gas[i + 1];
    }
  }
  return start;
}

Deno.test('加油站环游问题', () => {
  console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
});
