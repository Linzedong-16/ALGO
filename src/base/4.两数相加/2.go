package main

import "fmt"

// --- 数据结构定义 ---
type ListNode struct {
	Val  int
	Next *ListNode
}

// --- [解题区域] ---
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	carry := 0
	dummy := new(ListNode{Val: 0, Next: nil})
	curr := dummy
	for l1 != nil || l2 != nil {
		sum := 0

		if l1 != nil {
			sum += l1.Val
			l1 = l1.Next
		}
		if l2 != nil {
			sum += l2.Val
			l2 = l2.Next
		}

		sum += carry
		carry = sum / 10
		curr.Next = &ListNode{Val: sum % 10, Next: nil}
		curr = curr.Next
	}

	if carry != 0 {
		curr.Next = &ListNode{Val: carry, Next: nil}
	}
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

// 比较两个一维切片是否相等
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
		l1     []int
		l2     []int
		expect []int
	}

	cases := []testCase{
		{name: "示例 1", l1: []int{2, 4, 3}, l2: []int{5, 6, 4}, expect: []int{7, 0, 8}},
		{name: "示例 2", l1: []int{0}, l2: []int{0}, expect: []int{0}},
		{name: "示例 3", l1: []int{9, 9, 9}, l2: []int{9, 9, 9, 9, 9, 9, 9}, expect: []int{8, 9, 9, 0, 0, 0, 0, 1}},
	}

	passed := 0
	failed := 0

	for _, tc := range cases {
		l1Node := arrayToListNode(tc.l1)
		l2Node := arrayToListNode(tc.l2)

		gotList := addTwoNumbers(l1Node, l2Node)
		got := listNodeToArray(gotList)

		valid := sliceEqual(got, tc.expect)

		if valid {
			fmt.Printf("PASS %s\n", tc.name)
			passed++
		} else {
			fmt.Printf("FAIL %s: l1=%v, l2=%v, expect=%v, got=%v\n", tc.name, tc.l1, tc.l2, tc.expect, got)
			failed++
		}
	}

	fmt.Printf("\n结果：%d passed, %d failed\n", passed, failed)
}
