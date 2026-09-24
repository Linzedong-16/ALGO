def maxProfit(prices):
    leftPoint: int = float("inf")

    res: int = 0

    for price in prices:
        leftPoint = min(leftPoint, price)
        res = max(res, price - leftPoint)
    return res


import unittest
import time


class TestMaxProfit(unittest.TestCase):
    def test_case(self):
        start = time.time()
        self.assertEqual(maxProfit([7, 1, 5, 3, 6, 4]), 5)
        self.assertEqual(maxProfit([7, 6, 4, 3, 1]), 0)
        self.assertEqual(maxProfit([2, 4, 1]), 2)
        self.assertEqual(maxProfit([1]), 0)
        self.assertEqual(maxProfit([3, 2, 6, 5, 0, 3]), 4)
        end = time.time()
        print(f"耗时: {(end - start) * 1000} ms")


if __name__ == "__main__":
    unittest.main()
