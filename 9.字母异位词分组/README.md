# 字母异位词分组

## 题目描述
给你一个字符串数组，请你将字母异位词组合在一起。可以按任意顺序返回结果列表。字母异位词是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。

## 题型分析
- **题型分类**：字符串处理、哈希表、分组问题
- **难度等级**：中等
- **核心考点**：字符串特征提取、哈希表分组、计数技巧

## 解题思路

### 方法：字符计数 + 哈希表

#### 思路解析
字母异位词的特点是包含相同的字母，只是顺序不同。我们可以通过统计每个字母出现的次数来生成一个唯一的"签名"，相同签名的字符串就是字母异位词。

#### 核心思想
1. **字符计数**：统计每个单词中26个字母的出现次数
2. **生成签名**：将计数数组转换为字符串作为分组键
3. **哈希表分组**：使用Map按签名将字符串分组
4. **收集结果**：将Map中的所有值收集到结果数组

#### 算法步骤
1. 创建Map存储分组结果：mapper = new Map()
2. 遍历每个字符串：
   - 创建长度为26的计数数组，初始化为0
   - 遍历字符串的每个字符，统计出现次数
   - 将计数数组用连字符连接成字符串作为key
   - 将当前字符串存入对应key的数组中
3. 将Map的所有值收集到结果数组中并返回

## 代码实现

```javascript
/**
 * 使用 ASCII 计算 索引
 * 使用 Map 间接比较中间字符串(使用分隔符将每个字符串的ASCII数组拼接成唯一字符串)
 * @param {Array<string>[]} strs
 * @returns {Array<string>[]}
 */
var groupAnagrams = function (strs) {
  if (strs.length === 0) return [];
  
  const resArr = [];
  const mapper = new Map();
  
  for (const str of strs) {
    // 统计26个字母的出现次数
    const alphabet = Array(26).fill(0);
    for (const char of str) {
      // 计算字符在字母表中的索引 (0-25)
      const asciiIdx = char.codePointAt() - 97;
      alphabet[asciiIdx]++;
    }
    
    // 将计数数组转换为字符串作为分组键
    const resCompareStr = alphabet.join("-");
    
    // 按键分组
    if (mapper.has(resCompareStr)) {
      const tempArr = [...mapper.get(resCompareStr), str];
      mapper.set(resCompareStr, tempArr);
    } else {
      mapper.set(resCompareStr, [str]);
    }
  }
  
  // 收集所有分组
  mapper.forEach((v) => {
    resArr.push(v);
  });
  
  return resArr;
};
```

## 复杂度分析

- **时间复杂度**：O(n × k)
  - n 是字符串数组的长度
  - k 是字符串的平均长度
  - 每个字符串需要遍历所有字符进行计数

- **空间复杂度**：O(n × k)
  - 需要存储所有字符串
  - Map的键空间最坏情况下有n个不同的分组

## 示例演示

### 示例1：输入 ["eat","tea","tan","ate","nat","bat"]

```
处理过程：
1. "eat"
   计数：a:1, e:1, t:1 → [1,0,0...,0,1,0...,0,1,0...]
   签名："0-0-0-0-1-0-...-0-1-0-...-0-1-..."
   mapper: {签名: ["eat"]}

2. "tea"
   计数：a:1, e:1, t:1 → 与"eat"相同
   mapper: {签名: ["eat", "tea"]}

3. "tan"
   计数：a:1, n:1, t:1 → 不同签名
   mapper: {签名1: ["eat", "tea"], 签名2: ["tan"]}

4. "ate"
   计数：a:1, e:1, t:1 → 与"eat"相同
   mapper: {签名1: ["eat", "tea", "ate"], 签名2: ["tan"]}

5. "nat"
   计数：a:1, n:1, t:1 → 与"tan"相同
   mapper: {签名1: ["eat", "tea", "ate"], 签名2: ["tan", "nat"]}

6. "bat"
   计数：a:1, b:1, t:1 → 不同签名
   mapper: {签名1: ["eat", "tea", "ate"], 签名2: ["tan", "nat"], 签名3: ["bat"]}

结果：[["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

### 示例2：输入 [""]

```
处理：
- 空字符串，计数数组全为0
- 签名："0-0-0-...-0"
- 结果：[[""]]
```

### 示例3：输入 ["a"]

```
处理：
- "a"，计数：a:1
- 签名："1-0-0-...-0"
- 结果：[["a"]]
```

## 关键点总结

### 1. **字符计数方法**
- 使用长度为26的数组统计每个字母出现次数
- `char.codePointAt() - 97` 获取字母索引
- 避免了排序的时间复杂度

### 2. **签名生成策略**
- 将计数数组用连字符连接：`alphabet.join("-")`
- 确保相同字母组成的字符串有相同签名
- 避免了数组比较的复杂性

### 3. **哈希表分组**
- 使用Map存储分组结果
- key为签名，value为字符串数组
- 自动去重和分组

### 4. **字符编码处理**
- 使用`codePointAt()`而不是`charCodeAt()`
- 更好地支持Unicode字符
- 减少编码相关的问题

## 其他解法对比

### 方法1：排序法（最直观）
```javascript
var groupAnagrams = function(strs) {
  const groups = new Map();
  
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    if (!groups.has(sorted)) {
      groups.set(sorted, []);
    }
    groups.get(sorted).push(str);
  }
  
  return Array.from(groups.values());
};
```
**优点**：直观易懂
**缺点**：排序的时间复杂度 O(k log k)，总复杂度 O(n × k log k)

### 方法2：质数乘积法
```javascript
var groupAnagrams = function(strs) {
  const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101];
  const groups = new Map();
  
  for (const str of strs) {
    let product = 1;
    for (const char of str) {
      product *= primes[char.charCodeAt(0) - 97];
    }
    if (!groups.has(product)) {
      groups.set(product, []);
    }
    groups.get(product).push(str);
  }
  
  return Array.from(groups.values());
};
```
**优点**：理论上O(1)查找
**缺点**：可能数值溢出，实际不如计数法稳定

## 常见错误

### 1. 直接比较数组
```javascript
// 错误：数组比较的是引用，不是值
const key = alphabet; // 应该是 alphabet.join("-")
```

### 2. 字符索引计算错误
```javascript
// 错误：没有减去'a'的ASCII码
const asciiIdx = char.codePointAt(); // 应该是 char.codePointAt() - 97
```

### 3. Map使用错误
```javascript
// 错误：没有处理Map中已有值的情况
mapper.set(resCompareStr, [str]); // 会覆盖之前的值
```

### 4. 结果收集错误
```javascript
// 错误：直接返回Map而不是值
return mapper; // 应该返回 Array.from(mapper.values())
```

## 扩展思考

### 变体问题
- **查找异位词**：在字符串中查找给定单词的所有异位词
- **异位词检测**：判断两个字符串是否为异位词
- **异位词计数**：统计数组中异位词的对数

### 优化思路
- **Unicode支持**：扩展支持更多字符集
- **性能优化**：使用TypedArray提高计数性能
- **内存优化**：使用更紧凑的签名表示

### 应用场景
- **搜索引擎**：拼写检查、同义词推荐
- **数据清洗**：识别重复的数据变体
- **密码学**：分析字母频率特征

## 相关题型
- [有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)
- [找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)
- [字母异位词分组](https://leetcode.cn/problems/group-anagrams/)