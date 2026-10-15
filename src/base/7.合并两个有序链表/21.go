package main

import (
	"fmt"
)

// 链表节点定义
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

// 辅助函数：链表转切片（便于比较）
func listToArray(head *ListNode) []int {
	var res []int
	for cur := head; cur != nil; cur = cur.Next {
		res = append(res, cur.Val)
	}
	return res
}

func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
	dummy := ListNode{}
	curr := &dummy

	for list1 != nil && list2 != nil {
		if list1.Val >= list2.Val {
			curr.Next = list2
			list2 = list2.Next
		} else {
			curr.Next = list1
			list1 = list1.Next
		}
		curr = curr.Next
	}

	if list1 != nil {
		curr.Next = list1
	}
	if list2 != nil {
		curr.Next = list2
	}

	return dummy.Next
}

func main() {
	// 1. 定义 testCase 结构体
	type testCase struct {
		name   string
		l1     []int
		l2     []int
		expect []int
	}

	// 2. 准备测试用例
	cases := []testCase{
		{name: "示例 1", l1: []int{1, 2, 4}, l2: []int{1, 3, 4}, expect: []int{1, 1, 2, 3, 4, 4}},
		{name: "示例 2", l1: []int{}, l2: []int{}, expect: []int{}},
		{name: "示例 3", l1: []int{}, l2: []int{0}, expect: []int{0}},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		got := mergeTwoLists(createList(tc.l1), createList(tc.l2))
		gotArr := listToArray(got)

		// 3. 切片比较
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
			fmt.Printf("FAIL %s: l1=%v, l2=%v, expect=%v, got=%v\n", tc.name, tc.l1, tc.l2, tc.expect, gotArr)
			failed++
		}
	}

	fmt.Printf("\n结果：%d passed, %d failed\n", passed, failed)
}
