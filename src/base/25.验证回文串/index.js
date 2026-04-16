/**
 * 验证回文串
 * 字符串、双指针
 * @param {string} s
 * @returns {boolean}
 */
function isPalindrome(s) {
  s = s.replace(/[^a-zA-Z0-9]/g, '');
  if (s.length < 2) {
    return true;
  }
  s = s.toLowerCase();
  let left = 0,
    right = s.length - 1;
  while (left <= right) {
    if (s[left] === s[right]) {
      left++;
      right--;
    } else {
      return false;
    }
  }
  return true;
}

Deno.test('判断回文', () => {
  console.log(isPalindrome('A man, a plan, a canal: Panama'));
});
