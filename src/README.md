# 项目目录描述

|名称|目录地址|描述|
|:-------:|:--------------:|:----------:|
|components`<components>`|./compoents/|业务通用组件|
|pages`<pages>`|./pages/|MRN工作台主要页面目录|
|stores|./stores/|存放全局共用数据（没必要引用redux)|
|styles|./styles/|通用样式目录|
|utils|./utils/|抽象工具类方法目录|
|index.tsx|./index.tsx|当前业务主要JS入口|


##### components描述

|名称|目录地址|描述|
|:-------:|:--------------:|:----------:|
|header|./components/layout/header| 页面头部组件 |
|footer|./components/layout/footer| 页尾组件 |
|crumbs|./components/crumbs/| 面包屑导航 |
|slideBar|./components/slideBar/| 侧边栏导航 |
|smallInputSave|./components/smallInputSave/| input 取消保存 功能组件、版本管理等-目前未使用 |
|solvePersonInfo|./components/solvePersonInfo/| 聚类列表中跟进人的详细信息展示组件 |
|taskStatusTags|./components/taskStatusTags/| 工单状态组件 |
|tabpanes|./components/tabpanes/| 分页窗组件，聚类列表和问题列表通用业务组件 |
|FilterFunction|./components/FilterFunction/| 聚类列表、问题列表栏目页的筛选器模块 |
|clusterHeader|./components/clusterHeader/| 聚类列表、问题列表、日志详情页的顶部组件 |
|clusterTags|./components/clusterTags/| 聚类列表、问题列表页的标签组件 |
|highcharts|./components/highcharts/| 聚类列表、问题列表页用的图标组件 |
|pagination|./components/pagination/| 分页器组件 |
|rangePickerCalendar|./components/rangePickerCalendar/| 日历选择器组件 |

##### pages描述
|名称|目录地址|描述|
|:-------:|:--------------:|:----------:|
|clusterlist|./pages/clusterlist| MRN聚类列表页 |
|clustermessage|./pages/clustermessage| MRN聚类列表 - 单条问题列表 |
|clusterdetailed|./pages/clusterdetailed| MRN聚类列表 - 单条问题列表 - 单条时间段日志详情 |
|authorityoverview|./pages/authorityoverview| MRN工作台权限设置页面 |
|member|./pages/member| MRN工作台成员管理页 |
|task|./pages/task| MRN工作台工单管理页 |
|abnormal|./pages/abnormal|异常路由时进入的页面展示: 401、403、404等|

# 工作台相信息


### 测试环境sso:   
+ client-id=performance