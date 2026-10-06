package main

import (
	"fmt"
	"math/rand"
)

// findKthLargest 快速选择算法实现
func findKthLargest(nums []int, k int) int {
	var left int = 0
	var right int = len(nums) - 1
	var targetIdx int = len(nums) - k
	for true {
		var mid int = partition(nums, left, right)

		if mid == targetIdx {
			return nums[targetIdx]
		} else if mid < targetIdx {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return -1
}

func partition(arr []int, left int, right int) int {
	pivotIdx := left + rand.Intn(right-left+1)
	pivotVal := arr[pivotIdx]

	// 基准值换位
	arr[left], arr[pivotIdx] = arr[pivotIdx], arr[left]

	i, j := left+1, right

	for true {
		for i <= j && arr[i] < pivotVal {
			i++
		}
		for i <= j && arr[j] > pivotVal {
			j--
		}

		if i >= j {
			break
		}
		arr[i], arr[j] = arr[j], arr[i]
		i++
		j--
	}
	// 基准值回归中心,目标位置为 j,i可能数组越界 j 所在的位置一定是小于小于等于基准值的，left位置也是小于基准值的，可交换
	arr[left], arr[j] = arr[j], arr[left]
	return j
}

// main 函数：直接运行并执行测试逻辑
func main() {
	// 定义测试用例（结构体切片）
	tests := []struct {
		nums []int
		k    int
		want int
	}{
		{[]int{3, 2, 1, 5, 6, 4}, 2, 5},          // 示例1
		{[]int{3, 2, 3, 1, 2, 4, 5, 5, 6}, 4, 4}, // 示例2
		{[]int{1}, 1, 1},                         // 单元素
		{[]int{1, 2, 3, 4, 5}, 3, 3},             // 升序数组
		{[]int{5, 4, 3, 2, 1}, 3, 3},             // 降序数组
		{[]int{7, 7, 7, 7}, 2, 7},                // 重复元素
	}

	// 遍历并执行测试
	fmt.Println("=== 开始测试 ===")
	passed := 0
	for i, tt := range tests {
		// 必须深拷贝数组，因为快速选择算法会修改原数组顺序
		numsCopy := make([]int, len(tt.nums))
		copy(numsCopy, tt.nums)

		got := findKthLargest(numsCopy, tt.k)
		if got == tt.want {
			fmt.Printf("测试用例 %d: 通过 ✅ (nums=%v, k=%d, 结果=%d)\n", i+1, tt.nums, tt.k, got)
			passed++
		} else {
			fmt.Printf("测试用例 %d: 失败 ❌ (nums=%v, k=%d, 期望=%d, 实际=%d)\n", i+1, tt.nums, tt.k, tt.want, got)
		}
	}
	fmt.Printf("=== 测试结束：共 %d 个，通过 %d 个 ===\n", len(tests), passed)
}
