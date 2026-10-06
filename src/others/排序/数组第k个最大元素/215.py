def partition(arr: list[int], left: int, right: int):
    pivotIdx = random.randint(left, right)
    pivotVal = arr[pivotIdx]

    arr[pivotIdx], arr[left] = arr[left], arr[pivotIdx]

    l = left + 1
    r = right
    while True:
        while l <= r and arr[l] < pivotVal:
            l += 1
        while l <= r and arr[r] > pivotVal:
            r -= 1

        if l >= r:
            break
        arr[l], arr[r] = arr[r], arr[l]
    arr[r], arr[left] = arr[left], arr[r]
    return r


def findKthLargest(nums: list[int], k: int):
    targetIdx = len(nums) - k
    left = 0
    right = len(nums) - 1
    while True:
        mid = partition(nums, left, right)

        if mid == targetIdx:
            return nums[mid]
        elif mid > targetIdx:
            right = mid - 1
        else:
            left = mid + 1


import unittest
import time
import random


class TestFindKthLargest(unittest.TestCase):
    def test_case(self):
        start = time.time()
        self.assertEqual(findKthLargest([3, 2, 1, 5, 6, 4], 2), 5)
        self.assertEqual(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4)
        self.assertEqual(findKthLargest([1], 1), 1)
        self.assertEqual(findKthLargest([2, 1], 1), 2)
        self.assertEqual(findKthLargest([7, 6, 5, 4, 3, 2, 1], 5), 3)
        end = time.time()
        print(f"耗时: {(end - start) * 1000} ms")


if __name__ == "__main__":
    unittest.main()
