package pkg

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

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

// List 基础操作
func RedisListOperations(client *redis.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	client.LTrim(ctx, "list", 1, 0)
	// 1. 从右边入队，插入4个元素
	client.RPush(ctx, "list", "TS", "Rust", "Python", "Zig")

	// 2. 获取列表长度
	length := client.LLen(ctx, "list").Val()
	fmt.Println("列表长度:", length) // 输出: 4

	// 3. 获取列表所有元素 (索引从 0 到 -1 代表全部)
	vals := client.LRange(ctx, "list", 0, -1).Val()
	fmt.Println("列表所有元素:", vals)
}

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
