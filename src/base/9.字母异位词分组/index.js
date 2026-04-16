/**
 * 使用 ASCII 计算 索引
 * 使用 Map 间接比较中间字符串(使用分隔符将每个字符串的ASCII数组拼接成唯一字符串)
 * 字符串、哈希表
 * @param {Array<string>[]} strs
 * @returns {Array<string>[]}
 */
const groupAnagrams = function (strs) {
  if (strs.length === 0) {
    return [];
  }
  const resArr = [];
  const mapper = new Map();
  for (const str of strs) {
    const alphabet = Array(26).fill(0);
    for (const char of str) {
      //   console.log(char.charCodeAt() - 97);
      const asciiIdx = char.codePointAt() - 97;
      alphabet[asciiIdx]++;
    }
    const resCompareStr = alphabet.join('-');
    // console.log(resCompareStr);
    if (mapper.has(resCompareStr)) {
      const tempArr = [...mapper.get(resCompareStr), str];
      mapper.set(resCompareStr, tempArr);
    } else {
      mapper.set(resCompareStr, [str]);
    }
  }
  mapper.forEach((v) => {
    resArr.push(v);
  });
  return resArr;
};

const originGroup = [
  'tea',
  'ate',
  'eat',
  'num',
  'mun',
  'bay',
  'bat',
  'tab',
  'net',
  'ten',
  'aaaaaaaasdsdsdsdsadsdaaaa',
  'aaaaaaaasdsdsdaaaasdsadsd'
];

console.log(groupAnagrams(originGroup));
