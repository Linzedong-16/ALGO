// TypeScript OOP 示例：IOC 和依赖注入

// 1. 基础服务类
class Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

class Database {
  constructor(private logger: Logger) {}

  connect() {
    this.logger.log('Connecting to database...');
    return 'Database connected';
  }
}

class UserService {
  constructor(
    private database: Database,
    private logger: Logger
  ) {}

  getUser(id: number) {
    this.logger.log(`Getting user with id: ${id}`);
    this.database.connect();
    return { id, name: 'John Doe' };
  }
}

// 2. 简单的 IOC 容器实现
class Container {
  // deno-lint-ignore no-explicit-any
  private providers: Map<string, any> = new Map();

  // 注册提供者
  register<T>(token: string, provider: T) {
    this.providers.set(token, provider);
  }

  // 获取依赖
  get<T>(token: string): T {
    return this.providers.get(token) as T;
  }
}

// 3. 使用 IOC 容器和依赖注入
function main() {
  // 创建容器
  const container = new Container();

  // 注册依赖
  container.register('Logger', new Logger());
  container.register('Database', new Database(container.get('Logger')));
  container.register(
    'UserService',
    new UserService(container.get('Database'), container.get('Logger'))
  );

  // 使用服务
  const userService = container.get<UserService>('UserService');
  const user = userService.getUser(1);
  console.log('User:', user);
}

// 4. 运行示例

Deno.test('测试IOC容器解耦的代码', () => {
  console.time('耗时');
  main();
  console.timeEnd('耗时');
});

/*
输出结果：
[LOG] Connecting to database...
[LOG] Getting user with id: 1
[LOG] Connecting to database...
User: { id: 1, name: 'John Doe' }
*/

/*
代码解析：

1. 类的设计：
   - Logger：简单的日志服务
   - Database：数据库服务，依赖 Logger
   - UserService：用户服务，依赖 Database 和 Logger

2. IOC 容器：
   - Container 类实现了一个简单的依赖注入容器
   - register 方法用于注册依赖
   - get 方法用于获取依赖

3. 依赖注入的使用：
   - 所有依赖都通过构造函数注入
   - 容器负责管理依赖的创建和生命周期
   - 当需要一个服务时，从容器中获取，而不是直接创建

4. 优势：
   - 解耦：组件之间通过接口而非具体实现依赖
   - 可测试性：可以轻松替换依赖为模拟对象
   - 可维护性：依赖关系集中管理，易于修改
   - 可扩展性：添加新功能时，只需注册新的依赖

这个示例展示了 IOC 和依赖注入的基本原理，虽然实际的 NestJS 实现更加复杂，但核心思想是相同的。
*/
