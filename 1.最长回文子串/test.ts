function longestPalindrome_(str: string): string {
  if (str.length < 2) {
    return str;
  }
  let maxLen = 1,
    start = 0; // 记录最长子串的起始位置与最长距离

  function expand(left: number, right: number): void {
    while (left >= 0 && right <= str.length && str[left] === str[right]) {
      if (right - left + 1 > maxLen) {
        maxLen = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < str.length; i++) {
    // 两种扩散方式
    expand(i, i + 1);
    expand(i - 1, i + 1);
  }
  return str.slice(start, start + maxLen);
}

console.log(longestPalindrome_('aansdsa'));
