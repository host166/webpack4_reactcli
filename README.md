# 如何启动微服务？

```
语法输出：
  npm run dev
  npm run build
```


cross插件设置
`cross-env NODE_ENV=development`


# 工程目录说明 src/
|目录名|描述|
|:------:|:----------:|
|./webpackServerConfig|webpack的基础配置在这里|
|./public|通用脚本或第三方插件|
|./webpackPlugins|webpack工程插件开发目录|
|./src/assets/`styles`|前端通用样式目录，可以存放通用样式，第三方样式库|
|./src/`common`|common公共脚本|
|./src/`pages`|spa页面入口|

`pages`

|目录名|描述|
|:------:|:----------:|
|./home|系统首页|

`common`

|目录名|描述|
|:------:|:----------:|
|library/|三方代码库|
|utils/|公共类方法|

`styles`

|目录名|描述|
|:------:|:----------:|
|./common.css|css reset和css通用样式库设置|


# 为什么统一技术栈

### 目标
+ 统一团队技术栈指标
+ 提升协作开发能力
+ 提升项目可维护性

### 价值
+ 高效的多人协作
+ 保证项目的可维护性
+ 提高项目的开发质量
+ 降低项目生产的风险

### 前端工程化四个方向
+ 模块化
+ 组件化
+ 规范化
+ 自动化


