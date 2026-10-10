package main

import (
	"fmt"
)

// longestPalindrome 是 LeetCode 5. 最长回文子串的空函数，你自己实现
func longestPalindrome(s string) string {
	if len(s) <= 1 {
		return s
	}

	maxLen := 1
	start := 0
	palindrome := func(left int, right int) {
		for left >= 0 && right < len(s) && s[left] == s[right] {
			if right-left+1 > maxLen {
				maxLen = right - left + 1
				start = left
			}
			left--
			right++
		}
	}

	for i := 0; i < len(s); i++ {
		palindrome(i, i+1)
		palindrome(i-1, i+1)
	}
	return s[start : start+maxLen]
}

func main() {
	type testCase struct {
		name   string
		input  string
		expect string
	}

	cases := []testCase{
		{name: "示例 1", input: "babad", expect: "bab"},
		{name: "示例 2", input: "cbbd", expect: "bb"},
		{name: "单字符", input: "a", expect: "a"},
		{name: "两个不同字符", input: "ac", expect: "a"},
		{name: "全部相同字符", input: "ccc", expect: "ccc"},
		{name: "复杂回文", input: "aacabdkacaa", expect: "aca"},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		got := longestPalindrome(tc.input)

		// 注意：第一题的 expect 设为 "bab"，但 "aba" 也是对的，所以做个兼容判断
		valid := false
		if tc.name == "示例 1" {
			valid = (got == "bab" || got == "aba")
		} else {
			valid = (got == tc.expect)
		}

		if valid {
			fmt.Printf("PASS %s\n", tc.name)
			passed++
		} else {
			fmt.Printf("FAIL %s: input=%s, expect=%s, got=%s\n", tc.name, tc.input, tc.expect, got)
			failed++
		}
	}

	fmt.Printf("\n结果：%d passed, %d failed\n", passed, failed)
}
