package main

import (
	"fmt"
	"sort"
)

func threeSum(nums []int) [][]int {
	sort.Ints(nums)
	// 你的实现代码
	var result [][]int

	for i := 0; i < len(nums)-2; i++ {
		if i != 0 && nums[i] == nums[i-1] {
			continue
		}

		left, right := i+1, len(nums)-1

		for left < right {
			sum := nums[i] + nums[left] + nums[right]

			if sum == 0 {
				result = append(result, []int{nums[i], nums[left], nums[right]})
				for left < right && nums[left] == nums[left+1] {
					left++
				}
				left++

				for left < right && nums[right] == nums[right-1] {
					right--
				}
				right--
			} else if sum > 0 {
				for left < right && nums[right] == nums[right-1] {
					right--
				}
				right--
			} else {
				for left < right && nums[left] == nums[left+1] {
					left++
				}
				left++
			}
		}
	}
	return result
}

func main() {
	// 1. 定义 testCase 结构体
	type testCase struct {
		name   string
		input  []int
		expect [][]int
	}

	// 2. 准备测试用例
	cases := []testCase{
		{name: "示例 1", input: []int{-1, 0, 1, 2, -1, -4}, expect: [][]int{{-1, -1, 2}, {-1, 0, 1}}},
		{name: "示例 2", input: []int{0, 1, 1}, expect: [][]int{}},
		{name: "示例 3", input: []int{0, 0, 0}, expect: [][]int{{0, 0, 0}}},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		got := threeSum(tc.input)

		// 3. 简单的切片比较函数
		compare2D := func(a, b [][]int) bool {
			if len(a) != len(b) {
				return false
			}
			for i := range a {
				if len(a[i]) != len(b[i]) {
					return false
				}
				for j := range a[i] {
					if a[i][j] != b[i][j] {
						return false
					}
				}
			}
			return true
		}

		// 4. 执行判断与打印
		valid := compare2D(got, tc.expect)

		if valid {
			fmt.Printf("PASS %s\n", tc.name)
			passed++
		} else {
			fmt.Printf("FAIL %s: input=%v, expect=%v, got=%v\n", tc.name, tc.input, tc.expect, got)
			failed++
		}
	}

	fmt.Printf("\n结果：%d passed, %d failed\n", passed, failed)
}
