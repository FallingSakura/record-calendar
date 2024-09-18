# Calendar

[Calendar Demo](https://calendar.fallingsakura.top)

这是一个时间记录管理软件。

在这里你可以记录每天的感受（好和不好各有三个等级），没有一般的选项，所以需要思考你的一天到底过的怎么样。

**目前功能：**
- 日历视图索引
- 流畅好看的切换动画
- 存储记录当天的数据（目前未正式发布，网页端刷新后数据重置）
- 左键指数 $+1$，右键指数 $-1$
- 感受指数越高，色彩越暖越鲜艳；感受指数越低，色彩越冷越黯淡；当天默认使用蓝色指示（阴影）
- 顶部控制面板（从左到右顺序）：
	- 定位到当前日期
	- 切换到年视图(heatmap)
	- 登陆/登出
- 年视图下悬浮可查看当天信息（~~因为懒~~为了简约所以没有星期和月的索引）
- 账号系统+数据存储

**Demo:**

![](https://falling-sakura1-1316699389.cos.ap-nanjing.myqcloud.com/image/202409181424723.webp)

前端使用 Vue3，后端使用 Express，数据库使用 MongoDB。

目前正在开发中，~~不知道会不会~~已上线，欢迎使用体验。

**To-Dos：**

- [x] Serverless 部署云函数，后端对接数据库，支持在线同步。
- [ ] 日记/周记/年记功能，点击相应日期即可跳转到对应页面，可进行编辑。
- [ ] 切换模式按钮，切换日记模式还是增减指数模式。
- [ ] 输入框跳转到对应日期。
- [ ] 对接 Obsidian 等笔记软件实现同步。
- [ ] 通过 Toggl Track API 实现时间管理的视图页面。
- [ ] 用户登录数据同步。
- [ ] ~~Android 端。~~
- [ ] 离线使用。
