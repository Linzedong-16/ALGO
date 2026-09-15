## 登录鉴权的Token怎么处理？

①存储：优先后端下发 HttpOnly+Secure+SameSite 的 Cookie 保存 refresh_token，JS 不可读取，自动携带，防 XSS 与 CSRF；如果用 localStorage 存 access_token，风险更高，容易被 XSS 窃取，需要手动在请求头挂载 token。
②拦截：请求拦截器注入 token；响应拦截捕获 401 代表凭证失效，清除凭证跳转登录；403 是认证成功但无权限，仅弹窗提示。
③续签：使用双 Token 方案，access_token 短期，过期后利用 refresh_token 做无感刷新；退出或踢下线，不仅前端清理存储，后端要将 refresh_token 拉黑销毁。
④安全：全站 HTTPS，Cookie 安全属性，合理设置过期时间，前端做好 XSS 防护。

## Token到底存哪里？

1. cookie：httpOnly(禁止JS脚本运行) + secure(必须https传输) + Samesite(限制跨站携带)
2. storage：场景更多，前端很方便处理管理生命周期，灵活，但后端必须严格把控
3. 后端的处理：
   1. https必须
   2. 缩短token有效期，通过双token机制轮换刷新令牌，RT可以存cookie中
   3. Token严格校验
   4. 维护黑名单机制实现主动作废把用户踢下线
   5. 绑定用户关键特征，如IP属地 变动直接让用户直接重新登录
   6. 登录账号防暴力破解，冻结账号等
