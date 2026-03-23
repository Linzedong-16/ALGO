> 为了应对机考无智能提示，记录下JS可能会用到的方法、语法等

1. 正则匹配

2. map与字面量对象{}

3. 字符串/数组方法

```js
// 截取部分内容，返回新值，不修改原数据
(array || string).slice([start[, end]])
// start:起始索引   deleteCount： 删除元素个数  item1, item2...：待插入元素
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

// 切片
arr.slice(start, end) // 不修改原数组

// 排序
arr.sort((a,b) => a-b) // 升序
arr.sort((a,b) => b-a) // 降序
// 反转
arr.reverse()

// 求和
arr.reduce((sum, cur) => sum + cur, 0)

// 查找
arr.includes(x) // 是否存在
arr.indexOf(x)   // 找索引，没有返回-1
arr.find(x => x>5) // 找第一个符合条件的


// 转数组
str.split('') // 字符拆数组
str.split(' ') // 按空格拆

// 转字符串
arr.join('')

// 取字符
str[i]
str.charAt(i)

// 截取
str.substring(start, end)
str.slice(start, end)

// 包含
str.includes(s)  // 是否包含
str.indexOf(s)   // 找位置

// 替换
str.replace('a', 'b') // 替换第一个
str.replaceAll('a','b')

// 大小写
str.toUpperCase()
str.toLowerCase()

// 数字字符串互换
Number(str)
parseInt(str)
String(num)
num.toString()

// 一行字符串转数字
line.split(' ').map(Number)

// 去重
[...new Set(arr)]

// 比较
Math.max(...arr)
Math.min(...arr)
```

## 正则表达式

```js
// 25 回文去除无关字符
s = s.replace(/[^a-zA-Z0-9]/g, '');
// / / 正则写法
// [^ ] 不是括号里的内容
// a-zA-Z0-9 字母数字任意一个
// / /g 全局匹配
```

## 易错点

```js
continue
return
break
不分

忘记向下取整
carry = Math.floor(sum / 10) // 要向下取整


// 生成电话号码组合的时候，忘记return，导致后面代码执行报错
    function traceback(curr, start){
        if (curr.length === digits.length){
            // res.push(curr) ❌ 代码不返回结束函数 -> 后续start溢出
            return res.push(curr)
        }

        // 结束条件判断必须直接退出返回，start可能溢出，导致映射结果不可遍历报错
        for(const char of numMap[digits[start]]){
            curr += char;
            traceback(curr, start + 1);
            curr = curr.slice(0, start)
        }
    }
```
