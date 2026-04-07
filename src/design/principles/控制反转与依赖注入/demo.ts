// 传统开发方式
class Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

class Database {
  private logger: Logger;

  constructor() {
    // 直接在类内部创建依赖
    this.logger = new Logger();
  }

  connect() {
    this.logger.log('Connecting to database...');
    return 'Database connected';
  }
}

class UserService {
  private database: Database;
  private logger: Logger;

  constructor() {
    // 直接在类内部创建依赖
    this.database = new Database();
    this.logger = new Logger(); // 重复创建 Logger 实例
  }

  getUser(id: number) {
    this.logger.log(`Getting user with id: ${id}`);
    this.database.connect();
    return { id, name: 'John Doe' };
  }
}

// 使用服务
function main() {
  // 直接创建服务实例
  const userService = new UserService();
  const user = userService.getUser(1);
  console.log('User:', user);
}

Deno.test('测试耦合代码', () => {
  console.time('耗时');
  main();
  console.timeEnd('耗时');
});

/**
 *  [LOG] Getting user with id: 1
 *  [LOG] Connecting to database...
 *  User: { id: 1, name: "John Doe" }
 *  耗时: 1.01ms
 */
