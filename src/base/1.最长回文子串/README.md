# 最长回文子串

## 题目描述
给定一个字符串 s，找到 s 中最长的回文子串。

## 题型分析
- **题型分类**：字符串处理、回文问题
- **难度等级**：中等
- **核心考点**：中心扩散算法、双指针技巧

## 解题思路

### 方法：中心扩散法

#### 思路解析
回文串的特点是正着读和反着读都一样。我们可以利用这个特性，从字符串的每个位置（或相邻位置）作为中心，向两边扩散，寻找最长的回文串。

#### 核心思想
1. **奇数长度回文串**：以某个字符为中心，向左右扩散
2. **偶数长度回文串**：以两个相邻字符之间的空隙为中心，向左右扩散
3. 对于每个位置，都需要尝试奇数和偶数两种情况

#### 算法步骤
1. 如果字符串长度小于2，直接返回整个字符串
2. 遍历字符串的每个位置 i：
   - 以 i 为中心向两边扩散（奇数长度）
   - 以 i-1 和 i+1 为中心向两边扩散（偶数长度）
3. 在扩散过程中，更新最长回文串的起始位置和长度
4. 返回最终的最长回文子串

## 代码实现

```javascript
/**
 *  采用中心扩散的思想
 * @param {string} s
 * @returns {string} subString
 */
var longestPalindrome = function (s) {
  if (s.length < 2) return s;
  let start = 0; // 记录切片起始位置
  let maxLength = 1; // 记录切片长度
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right <= s.length && s[left] === s[right]) {
      if (right - left + 1 > maxLength) {
        start = left;
        maxLength = right - left + 1;
      }
      left--;
      right++;
    }
  }
  
  // 两种形式切片分开遍历
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i + 1);     // 偶数长度
    expandAroundCenter(i - 1, i + 1);   // 奇数长度
  }
  
  return s.slice(start, start + maxLength);
};
```

## 复杂度分析

- **时间复杂度**：O(n²)
  - 外层循环遍历每个字符：O(n)
  - 内层中心扩散最坏情况：O(n)
  - 总体：O(n × n) = O(n²)

- **空间复杂度**：O(1)
  - 只使用了常数个变量，没有使用额外的存储空间

## 示例演示

### 输入：`"aansdsa"`
- 中心位置：'n' 和 's'
- 扩散过程：
  - 从 'n' 开始：`ans` → 不是回文
  - 从 's' 开始：`sd` → 不是回文  
  - 从 'n' 和 's' 之间：`ansdsa` → 回文
- **输出：`"ansdsa"`**

### 输入：`"babad"`
- 可能的回文串：`"bab"` 或 `"aba"`
- **输出：`"bab"`**（长度为3）

## 关键点总结

1. **中心扩散的优势**：
   - 空间复杂度低，只需常数空间
   - 思路直观，容易理解和实现

2. **注意事项**：
   - 需要同时考虑奇数和偶数长度的回文串
   - 边界条件的处理（字符串长度 < 2）

3. **优化思路**：
   - 可以使用动态规划 O(n²) 时间，O(n²) 空间
   - 可以使用Manacher算法 O(n) 时间，O(n) 空间（较复杂）

## 相关题型
- [回文子串数量统计](https://leetcode.cn/problems/palindromic-substrings/)
- [最长回文子序列](https://leetcode.cn/problems/longest-palindromic-subsequence/)
- [验证回文串](https://leetcode.cn/problems/valid-palindrome/)