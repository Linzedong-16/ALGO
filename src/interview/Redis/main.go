package main

import (
	"context"
	"fmt"
	"go-redis-practice/pkg"
	"time"

	"github.com/redis/go-redis/v9"
)

var DB *redis.Client

func Connect() *redis.Client {
	redisDB := redis.NewClient(&redis.Options{
		Addr:        "127.0.0.1:6379",
		Password:    "123456",
		DB:          1,
		DialTimeout: time.Second,
	})

	_, err := redisDB.Ping(context.Background()).Result()

	if err != nil {
		panic(err)
	}

	fmt.Println("Redis响应：", redisDB, err)

	return redisDB
}

func main() {
	DB = Connect()

	// pkg.RedisStringOperations(DB)
	// pkg.RedisListOperations(DB)
	// pkg.RedisHash(DB)
	// pkg.RedisSet(DB)
	// pkg.RedisZSet(DB)

	pkg.RedisPipelineAndAtomicty(DB)
	pkg.RedisLuaScript(DB)
	pkg.RedisWatch(DB)
}
