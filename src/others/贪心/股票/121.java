import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class Solution {
    // 待实现函数
    public int maxProfit(int[] prices) {
        int leftPoint = Integer.MAX_VALUE;
        int res = 0;

        for (int i = 0; i < prices.length; i++) {
            leftPoint = Math.min(leftPoint, prices[i]);
            res = Math.max(res, prices[i] - leftPoint);
        }
        return res;
    }

    public static void main(String[] args) {
        SolutionTest sTest = new SolutionTest();
        sTest.testCase();
    }
}

class SolutionTest {
    private final Solution solution = new Solution();

    @Test
    void testCase() {
        long start = System.currentTimeMillis();
        assertEquals(5, solution.maxProfit(new int[] { 7, 1, 5, 3, 6, 4 }));
        assertEquals(0, solution.maxProfit(new int[] { 7, 6, 4, 3, 1 }));
        assertEquals(2, solution.maxProfit(new int[] { 2, 4, 1 }));
        assertEquals(0, solution.maxProfit(new int[] { 1 }));
        assertEquals(4, solution.maxProfit(new int[] { 3, 2, 6, 5, 0, 3 }));
        System.out.printf("耗时: %d ms%n", System.currentTimeMillis() - start);
    }
}