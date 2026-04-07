## IOC与DI

### 基本概念

#### IOC（Inversion of Control，控制反转）

> IOC 是一种设计模式，核心思想就是把对象的创建和依赖关系的管理从代码中分离出来，交给容器来负责。这样做的好处是：

- **解耦**：降低了组件之间的耦合度
- **可维护性**：提高了代码的可维护性和可测试性
- **可扩展性**：便于添加新的功能和组件

#### DI（Dependency Injection，依赖注入）

> DI 是 IOC 的一种实现方式，它允许我们将依赖项注入到组件中，而不是让组件自己创建依赖项。在 NestJS 中，DI 主要通过构造函数注入实现。

### 实现一个简单的依赖模型

#### 功能模块设计

> 我们先来实现三个具有典型依赖关系的服务模块：

- **Logger**：简单的日志服务，负责记录日志信息
- **Database**：数据库服务，依赖 Logger 来记录连接信息
- **UserService**：用户服务，依赖 Database 和 Logger 来处理用户业务

#### 传统实现方式（紧耦合）

基于 OOP 的思想，我们先来看看传统的实现方式：

```ts
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

main();
```

**输出结果**：

```
[LOG] Getting user with id: 1
[LOG] Connecting to database...
User: { id: 1, name: 'John Doe' }
```

#### 传统方式的问题分析

> 上面这段代码为了实现三个服务间的依赖关系，直接把所依赖的服务在类中创建对象，这种方式存在以下问题：

1. **紧耦合**：每个服务间的依赖关系都是硬编码实现的，一个模块的修改可能会导致其他依赖模块直接报错
2. **可测试性差**：无法轻松替换依赖为模拟对象，测试时需要操作真实的外部服务
3. **资源浪费**：实际运行时，面对高并发场景，每个相同的请求都需要创建一个 UserService 实例，另外每个实例也会创建独立的 Database 和 Logger 实例，每个请求必然会产生大量重复对象的堆积
4. **内存泄漏风险**：如果对象无法及时销毁，必然造成内存泄漏问题
5. **配置管理困难**：依赖的配置硬编码在组件内部，修改配置需要修改代码

### 依赖模型简单优化（引入 IOC 容器）

#### 设计思想

"没有什么问题是加一个中间层解决不了的，如果有就..."

> 为了避免类声明时直接创建实例、实际运行时频繁创建销毁实例，我们引入一个 **IOC（控制反转）容器** 的中间层，把原来类声明时创建对象的代码解耦出去，将所有服务创建对象的权力交由 IOC 容器统一管理

#### IOC 容器实现

```ts
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
main();
```

**输出结果**：

```
[LOG] Getting user with id: 1
[LOG] Connecting to database...
User: { id: 1, name: 'John Doe' }
```

#### 代码解析

1. **IOC 容器**：
   - `Container` 类实现了一个简单的依赖注入容器
   - `register` 方法用于注册依赖
   - `get` 方法用于获取依赖
2. **依赖注入**：
   - 所有依赖都通过构造函数注入
   - 容器负责管理依赖的创建和生命周期
   - 当需要一个服务时，从容器中获取，而不是直接创建
3. **优势**：
   - **解耦**：组件之间通过接口而非具体实现依赖
   - **可测试性**：可以轻松替换依赖为模拟对象
   - **可维护性**：依赖关系集中管理，易于修改
   - **可扩展性**：添加新功能时，只需注册新的依赖

### 扩展 - 关于 new 关键字的黑魔法

#### 问题分析

> 上面代码的 IOC 容器实现依旧是使用 `new` 去实例化对象，从框架设计的角度出发，这样就是硬编码，`new` 和类名有强绑定的关系。虽然模块间的依赖关系是解耦了，但 IOC 容器仍然是需要手动实例化的

#### 反射 API 与自动实例化

> 实际的 NestJS 等框架都会用反射 API 动态获取类型，自动实例化对象，实现实例的全流程管理。在 JavaScript/TypeScript 中，我们可以使用 `Reflect.construct()` 方法来动态创建对象实例

**Reflect.construct() 语法**：

```ts
Reflect.construct(targetClass, argumentsList);
```

其中：

- `targetClass`：要实例化的类
- `argumentsList`：传递给构造函数的参数数组

### 总结

> 通过IOC 容器实现，给业务模块提供依赖管理的中间件，实现了模块之间的解耦和可维护性
