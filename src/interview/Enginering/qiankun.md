# 乾坤

## Qiankun（乾坤）—— 行业老牌，配置式框架

> Qiankun 是目前市场占有率最高的，底层基于 single-spa 二次封装。
> 底层架构与兼容性：

- 它是配置式的。主应用通过 registerMicroApps 注册子应用的入口（URL），监听路由变化。子应用必须改造，手动暴露 bootstrap、mount、unmount 三个生命周期钩子。主应用拿到钩子后，手动把子应用渲染到指定的容器里。

> 怎么实现的兼容与隔离:

- JS 沙箱（防污染）：使用 Proxy（ES6 代理） 劫持子应用对 window 对象的读写。子应用挂载时，创建一个 fakeWindow，把读写操作重定向到这个假对象上；卸载时销毁假对象，从而保护主应用的全局环境。如果不支持 Proxy，它会降级为快照沙箱（执行前把 window 属性拍个快照，卸载时恢复）。
- 样式隔离（防冲突）：采用运行时 CSS 前缀重写。利用 MutationObserver 监控 DOM 变化，一旦有 或类名插入，就动态地给所有 CSS 选择器加上作用域前缀（例如 .qiankun-vue-app .btn），防止样式互相打架。也可以开启严格模式，使用原生 Shadow DOM。
- 资源加载：通过 import-html-entry 库，利用 fetch 请求抓取子应用的 HTML 字符串，然后正则解析出里面的 JS/CSS 资源，再用 eval 或动态创建 标签执行 JS。
