package main

import "fmt"

// --- 数据结构定义 ---
type ListNode struct {
	Val  int
	Next *ListNode
}

// --- [解题区域] ---
func removeNthFromEnd(head *ListNode, n int) *ListNode {
	// 在这里编写你的解题逻辑
	dummy := &ListNode{Next: head}
	slow := dummy
	fast := dummy

	for i := 0; i < n; i++ {
		fast = fast.Next
	}

	for fast.Next != nil {
		slow = slow.Next
		fast = fast.Next
	}

	slow.Next = slow.Next.Next

	return dummy.Next
}

// --- 解题结束 ---

// --- 辅助函数 ---
func arrayToListNode(arr []int) *ListNode {
	dummy := &ListNode{}
	cur := dummy
	for _, v := range arr {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return dummy.Next
}

func listNodeToArray(list *ListNode) []int {
	var res []int
	cur := list
	for cur != nil {
		res = append(res, cur.Val)
		cur = cur.Next
	}
	return res
}

func sliceEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := 0; i < len(a); i++ {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func main() {
	type testCase struct {
		name   string
		head   []int
		n      int
		expect []int
	}

	cases := []testCase{
		{name: "示例 1", head: []int{1, 2, 3, 4, 5}, n: 2, expect: []int{1, 2, 3, 5}},
		{name: "示例 2", head: []int{1}, n: 1, expect: []int{}},
		{name: "示例 3", head: []int{1, 2}, n: 1, expect: []int{1}},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		headNode := arrayToListNode(tc.head)
		gotList := removeNthFromEnd(headNode, tc.n)
		got := listNodeToArray(gotList)

		valid := sliceEqual(got, tc.expect)

		if valid {
			fmt.Printf("PASS %s\n", tc.name)
			passed++
		} else {
			fmt.Printf("FAIL %s: head=%v, n=%d, expect=%v, got=%v\n", tc.name, tc.head, tc.n, tc.expect, got)
			failed++
		}
	}

	fmt.Printf("\n结果：%d passed, %d failed\n", passed, failed)
}
