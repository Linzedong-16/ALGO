package main

import (
	"fmt"
)

// partitionLabels 是 LeetCode 763. 划分字母区间的空函数，你自己实现
func partitionLabels(s string) []int {
	var char [26]int

	for i := 0; i < len(s); i++ {
		char[int(s[i])-97] = i
	}
	var res []int
	start, end := 0, 0
	for i := 0; i < len(s); i++ {
		if end < char[int(s[i])-97] {
			end = char[int(s[i])-97]
		}

		if i == end {
			res = append(res, end-start+1)
			start = i + 1
		}
	}

	return res
}

func main() {
	type testCase struct {
		name   string
		input  string
		expect []int
	}

	cases := []testCase{
		{name: "示例 1", input: "ababcbacadefegdehijhklij", expect: []int{9, 7, 8}},
		{name: "示例 2", input: "eccbbbbdec", expect: []int{10}},
		{name: "每个字母独立", input: "abc", expect: []int{1, 1, 1}},
		{name: "全部相同字母", input: "aaaaa", expect: []int{5}},
		{name: "单个字母", input: "a", expect: []int{1}},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		got := partitionLabels(tc.input)
		// 切片比较（需逐个元素判断）
		if len(got) == len(tc.expect) {
			match := true
			for i := range got {
				if got[i] != tc.expect[i] {
					match = false
					break
				}
			}
			if match {
				fmt.Printf("PASS %s\n", tc.name)
				passed++
			} else {
				fmt.Printf("FAIL %s: input=%s, expect=%v, got=%v\n", tc.name, tc.input, tc.expect, got)
				failed++
			}
		} else {
			fmt.Printf("FAIL %s: input=%s, expect=%v, got=%v (长度不匹配)\n", tc.name, tc.input, tc.expect, got)
			failed++
		}
	}

	fmt.Printf("\n结果：%d passed, %d failed\n", passed, failed)
}
