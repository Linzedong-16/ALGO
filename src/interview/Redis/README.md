# redis 入门指南

> Redis是一种流行的内存键值数据库，被广泛用于构建高性能的缓存和消息队列应用。如果你的网站访问很卡顿，那么接入redis缓存热点数据，将会使你的网站访问体验得到质的飞跃。redis的体系很庞大，本课程就简单的带着大家入个门

## redis安装

> docker-compose 安装

```bash
docker-compose up -d
```

```yml
services:
  redis:
    image: redis:7-alpine
    container_name: redis-practice
    restart: unless-stopped
    ports:
      - '6379:6379'
    volumes:
      - ./redis-data-t:/data
    command:
      - redis-server
      - --appendonly
      - 'yes'
      - --requirepass
      - '123456'
    healthcheck:
      test: ['CMD', 'redis-cli', '-a', '123456', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
```

## 连接redis

如果本地主机安装了Redis，可以用redis-cli命令去连接、测试Redis指令

> 命令行连接

```bash
# 完整命令
redis-cli -h 127.0.0.1 -p 6379 -a password
# 简写
redis-cli
# 认证 进入redis之后
auth password
```

> Go代码连接

`main.go` 中封装了连接初始化逻辑，返回一个可复用的 `*redis.Client`：

```go
package main

import (
 "context"
 "fmt"
 "time"

 "github.com/redis/go-redis/v9"
)

var DB *redis.Client

func Connect() *redis.Client {
 redisDB := redis.NewClient(&redis.Options{
  Addr:        "127.0.0.1:6379", // 不写默认就是这个
  Password:    "123456",         // 密码
  DB:          1,                // 默认是0
  DialTimeout: time.Second,      // 连接超时
 })

 _, err := redisDB.Ping(context.Background()).Result()
 if err != nil {
  panic(err)
 }

 fmt.Println("Redis响应：", redisDB, err)

 return redisDB
}
```

> 注意：这里用的是 `go-redis/v9`，和 v8 最大的区别是所有命令都要传入 `context.Context`；连接参数按本地启动的 Redis 的实际配置填写
> 连接好之后，五大数据类型、事务、锁等操作都封装在 `pkg/utils.go` 中，每个函数统一接收 `*redis.Client` 作为参数

## redis五大数据类型

1. string (字符串)
2. list (列表)
3. set (集合)
4. hash (哈希)
5. zset (有序集合)

### 1. String

> 字符串 String 是 Redis 最简单的数据结构，可以存储字符串、整数或者浮点数。最常见的应用场景就是对象缓存

```bash
127.0.0.1:6379> auth redis # 登录
OK
127.0.0.1:6379> set name leige # 设置
OK
127.0.0.1:6379> get name # 获取
"leige"
127.0.0.1:6379> exists name # 判断这个key是否存在
(integer) 1
127.0.0.1:6379> exists name1
(integer) 0
127.0.0.1:6379> del name # 删除这个key
(integer) 1
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> GETSET name1 lisi # 如果不存在值，则返回 nil，set是会执行的
(nil)
127.0.0.1:6379> GETSET name1 lisi # 如果存在值，获取原来的值，并设置新的值
"lisi"
```

> 批量操作

```bash
127.0.0.1:6379> mset n1 zhangsan n2 lisi
OK
127.0.0.1:6379> get n1
"zhangsan"
127.0.0.1:6379> get n2
"lisi"
```

> 计数：自增1，自减1

```bash
127.0.0.1:6379> get n
(nil)
127.0.0.1:6379> incr n # 自增1
(integer) 1 # 当前这个n的值
127.0.0.1:6379> get n
"1"
127.0.0.1:6379> incr n
(integer) 2
127.0.0.1:6379> get n
"2"
127.0.0.1:6379> decr n # 自减1
(integer) 1
127.0.0.1:6379> get n
"1"
127.0.0.1:6379> decr n
(integer) 0
127.0.0.1:6379> get n
"0"
127.0.0.1:6379> decr n
(integer) -1
127.0.0.1:6379> get n
"-1"
```

> 自动增n，自减n

```bash
127.0.0.1:6379> get n
(nil)
127.0.0.1:6379> INCRBY n 10
(integer) 10
127.0.0.1:6379> INCRBY n 11
(integer) 21
127.0.0.1:6379> get n
"21"
127.0.0.1:6379> DECRBY n 5
(integer) 16
127.0.0.1:6379> get n
"16"
```

#### 过期操作

`setex` 单位是秒

```bash
127.0.0.1:6379> setex name 20 leige
OK
127.0.0.1:6379> get name
"leige"
127.0.0.1:6379> ttl name # 查看还有多久过期
(integer) 12
127.0.0.1:6379> ttl name # -2表示已过期
(integer) -2
127.0.0.1:6379> get name
(nil)
```

`expire` 设置一个key的过期时间

> 如果不设置过期时间，ttl显示的结果是-1，表示永不过期

```bash
127.0.0.1:6379> set name leige
OK
127.0.0.1:6379> ttl name # 现在是永不过期
(integer) -1
127.0.0.1:6379> expire name 10
(integer) 1
127.0.0.1:6379> ttl name
(integer) 6
127.0.0.1:6379> ttl name # 现在是过期了
(integer) -2
```

### 2. List

> redis列表就相当于go里面的切片

```bash
127.0.0.1:6379> rpush list zhangsan lisi wangwu xiaoming # 从右边向左边推入四个元素
4 # 返回列表的长度
127.0.0.1:6379> llen list # 查列表的长度
4
127.0.0.1:6379> lrange list 0 -1 # 查看列表的全部元素
zhangsan
lisi
wangwu
xiaoming
127.0.0.1:6379> rpop list # 从右边弹出一个元素
xiaoming
127.0.0.1:6379> lrange list 0 -1
zhangsan
lisi
wangwu
127.0.0.1:6379> lpop list # 从左边弹出一个元素
zhangsan
127.0.0.1:6379> lrange list 0 -1
lisi
wangwu
```

### 3. Hash

> redis哈希就相当于go里面的map

```bash
127.0.0.1:6379> hset dict name leige # 设置一个hash key，并且给hash里面设置一组filed value
0
127.0.0.1:6379> hget dict name # 获取hash里面对应filed的值
leige
127.0.0.1:6379> hgetall dict # 数据量大时，谨慎使用！获取在哈希表中指定 key 的所有字段和值
name
leige
127.0.0.1:6379> hkeys dict # 获取在哈希表中指定 key 的所有filed
name
127.0.0.1:6379> hmset info name leige age 23 # 批量设置
OK
127.0.0.1:6379> hkeys info
name
age
127.0.0.1:6379> HEXISTS info name # 判断某个field是否存在
1
127.0.0.1:6379> HEXISTS info name1
0
127.0.0.1:6379> HDEL info name # 删除hash中的一个filed
1
127.0.0.1:6379> hkeys info
age
127.0.0.1:6379> hlen info # 返回hash中filed的个数
1
```

> 注意：设置过期只能给hash的key设置过期，hash内部的field键值对是不能单独设置过期的

### 4. Set

> redis集合就相当于go里面的集合

```bash
127.0.0.1:6379> sadd set a b c d # 添加元素
4
127.0.0.1:6379> sadd set a b c e # 实际只有一个元素添加进去了
1
127.0.0.1:6379> scard set  # 获取集合的长度
5
127.0.0.1:6379> sismember set a # 判断某个元素是不是在集合里面
1
127.0.0.1:6379> sismember set f
0
127.0.0.1:6379> smembers set # 获取集合中的数据 无序的
e
d
b
a
c
127.0.0.1:6379> srem set a # 删除集合中的某个元素 可传多个
1
```

> 交集、并集和差集

- `sdiff` 差集
- `sinter` 交集
- `sunion` 并集

```bash
127.0.0.1:6379> sadd set1 1 2 3
3
127.0.0.1:6379> sadd set2 2 3 4
3
127.0.0.1:6379> sdiff set1 set2 # 差集
1
127.0.0.1:6379> sdiff set2 set1
4
127.0.0.1:6379> sinter set1 set2 # 交集
2
3
127.0.0.1:6379> sunion set1 set2 # 并集
1
2
3
4
```

> 随机抽奖：`spop` 随机移除集合内元素并返回

```bash
127.0.0.1:6379> sadd order 1 2 3 4 5 6 7 8
8
127.0.0.1:6379> spop order # 随机移除一个
5
127.0.0.1:6379> spop order
7
127.0.0.1:6379> spop order 3 # 随机移除3个，redis3.2+支持
```

> Set 使用场景: 共同好友、统计网站的独立ip、标签

### 5. sorted set（zset 有序集合）

> sorted set 增加了一个权重参数 score，使得集合中的元素能够按 score 进行有序排列，member元素不能重复

```bash
127.0.0.1:6379> zadd class 88 leige 46 zhangsan 76 wangwu 36 lisi # 向有序集合添加一个或多个成员
(integer) 4
127.0.0.1:6379> zrange class 0 -1 # 通过索引，按照分数从低到高返回
1) "lisi"
2) "zhangsan"
3) "wangwu"
4) "leige"
127.0.0.1:6379> zrevrange class 0 -1 # 通过索引，按照分数从高到低返回
1) "leige"
2) "wangwu"
3) "zhangsan"
4) "lisi"
127.0.0.1:6379> zcard class # 获取有序集合的成员数
(integer) 4
127.0.0.1:6379> ZSCORE class zhangsan # 查看某个成员的分数
"46"
127.0.0.1:6379> ZRANK class wangwu # 查看成员的排名 从小到大排序
(integer) 2
127.0.0.1:6379> ZREVRANK class wangwu # 查看成员的排名 从大到小排序
(integer) 1
127.0.0.1:6379> zcount class 40 70 # 计算在有序集合中指定区间分数的成员数
(integer) 1
127.0.0.1:6379> zrangebyscore class 40 70 # 通过分数返回有序集合指定区间内的成员
1) "zhangsan"
127.0.0.1:6379> zrevrangebyscore class 100 0 # 返回有序集中指定分数区间内的成员，分数从高到低排序
1) "leige"
2) "wangwu"
3) "zhangsan"
4) "lisi"
127.0.0.1:6379> zrange class 0 -1 withscores # 把成员和分数一起显示出来
1) "lisi"
2) "36"
3) "zhangsan"
4) "46"
5) "wangwu"
6) "76"
7) "leige"
8) "88"
127.0.0.1:6379> zrem class leige # 移除一个成员
(integer) 1
127.0.0.1:6379> zrange class 0 -1
1) "lisi"
2) "zhangsan"
3) "wangwu"
127.0.0.1:6379> ZREMRANGEBYRANK class 0 0 # 移除有序集合中给定的排名区间的所有成员(第一名是0)(低到高排序)
(integer) 1
127.0.0.1:6379> zrange class 0 -1
1) "zhangsan"
2) "wangwu"
127.0.0.1:6379> ZREMRANGEBYSCORE class 40 50 # 移除有序集合中给定的分数区间的所有成员
(integer) 1
127.0.0.1:6379> zrange class 0 -1
1) "wangwu"
127.0.0.1:6379> ZSCORE class wangwu
"76"
127.0.0.1:6379> ZINCRBY class 2 wangwu # 给wangwu分数+2
"78"
127.0.0.1:6379> ZINCRBY class -2 wangwu # 给wangwu分数‑2
"76"
```

> zset 使用场景: 排行榜、订单支付超时（下单时插入，member为订单号，score为订单超时时间戳，定时任务扫描）

## 通过go操作五大数据类型

> 前面会了命令之后，使用 go-redis/v9 去操作 redis，除了每个命令都要传入 `context.Context` 之外，用法和命令基本一致

### String

```go
// string类型基本操作
func RedisStringOperations(client *redis.Client) {
	// 创建一个带超时的 context，防止网络请求卡死（推荐10秒超时）
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel() // 请求结束时释放 context 资源

	// 1. Set 和 Get
	client.Set(ctx, "name", "Lin", 0)

	val, _ := client.Get(ctx, "name").Result()
	fmt.Println("获取的 name 值:", val) // 输出: Lin

	// 2. Exists 检查 Key 是否存在
	existsName, _ := client.Exists(ctx, "name").Result()
	existsName1, _ := client.Exists(ctx, "name1").Result()
	fmt.Println("name 是否存在:", existsName == 1, "\nname1 是否不存在:", existsName1 == 0) // 输出: 1 0

	// 3. 数值自增操作 (Redis 要求值必须是纯数字字符串)
	client.Set(ctx, "age", "12", 0)

	client.Incr(ctx, "age")       // 12 + 1 = 13
	client.IncrBy(ctx, "age", 10) // 13 + 10 = 23

	ageVal, _ := client.Get(ctx, "age").Int64()
	fmt.Println("自增后的 age 值:", ageVal) // 输出: 23

	// 4. TTL 过期时间操作
	ttl, _ := client.TTL(ctx, "name").Result()
	fmt.Println("name 的当前过期时间:", ttl) // 输出: -1s (代表永不过期)

	// 设置 2 秒过期时间
	client.Expire(ctx, "name", 2*time.Second)
	ttl, _ = client.TTL(ctx, "name").Result()
	fmt.Println("设置过期后的 TTL:", ttl) // 输出: 约 2s

	// 等待 2 秒让 Key 过期
	time.Sleep(2 * time.Second)
	ttl, _ = client.TTL(ctx, "name").Result()
	fmt.Println("过期后的 TTL:", ttl) // 输出: -2s (代表 Key 不存在)
}
```

### List

```go
// List 基础操作
func RedisListOperations(client *redis.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	client.LTrim(ctx, "list", 1, 0) // 先清空，保证重复运行结果稳定

	// 1. 从右边入队，插入4个元素
	client.RPush(ctx, "list", "TS", "Rust", "Python", "Zig")

	// 2. 获取列表长度
	length := client.LLen(ctx, "list").Val()
	fmt.Println("列表长度:", length) // 输出: 4

	// 3. 获取列表所有元素 (索引从 0 到 -1 代表全部)
	vals := client.LRange(ctx, "list", 0, -1).Val()
	fmt.Println("列表所有元素:", vals)
}
```

### Hash

```go
// Hash类型
func RedisHash(client *redis.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// 设置哈希字段
	client.HSet(ctx, "info", "文章1", 23)

	// 获取单个字段，转成 int64
	val, _ := client.HGet(ctx, "info", "文章1").Int64()
	fmt.Println(val) // 23

	// 获取整个哈希表
	fmt.Println(client.HGetAll(ctx, "info").Val()) // map[文章1:23]

	// 获取所有字段名
	fmt.Println(client.HKeys(ctx, "info").Val()) // [文章1]

	// 判断字段是否存在
	fmt.Println(client.HExists(ctx, "info", "文章1").Val()) // true
	fmt.Println(client.HExists(ctx, "info", "文章2").Val()) // false

	// 获取字段数量
	fmt.Println(client.HLen(ctx, "info").Val()) // 1
}
```

### Set

```go
// Set 类型
func RedisSet(client *redis.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// 添加元素
	client.SAdd(ctx, "set", "a", "b", "c", "d")

	// 判断是否是成员
	fmt.Println(client.SIsMember(ctx, "set", "a").Val()) // true

	// 获取所有成员（无序）
	fmt.Println(client.SMembers(ctx, "set").Val()) // [b d c a]

	// 准备两个集合做集合运算
	client.SAdd(ctx, "set1", 1, 2, 3)
	client.SAdd(ctx, "set2", 2, 3, 4)

	// 差集：set1 里有但 set2 里没有的
	fmt.Println(client.SDiff(ctx, "set1", "set2").Val()) // [1]

	// 交集：两个集合都有的
	fmt.Println(client.SInter(ctx, "set1", "set2").Val()) // [2 3]

	// 并集：两个集合所有不重复的元素
	fmt.Println(client.SUnion(ctx, "set1", "set2").Val()) // [1 2 3 4]
}
```

### Zset

```go
// ZSet 类型
func RedisZSet(client *redis.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// 0. 先清空，保证重复运行的结果稳定
	client.Del(ctx, "class")

	// 1. 添加成员和分数 (传入切片)
	zs := []redis.Z{
		{Score: 80, Member: "张三"},
		{Score: 46, Member: "李四"},
	}
	client.ZAdd(ctx, "class", zs...)

	// 2. 按排名从小到大取全部成员 (索引 0 到 -1)
	fmt.Println(client.ZRange(ctx, "class", 0, -1).Val())
	// [李四 张三]

	// 3. 按排名从大到小取全部成员
	// V9 中 ZRevRange 已废弃，统一用 ZRangeArgs + Rev
	fmt.Println(client.ZRangeArgs(ctx, redis.ZRangeArgs{
		Key:   "class",
		Start: 0,
		Stop:  -1,
		Rev:   true, // 反转，即从大到小
	}).Val())
	// [张三 李四]

	// 4. 按分数范围查询：0~100，从小到大
	// V9 中 ZRangeByScore 已废弃(Redis 6.2.0+)，改用 ZRangeArgs + ByScore
	// Start/Stop 此时是分数边界，所以用字符串
	fmt.Println(client.ZRangeArgs(ctx, redis.ZRangeArgs{
		Key:     "class",
		Start:   "0",
		Stop:    "100",
		ByScore: true, // 按分数区间查，而不是按排名下标查
	}).Val())
	// [李四 张三]

	// 5. 按分数范围查询：0~100，从大到小
	// 注意：ByScore + Rev 时，Start 必须写较大的分数、Stop 写较小的分数（区间要反着写）
	fmt.Println(client.ZRangeArgs(ctx, redis.ZRangeArgs{
		Key:     "class",
		Start:   "100",
		Stop:    "0",
		ByScore: true,
		Rev:     true, // 反转
	}).Val())
	// [张三 李四]

	// 6. 带分数一起查出来
	// 用 ZRangeArgsWithScores 替代旧写法，返回 []redis.Z（含 Member 和 Score）
	fmt.Println(client.ZRangeArgsWithScores(ctx, redis.ZRangeArgs{
		Key:     "class",
		Start:   "0",
		Stop:    "100",
		ByScore: true,
	}).Val())
	// [{46 李四} {80 张三}]  ← redis.Z 的字段顺序是 Score 在前、Member 在后

	// 7. 查询指定成员的分数
	fmt.Println(client.ZScore(ctx, "class", "李四").Val())
	// 46
}
```

## redis常用命令

```bash
127.0.0.1:6379> select 2 # 切换数据库
OK
127.0.0.1:6379[2]> select 0
OK
127.0.0.1:6379> keys * # 查看所有的key
1) "zset"
2) "order"
127.0.0.1:6379> keys s* # 查看s开头的key
1) "set"
2) "set2"
3) "set1"
127.0.0.1:6379> ping # 查看服务是否运行
PONG
127.0.0.1:6379> move name 1 # 将当前数据库的key移动到数据库1当中
(integer) 1
127.0.0.1:6379[1]> PERSIST name # 移除key的过期时间，key永不过期
(integer) 1
127.0.0.1:6379[1]> type name # 查看key的数据类型
string
127.0.0.1:6379[1]> type info
hash
127.0.0.1:6379[1]> type class
zset
127.0.0.1:6379[1]> type set
set
127.0.0.1:6379[1]> type list
list
127.0.0.1:6379[1]> CLIENT LIST # 获取连接到服务器的客户端连接列表
id=4 addr=127.0.0.1:52377 fd=7 name= age=5 idle=3 flags=N db=0 sub=0 psub=0 multi=-1 qbuf=0 qbuf-free=0 obl=0 oll=0 omem=0 events=r cmd=client
127.0.0.1:6379[1]> dbsize # 获取当前数据库key的数量
(integer) 5
127.0.0.1:6379[1]> FLUSHDB # 删除当前数据库的所有key
OK
127.0.0.1:6379[1]> FLUSHALL # 删除全部数据库的所有key
OK
```

## 事务

> Redis 事务的本质是一组会被串行执行的命令集合，区别于传统关系型数据库的事务，Redis 事务和 MySQL 事务最大的区别在于：它保证的是执行过程不被打断，但不保证出错后能“回滚”

```bash
127.0.0.1:6379> multi # 开启事务
OK
127.0.0.1:6379> set name ff
QUEUED
127.0.0.1:6379> get name
QUEUED
127.0.0.1:6379> exec # 执行事务
1) OK
2) "ff"
```

> 取消事务

```bash
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> set age 12
QUEUED
127.0.0.1:6379> discard # 取消事务
OK
127.0.0.1:6379> get age # 数据未改动
(nil)
```

> 如果在事务过程中，存在**命令语法错误**，则执行exec的时候，所有命令都不会执行

```bash
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> set age 12
QUEUED
127.0.0.1:6379> x
(error) ERR unknown command 'x'
127.0.0.1:6379> get age
QUEUED
127.0.0.1:6379> exec
(error) EXECABORT Transaction discarded because of previous errors.
```

### go处理redis事务

> 和命令操作稍微有点不太一样

```go
// Redis事务
func RedisPipelineAndAtomicty(client *redis.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// ==========================================
	// 1. Redis Pipeline (管道) 演示
	// ==========================================
	// 作用：把多条命令打包，一次性发给 Redis 服务器，再一次性读回结果。
	// 好处：极大地减少了网络往返次数，提高了高并发下的吞吐量。
	fmt.Println("=== 1. Pipeline 管道演示 ===")

	// 获取一个管道对象（TxPipeline 会保证命令不被其他客户端打断，但无法回滚）
	pipe := client.TxPipeline()

	// 将命令写入管道（此时还没有真正发送给 Redis）
	pipe.Set(ctx, "pipeline_name", "磊哥", 0)
	val := pipe.Get(ctx, "pipeline_name")

	// ⚠️ 注意：这里打印不出结果！因为命令还在内存管道里，没发给 Redis。
	fmt.Println("[管道未提交] 结果:", val.Val()) // 输出为空

	// 一次性将管道里的所有命令发送到 Redis 执行，并获取结果
	_, err := pipe.Exec(ctx)
	if err != nil {
		fmt.Println("提交管道事务失败:", err)
		return
	}

	// 命令执行完毕后，现在可以通过之前的 val 拿到结果了
	fmt.Println("[管道已提交] 结果:", val.Val()) // 输出: 磊哥

	// ==========================================
	// 2. 核心对比与局限性解析 (注释详解)
	// ==========================================
	fmt.Println("\n=== 2. 核心对比解析 ===")

	/*
		🔴 Redis 原生事务 (TxPipeline) 的致命局限：
		1. 无法回滚：Redis 事务没有 "ROLLBACK" 机制。如果在 EXEC 执行期间，
		   中间某条命令报错（例如用 Get 命令去操作一个 Hash 类型的 key），
		   Redis 会忽略这个错误，继续把后面所有的命令执行完。
		2. 不支持条件逻辑：事务里只能排队执行命令。你不能写 "如果 key 存在就删除，
		   不存在就赋值" 这种带 if/else 逻辑的脚本。
		👉 适用场景：多条命令之间没有逻辑依赖，仅仅为了减少网络请求次数（批量处理）。
	*/

	/*
		🟡 为什么 Lua 脚本更常用？
		Lua 脚本将 "读取 -> 业务判断 -> 写入" 打包成一个整体。
		Redis 在执行 Lua 脚本时，会把其他所有客户端的命令都挂起。
		👉 适用场景：实现真正的业务原子性。例如：扣减库存（先判断库存够不够，够就减）、
		   分布式锁的安全释放（GET 比对 value，匹配才 DEL，防止误删别人的锁）。
	*/

	/*
		🟢 什么时候用 Lock (分布式锁)？
		Lock 不是用来做数据计算的，而是用来做 "互斥资源控制" 的。
		👉 适用场景：防止并发问题。例如：高并发抢购时，防止同一个用户生成多笔订单；
		   多个微服务同时去定时任务，只允许其中一个执行。
	*/
}
```

### go处理redis原子性(Lua脚本)

> Lua 脚本是 Redis 实现"读-判断-写"原子性的首选方案，被广泛用于分布式锁的安全释放

```go
// Lua脚本
func RedisLuaScript(client *redis.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// 1. 模拟加锁
	client.Set(ctx, "my_lock", "张三", 30*time.Second)
	fmt.Println("当前锁的持有者:", client.Get(ctx, "my_lock").Val())

	// 2. 编写 Lua 脚本
	// 逻辑：先读锁的值(KEYS[1])，如果等于传入的值(ARGV[1])就删除它，返回1(成功)；否则返回0(失败)
	unlockScript := `
        if redis.call("GET", KEYS[1]) == ARGV[1] then
            return redis.call("DEL", KEYS[1])
        else
            return 0
        end
    `

	// 3. 尝试用 Lua 脚本安全释放锁
	// 场景 A: 持有者确实是 "张三"，应该删除成功
	resultA := client.Eval(ctx, unlockScript, []string{"my_lock"}, "张三")
	fmt.Println("场景A(正确持有者)释放结果:", resultA.Val()) // 输出: 1

	// 4. 重新上锁
	client.Set(ctx, "my_lock", "李四", 30*time.Second)

	// 场景 B: "王五" 假装自己是持有者来解锁，应该失败
	resultB := client.Eval(ctx, unlockScript, []string{"my_lock"}, "王五")
	fmt.Println("场景B(错误持有者)释放结果:", resultB.Val())             // 输出: 0
	fmt.Println("验证锁是否还在:", client.Get(ctx, "my_lock").Val()) // 输出: 李四 (锁没有被误删)
}
```

## 锁(WATCH乐观锁)

多个客户端有可能同时操作同一组数据，并且该数据一旦被操作修改后，将不适用于继续操作
在操作之前锁定要操作的数据，一旦发生变化，终止当前操作

```bash
127.0.0.1:6379[1]> set price 100
OK
127.0.0.1:6379[1]> WATCH price // 检测这个key，如果key在事务期间发生了变化，则事务不成功
OK
127.0.0.1:6379[1]> MULTI
OK
127.0.0.1:6379[1]> set price 101
QUEUED
127.0.0.1:6379[1]> get price
QUEUED
127.0.0.1:6379[1]> exec // 在exec之前，再用一个客户端去修改这个price的值，exec返回nil
(nil)
```

### go处理redis锁(WATCH)

```go
// Watch 乐观锁
func RedisWatch(client *redis.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	key := "price"

	// 为了方便测试，先给 price 设个初始值
	client.Set(ctx, key, 100, 0)

	fmt.Println("=== 乐观锁 (Watch) 机制演示 ===")
	fmt.Println("初始价格:", client.Get(ctx, key).Val())

	// ==========================================
	// Watch 核心机制：监听 key，并在事务中提交更改
	// ==========================================
	err := client.Watch(ctx, func(tx *redis.Tx) error {
		// 1. 读取当前值 (在 Redis 内部完成)
		n, err := tx.Get(ctx, key).Int()
		if err != nil && err != redis.Nil {
			return err
		}

		// 2. 模拟业务处理耗时（比如去算账）
		// 在这 3 秒钟内，如果有其他客户端修改了 price，这次事务就会自动失败。
		fmt.Println(">>> 正在处理价格业务，预计耗时3秒...")
		time.Sleep(3 * time.Second)

		// 3. 提交更改 (price + 1)
		_, err = tx.Pipelined(ctx, func(pipe redis.Pipeliner) error {
			pipe.Set(ctx, key, n+1, 0)
			return nil
		})
		return err
	}, key)

	// 4. 打印最终结果
	if err != nil {
		fmt.Println("❌ 事务提交失败！因为在这期间 price 被其他客户端修改了，自动回滚。")
	} else {
		fmt.Println("✅ 事务提交成功！当前价格已更新。")
	}
	fmt.Println("最终价格:", client.Get(ctx, key).Val())
}
```

> 测试时可在 `Watch` 内 `time.Sleep` 期间另开一个客户端执行 `set price 200`，即可观察到 `exec` 失败（返回 `redis.TxFailedErr`）的效果

## 分布式锁(SET NX 悲观锁)

> 面试高频。上一节的 WATCH 是**乐观锁**，这里的 SET NX 是**悲观锁 / 互斥锁**，两者是分布式锁的两种不同思路

### 核心原理：先把 NX 理解透

Redis 的每个 key 都是全局唯一的，同一时刻只能存一份值。所以只要约定「**谁把值写进了这个 key，谁就持有锁**」，就能实现互斥：想进临界区，就必须等这个 key 被删掉或过期

- `SET key value`：无条件写入（不管里面有没有东西）
- `SET key value NX`：**仅当 key 不存在时**才写入（NX = **N**ot e**X**ists），这就是"加锁"
- `SET key value NX EX 30`：仅在 key 不存在时写入，并设置 30 秒过期
- `SET key value XX`：**仅当 key 已存在时**才写入（XX = e**X**ists），常用于锁续期

**为什么必须写在一条命令里**：Redis 命令是单线程执行的，一条命令中途不会被打断。`SET ... NX` 把「检查 key 是否存在 + 写入 + 设置过期」放在一条命令中原子完成，中间插不进其他客户端的操作。如果拆成两步（先 GET 判断、再 SET），两步之间就可能被别人抢先，这就是**竞态**

```bash
# 加锁：成功返回 OK，失败返回 nil
127.0.0.1:6379> SET lock:order:1001 user-A NX EX 30
OK
# key 已存在，NX 条件不满足，加锁失败
127.0.0.1:6379> SET lock:order:1001 user-B NX EX 30
(nil)

# 老式写法：SETNX 只能"设置"，不能同时设置过期，两步之间可能死锁
127.0.0.1:6379> SETNX lock:order:1001 user-A
(integer) 1
127.0.0.1:6379> EXPIRE lock:order:1001 30
(integer) 1
```

> 三个必须知道的点：

1. **必须带过期时间（EX）**：持锁的进程可能崩溃。没有过期时间的 key 会永远存在，谁也别想再拿到锁 → **死锁**
2. **value 必须每个持有者唯一**：释放锁时要靠它确认"这把锁还是我的"。真实项目里用 UUID / 请求 id
3. **解锁必须比对 value 再删**：直接 `DEL` 有可能删掉别人的锁（自己的锁已超时、又被别人拿到）。而且"比对 + 删除"也要用 Lua 保证原子性

### go处理分布式锁(SET NX)

> 对应 `pkg/utils.go` 中的 `RedisDistributedLockNX`。用 go-redis/v9 的 `SetArgs{Mode: "NX", TTL: ...}`，等价于命令 `SET key value NX EX 30`

```go
// 分布式锁 (SET NX)
func RedisDistributedLockNX(client *redis.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	key := "lock:order:1001" // 锁的 key，一般用"业务前缀 + 资源 id"命名
	// 锁的 value 必须每个持有者唯一，释放时才能校验"这是不是我的锁"
	// （真实项目里通常用 UUID / 请求 id，这里用时间戳模拟）
	token := fmt.Sprintf("user-A-%d", time.Now().UnixNano())

	// 先删掉上次运行残留的锁，保证重复运行结果稳定
	client.Del(ctx, key)

	fmt.Println("=== 分布式锁 (SET NX) 机制演示 ===")

	// ==========================================
	// 1. 错误示范：SETNX + EXPIRE 分成两条命令
	// ==========================================
	// 问题：两条命令之间如果程序崩溃或网络中断，过期时间没设上，
	// 这个 key 就永远存在，别人再也拿不到锁 → 死锁。
	// 而且 SETNX 本身也是非原子的（只能"设置"，不能"设置 + 过期"一起做）。
	ok, err := client.SetNX(ctx, key, token, 0).Result() // 0 表示不设过期时间
	if err != nil {
		fmt.Println("① SetNX 执行出错:", err)
		return
	}
	fmt.Println("① SetNX 是否拿到锁:", ok) // true
	client.Expire(ctx, key, 30*time.Second)
	fmt.Println("① 补设过期时间 TTL:", client.TTL(ctx, key).Val()) // 30s

	// ==========================================
	// 2. 正确姿势：SET key value NX EX 一步到位（原子操作）
	// ==========================================
	// 用 SetArgs + Mode:"NX" + TTL，等价于命令：SET key value NX EX 30
	// 加锁失败不是"报错"，而是返回 redis.Nil（表示 key 已存在，没抢到）
	client.Del(ctx, key) // 先释放上面的锁，方便演示

	_, err = client.SetArgs(ctx, key, token, redis.SetArgs{
		Mode: "NX",             // 仅当 key 不存在时才设置
		TTL:  30 * time.Second, // 同时设置过期时间，防止持锁者崩溃导致死锁
	}).Result()
	if err == redis.Nil {
		fmt.Println("② 加锁失败：锁已被其他客户端持有")
	} else if err != nil {
		fmt.Println("② 加锁出错:", err)
		return
	} else {
		fmt.Println("② 加锁成功，锁的持有者:", client.Get(ctx, key).Val()) // user-A-xxx
	}

	// ==========================================
	// 3. 模拟另一个客户端来抢同一把锁，必然失败
	// ==========================================
	_, err = client.SetArgs(ctx, key, "user-B", redis.SetArgs{
		Mode: "NX",
		TTL:  30 * time.Second,
	}).Result()
	fmt.Println("③ 客户端B 是否抢到锁:", err != redis.Nil) // false，抢锁失败

	// ==========================================
	// 4. 释放锁：先比对 value，确认是自己的锁再删，否则会误删别人的锁
	// ==========================================
	// 复用 Lua 脚本实现"读-判断-删"的原子性，思路和 RedisLuaScript 里的解锁完全一致
	unlockScript := `
        if redis.call("GET", KEYS[1]) == ARGV[1] then
            return redis.call("DEL", KEYS[1])
        else
            return 0
        end
    `

	// 场景 A: 用错误的 token 释放，应该失败，锁完好无损
	resultA := client.Eval(ctx, unlockScript, []string{key}, "user-B")
	fmt.Println("④ 错误持有者尝试释放:", resultA.Val())             // 0
	fmt.Println("   验证锁是否还在:", client.Get(ctx, key).Val()) // user-A-xxx

	// 场景 B: 用正确的 token 释放，应该成功
	resultB := client.Eval(ctx, unlockScript, []string{key}, token)
	fmt.Println("④ 正确持有者释放锁:", resultB.Val())                  // 1
	fmt.Println("   释放后锁是否存在:", client.Exists(ctx, key).Val()) // 0
}
```

> go-redis 的两个使用要点：

- `SetNX(ctx, key, token, 0)` 的第 4 个参数是过期时间，`0` 表示不设过期；返回值 `true` 表示原来 key 不存在、加锁成功
- **加锁失败不是返回** **`false`，而是** **`err == redis.Nil`**，这是 go-redis 最容易踩的坑
- 释放锁复用 Lua 脚本，和上面 `RedisLuaScript` 里的解锁思路完全一致

### WATCH 与 SET NX 的区别

| <br /> | WATCH（乐观锁）           | SET NX（悲观锁）          |
| ------ | -------------------- | -------------------- |
| 思路     | 假设没人抢，提交时发现被改才失败重试   | 抢不到就放弃/重试，先拿到锁才干活    |
| 加锁方式   | 不显式加锁，只监听 key 变化     | 用 key 本身当锁           |
| 释放方式   | 事务结束自动解除             | 手动 `DEL`（需比对 value）  |
| 适用场景   | 冲突较少的"读-改-写"（如计数器自增） | 互斥资源控制（抢购、异步任务、定时任务） |

## 持久化

Redis是一个内存数据库，数据保存在内存中，但是我们都知道内存的数据变化是很快的，也容易发生丢失
辛好Redis还为我们提供了持久化的机制，分别是RDB(Redis DataBase)和AOF(Append Only File)

- **RDB**：就是在不同的时间点，将redis存储的数据生成快照并存储到磁盘等介质上；
- **AOF**：则是换了一个角度来实现持久化，那就是将redis执行过的所有写指令记录下来，在下次redis重新启动时，只要把这些写指令从前到后再重复执行一遍，就可以实现数据恢复了

redis数据落盘的完整过程：

1. 客户端向服务端发送写操作(数据在客户端的内存中)
2. 数据库服务端接收到写请求的数据(数据在服务端的内存中)
3. 服务端调用write这个系统调用，将数据往磁盘上写(数据在系统内存的缓冲区中)
4. 操作系统将缓冲区中的数据转移到磁盘控制器上(数据在磁盘缓存中)
5. 磁盘控制器将数据写到磁盘的物理介质中(数据真正落到磁盘上)

### RDB持久化

默认是开启的，默认的存储文件是 `dump.rdb`

```conf
dbfilename dump.rdb
dir ./
```

触发rdb备份：

1. 配置自动备份

```conf
save 3600 1
save 300 100
save 60 10000
```

> 含义：3600秒至少1次修改；300秒至少100次修改；60秒至少10000次修改，触发bgsave

1. 手动命令备份

- `save`：主线程阻塞做快照，生产不建议使用
- `bgsave`：redis会fork子进程，后台异步进行快照操作，快照同时还可以响应客户端请求
- `lastsave`：获取最后一次成功生成快照的时间戳

### AOF持久化

AOF默认是关闭的，需要手动开启，修改redis.conf配置文件

> phpstudy环境要修改redis实际目录下的conf，软件面板内修改重启会丢失

```conf
appendonly yes
appendfilename "appendonly.aof"
# appendfsync always
appendfsync everysec
# appendfsync no
dir ./
```

- `appendfsync always`：每次写入立即同步磁盘，最安全，性能差
- `appendfsync everysec`：每秒同步（默认推荐），最多丢失1秒数据
- `appendfsync no`：交给操作系统刷盘，不可控，丢失数据风险大

