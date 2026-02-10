function groupAnagrams(strs: Array<string>): Array<Array<string>> {
  const result: Array<Array<string>> = [];
  const mappings = new Map<string, Array<string>>();
  for (const str of strs) {
    const alphabet = new Array(26).fill(0);
    // ASCII 转换 生成唯一字母表数组
    for (const char of str) {
      const ASCIITransIdx = char.charCodeAt(0) - 97;
      alphabet[ASCIITransIdx]++;
    }
    const uniAlphabetStr = alphabet.join('-');
    if (mappings.has(uniAlphabetStr)) {
      mappings.set(uniAlphabetStr, [...mappings.get(uniAlphabetStr)!, str]);
    } else {
      mappings.set(uniAlphabetStr, [str]);
    }
  }
  mappings.forEach((value) => {
    result.push(value);
  });
  return result;
}

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
