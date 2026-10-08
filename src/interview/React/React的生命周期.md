# 生命周期

React组件生命周期分为三个阶段：

1. 挂载阶段：
   1. constructor：初始化组件状态 以及 绑定事件处理程序，一次
   2. render()：挂载前\更新前 调用，输出虚拟DOM
   3. componentDidMount()：挂载后立即调用，DOM操作、网络请求等初始化在这里
2. 更新阶段：
   1. shouldComponentUpdate(nextProps, nextState)：决定某个组件是否需要更新，通过比较 props与state决定
   2. componentDidUpdate()：更新完后的钩子
3. 卸载阶段：
   1. componentWillUnmount()：组件即将卸载，在卸载前的钩子，可以做些事件移除，闭包、定时器的清理

现在的函数式组件统一使用 useEffect 方法搭配依赖数组实现初始化、更新、卸载清理的逻辑，业务逻辑更加内聚，简单优雅
