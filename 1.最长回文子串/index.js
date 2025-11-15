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
    expandAroundCenter(i, i + 1);
    expandAroundCenter(i - 1, i + 1);
  }
  return s.slice(start, start + maxLength);
};

console.log(longestPalindrome("aansdsa"));
