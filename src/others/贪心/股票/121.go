package main

import (
	"fmt"
)

// 待实现函数
func maxProfit(prices []int) int {
	leftPoint := 1 << 30
	res := 0

	for _, price := range prices {
		leftPoint = min(leftPoint, price)
		res = max(res, price - leftPoint)
	}
	return res
}



func main() {
	fmt.Println("开始测试")
	fmt.Printf("测试1: %d (预期5) 结果: %t\n", maxProfit([]int{7,1,5,3,6,4}), maxProfit([]int{7,1,5,3,6,4}) == 5)
	fmt.Printf("测试2: %d (预期0) 结果: %t\n", maxProfit([]int{7,6,4,3,1}), maxProfit([]int{7,6,4,3,1}) == 0)
	fmt.Printf("测试3: %d (预期2) 结果: %t\n", maxProfit([]int{2,4,1}), maxProfit([]int{2,4,1}) == 2)
	fmt.Printf("测试4: %d (预期0) 结果: %t\n", maxProfit([]int{1}), maxProfit([]int{1}) == 0)
	fmt.Printf("测试5: %d (预期4) 结果: %t\n", maxProfit([]int{3,2,6,5,0,3}), maxProfit([]int{3,2,6,5,0,3}) == 4)
	fmt.Println("测试结束")
}