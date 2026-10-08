package main

import (
	"fmt"
)

// canJump 是 LeetCode 55. 跳跃游戏的空函数，你自己实现
func canJump(nums []int) bool {
	step := len(nums) - 1

	for i := len(nums) - 2; i >= 0; i-- {
		if i+nums[i] >= step {
			step = i
		}
	}
	return step == 0
}

func main() {
	type testCase struct {
		name   string
		input  []int
		expect bool
	}

	cases := []testCase{
		{name: "示例 1", input: []int{2, 3, 1, 1, 4}, expect: true},
		{name: "示例 2", input: []int{3, 2, 1, 0, 4}, expect: false},
		{name: "只有一个元素", input: []int{1}, expect: true},
		{name: "全为 0", input: []int{0}, expect: true},
		{name: "中间被挡住", input: []int{1, 0, 1, 0}, expect: false},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		got := canJump(tc.input)
		if got == tc.expect {
			fmt.Printf("PASS %s\n", tc.name)
			passed++
		} else {
			fmt.Printf("FAIL %s: input=%v, expect=%v, got=%v\n", tc.name, tc.input, tc.expect, got)
			failed++
		}
	}

	fmt.Printf("\n结果：%d passed, %d failed\n", passed, failed)
}
