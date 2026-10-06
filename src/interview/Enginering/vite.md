## webpack和vite区别

1. 核心差异：
   1. webpack：启动时全量打包，依赖预编译，把所有模块打包成bundle后才交给浏览器，项目越大，启动越慢、热更新越卡
   2. vite：开发环境启动时不打包，基于浏览器原生ES Module，按需加载，启动秒开、热更新快
2. 关键区别：
   1. 启动速度：vite快、webpack慢
   2. 热更新：vite只更新修改的文件，更快
   3. 生产环境：vite调度rollup打包项目，webpack自己处理
   4. 依赖处理：webpack生态全，老项目兼容性好，vite轻量现代
   5. 依赖处理：vite还会调度esbuild做开发环境的依赖预构建，cjs转esm
