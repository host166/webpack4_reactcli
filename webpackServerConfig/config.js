"use strict";

/** 
 * 这里单独提取出一些相关的配置项
 * 区分开发环境和生产环境，便于维护。
 * 保证代码清晰
*/

const path = require("path");
// const utils = require("./utils");
// 打包时的静态资源路径配置
let assetsConfig = {
    // 资源链接路径
    assetsPath : `//cloudbfe.oss-cn-hangzhou.aliyuncs.com`, //`https://test.xxx.com/static/webapp/`
    // 版本号：/2010/01/v1代表2010文件夹里的01文件夹下的v1版本 方式可自己定义
    version  : `/presalesystem/v1/`
};

module.exports = {
    // 开发时的配置
    dev: {
        // 资源子目录，指js，css，img存放的目录 也可以为空
        assetsSubDirectory: "",
        // 静态资源路径
        assetsPublicPath: "/",
        // 反向代理配置
        proxyTable: {
            // // 比如代理到本地
            // '/localhost/ajax/**': {
            //     target: 'http://localhost:1777',
            //     secure: false,  //if you want to verify SSL secure;  如果是HTTPS接口，需要配置此参数为true
            //     changeOrigin: true
            // }
        },
        // host，默认是localhost,代表本地服务器。
        // '0.0.0.0'代表本机可访问的所有IP地址。
        // can be overwritten by process.env.HOST
        host: "0.0.0.0",
        // prot，端口配置。
        // can be overwritten by process.env.PORT
        port: 8080,
        // 是否在浏览器上全屏显示编译的errors
        errorOverlay: true,
        // 是否在编译后自动在浏览器中打开页面
        autoOpenBrowser: false,
        // 使用eslint
        // useEslint: true,
        // 跨平台错误提示
        notifyOnErrors: true,
        // （devServer.watchOptions）对文件更改的监控。可以配置成数字。表示每多少秒检查文件是否更改; 该操作对于文件系统来说消耗较大,且在某些场景是不起作用的。
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserverwatchoptions-
        /**
         * Devtool: https://webpack.js.org/configuration/devtool/#development
         * Source Maps Types: 
         * eval： 生成代码 每个模块都被eval执行，并且存在@sourceURL
         * cheap-eval-source-map： 转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl
         * cheap-module-eval-source-map： 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能
         * eval-source-map： 原始代码 同样道理，但是最高的质量和最低的性能
         * cheap-source-map： 转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用
         * cheap-module-source-map： 原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射
         * source-map： 原始代码 最好的sourcemap质量有完整的结果，但是会很慢
        **/
        devtool: "cheap-module-eval-source-map",
        // 代码压缩后进行调bug定位将非常困难，于是引入sourcemap记录压缩前后的位置信息记录，开发时一般开启。
        cssSourceMap: true,
        // 开启css-module model
        cssModules: true,
        // CSS的MD加密
        // localIdentName: true
    },
    // 打包时的配置
    build: {
        // index编译后生成的位置和名字
        index: path.resolve(__dirname, `../dist/index.html`),
        // Paths
        assetsRoot: path.resolve(__dirname, `../dist`),
        assetsSubDirectory: "",   // 如果设置就会多产生一层静态资源目录作为路径
        assetsPublicPath:`${assetsConfig.assetsPath}${assetsConfig.version}`, //`${projectConfig.assetsPath}${projectConfig.ver}`, // 打包之后静态资源对应路径 （一般是CDN路径）
        // 开启gzip: npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        // 需要使用 gzip 压缩的文件扩展名
        productionGzipExtensions: ["js", "css"],
        productionSourceMap: false,     // 是否将错误消息位置映射到模块
        devtool: "source-map",          // 可设置为：false
        cssModules: true,
        // 分析插件依赖 可视化： https://www.npmjs.com/package/webpack-bundle-analyzer
        // It will create an interactive treemap visualization of the contents of all your bundles. `npm run build --report`
        bundleAnalyzerReport: process.env.npm_config_report
    }
};