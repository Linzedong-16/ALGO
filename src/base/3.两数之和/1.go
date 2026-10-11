package main

import "fmt"

func twoSum(nums []int, target int) []int {
	mapper := make(map[int]int)

	for i := range len(nums) {
		complement := target - nums[i]

		if idx, ok := mapper[complement]; ok {
			return []int{idx, i}
		} else {
			mapper[nums[i]] = i
		}
	}

	return []int{}
}

func main() {
	type testCase struct {
		name   string
		nums   []int
		target int
		expect []int
	}

	cases := []testCase{
		{name: "示例 1", nums: []int{2, 7, 11, 15}, target: 9, expect: []int{0, 1}},
		{name: "示例 2", nums: []int{3, 2, 4}, target: 6, expect: []int{1, 2}},
		{name: "示例 3", nums: []int{3, 3}, target: 6, expect: []int{0, 1}},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		got := twoSum(tc.nums, tc.target)

		// 一维切片比较
		valid := len(got) == len(tc.expect)
		if valid {
			for i := 0; i < len(got); i++ {
				if got[i] != tc.expect[i] {
					valid = false
					break
				}
			}
		}

		if valid {
			fmt.Printf("PASS %s\n", tc.name)
			passed++
		} else {
			fmt.Printf("FAIL %s: nums=%v, target=%d, expect=%v, got=%v\n", tc.name, tc.nums, tc.target, tc.expect, got)
			failed++
		}
	}

	fmt.Printf("\n结果：%d passed, %d failed\n", passed, failed)
}
