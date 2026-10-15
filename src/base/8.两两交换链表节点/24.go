package main

import (
	"fmt"
)

// Definition for singly-linked list.
type ListNode struct {
	Val  int
	Next *ListNode
}

// 辅助函数：数组转链表
func createList(arr []int) *ListNode {
	if len(arr) == 0 {
		return nil
	}
	head := &ListNode{Val: arr[0]}
	cur := head
	for i := 1; i < len(arr); i++ {
		cur.Next = &ListNode{Val: arr[i]}
		cur = cur.Next
	}
	return head
}

// 辅助函数：链表转切片
func listToArray(head *ListNode) []int {
	var res []int
	for cur := head; cur != nil; cur = cur.Next {
		res = append(res, cur.Val)
	}
	return res
}

// 要求：两两交换相邻节点，且不能修改节点内部的值，只能进行节点交换
func swapPairs(head *ListNode) *ListNode {
	// 你的实现代码
	dummy := ListNode{}
	dummy.Next = head

	prev := &dummy
	curr := dummy.Next
	var last *ListNode

	for curr != nil && curr.Next != nil {
		last = curr.Next

		curr.Next = last.Next
		last.Next = curr
		prev.Next = last

		prev = curr
		curr = prev.Next
	}

	return dummy.Next
}

func main() {
	type testCase struct {
		name   string
		input  []int
		expect []int
	}

	cases := []testCase{
		{name: "示例 1", input: []int{1, 2, 3, 4}, expect: []int{2, 1, 4, 3}},
		{name: "示例 2", input: []int{}, expect: []int{}},
		{name: "示例 3", input: []int{1}, expect: []int{1}},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		got := swapPairs(createList(tc.input))
		gotArr := listToArray(got)

		// 简单的切片比较函数
		compare := func(a, b []int) bool {
			if len(a) != len(b) {
				return false
			}
			for i := range a {
				if a[i] != b[i] {
					return false
				}
			}
			return true
		}

		valid := compare(gotArr, tc.expect)

		if valid {
			fmt.Printf("PASS %s\n", tc.name)
			passed++
		} else {
			fmt.Printf("FAIL %s: input=%v, expect=%v, got=%v\n", tc.name, tc.input, tc.expect, gotArr)
			failed++
		}
	}

	fmt.Printf("\n结果：%d passed, %d failed\n", passed, failed)
}
