package main

import (
	"fmt"
)

func isValid(s string) bool {
	// 你的实现代码
	mapper := make(map[rune]rune)
	mapper['('] = ')'
	mapper['['] = ']'
	mapper['{'] = '}'
	stack := []rune{}
	for _, ch := range s {
		if _, ok := mapper[ch]; ok {
			stack = append(stack, mapper[ch])
		} else {
			if len(stack) == 0 {
				return false
			}
			if stack[len(stack)-1] == ch {
				stack = stack[:len(stack)-1]
			} else {
				return false
			}
		}
	}
	return len(stack) == 0
}

func main() {
	// 1. 定义 testCase 结构体
	type testCase struct {
		name   string
		input  string
		expect bool
	}

	// 2. 准备测试用例
	cases := []testCase{
		{name: "示例 1", input: "()", expect: true},
		{name: "示例 2", input: "()[]{}", expect: true},
		{name: "示例 3", input: "(]", expect: false},
		{name: "示例 4", input: "]", expect: false},
		{name: "空字符串", input: "", expect: true},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		got := isValid(tc.input)
		valid := got == tc.expect

		if valid {
			fmt.Printf("PASS %s\n", tc.name)
			passed++
		} else {
			fmt.Printf("FAIL %s: input=%q, expect=%v, got=%v\n", tc.name, tc.input, tc.expect, got)
			failed++
		}
	}

	fmt.Printf("\n结果：%d passed, %d failed\n", passed, failed)
}
