# useReducer

## 和useState区别

> useState 管理状态时面对比较复杂的情况，可能遇到多个state关联、状态之间相互依赖、写了很多相关回调函数导致代码逻辑分散，代码不优雅
> useReducer借鉴了Redux的思想，`const [state, dispatch] = useReducer(reduce, initialState)`,reduce是专门用于处理状态更新逻辑的纯函数，而
> dispatch专门用于向reduce函数传递 action 去计算返回新的state值，通过这样的设计，将UI与数据逻辑解耦，并且将逻辑整合管理

1. 触发时机：useState 通过setState 传值或回调 更新状态，useReducer 用 dispatch 分发一个 action，会先交由reduce这个纯函数计算出 新state才能更新
2. 场景不一：简单独立值用useState，状态设计要求多、涉及多状态影响、会因此导致新增过多新回调函数，都可以使用 useReducer 去抽离状态更新逻辑去优化
3. 解决问题：主要的价值在于，把状态变更的逻辑通过 reducer纯函数彻底与UI解耦，函数组件中不会散落过多回调函数声明，让代码书写更优雅、开发体验更好

> 原来在ui组件里面要写很多回调处理 state逻辑并直接绑定到UI，现在只要在UI绑定 只负责派发任务的dispatch函数，真正处理逻辑的 reducer函数可以封装抽离出来，与UI没有任何绑定

总之，简短独立的状态用useState，有复杂的状态逻辑就用useReducer

## 引用稳定

1. useState 的状态更新函数直接传给 子组件，因为触发渲染时每次传递的都是 新函数，引用有变化，子组件的 React.memo 优化不起作用
2. 一般可以使用 useState + useCallBack 将 更新函数包裹保证稳定的引用，这样就能被缓存命中
3. 而 useReducer的 dispatch 不会用这种问题，引用更加稳定，整个组件生命周期都是同一个引用，不会有以上问题
