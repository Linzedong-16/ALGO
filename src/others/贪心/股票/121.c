#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

// 断言宏，对标 Deno 的 assertEquals
#define ASSERT_EQUALS(a, b, msg) \
    if((a) != (b)) { \
        printf("[FAIL] %s: expect %d, got %d\n", msg, b, a); \
    } else { \
        printf("[PASS] %s\n", msg); \
    }

int maxProfit(int* prices, int pricesSize) {
    int leftPoint = INT_MAX;
    int res = 0;
    for(int i = 0; i < pricesSize; i++){
        leftPoint = prices[i] < leftPoint ? prices[i] : leftPoint;
        res = (prices[i] - leftPoint) > res ? (prices[i] - leftPoint) : res;
    }
    return res;
}

int main() {
    printf("===== start LeetCode 121 =====\n");
    // 测试用例1 [7,1,5,3,6,4] 预期5
    int case1[] = {7,1,5,3,6,4};
    ASSERT_EQUALS(maxProfit(case1, 6), 5, "case1");

    // 测试用例2 [7,6,4,3,1] 预期0
    int case2[] = {7,6,4,3,1};
    ASSERT_EQUALS(maxProfit(case2, 5), 0, "case2");

    // 测试用例3 [2,4,1] 预期2
    int case3[] = {2,4,1};
    ASSERT_EQUALS(maxProfit(case3, 3), 2, "case3");

    // 测试用例4 [1] 预期0
    int case4[] = {1};
    ASSERT_EQUALS(maxProfit(case4, 1), 0, "case4");

    // 测试用例5 [3,2,6,5,0,3] 预期4
    int case5[] = {3,2,6,5,0,3};
    ASSERT_EQUALS(maxProfit(case5, 6), 4, "case5");

    printf("===== test end =====\n");
    return 0;
}
