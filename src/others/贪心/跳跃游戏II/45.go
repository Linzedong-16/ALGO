package main

import (
	"fmt"
)

// jump 是 LeetCode 45. 跳跃游戏 II 的空函数，你自己实现
func jump(nums []int) int {
	//  实现贪心算法求最小跳跃次数,前提：这个数组一定能抵达终点不会断
	step := 0
	eachStepEdge := 0
	maxJump := 0

	for i := 0; i <= len(nums)-2; i++ {
		if maxJump < nums[i]+i {
			maxJump = nums[i] + i
		}

		if i == eachStepEdge {
			step++
			eachStepEdge = maxJump
		}
	}
	return step
}

func main() {
	type testCase struct {
		name   string
		input  []int
		expect int
	}

	cases := []testCase{
		{name: "示例 1", input: []int{2, 3, 1, 1, 4}, expect: 2},
		{name: "示例 2", input: []int{2, 3, 0, 1, 4}, expect: 2},
		{name: "只有一个元素", input: []int{1}, expect: 0},
		{name: "两步到终点", input: []int{5, 9, 3, 2, 1, 0, 2, 3, 3, 1, 0, 0}, expect: 3},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		got := jump(tc.input)
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
