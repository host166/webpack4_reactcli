"use strict";
/** 
 * webpack本地开发时的配置项
*/

const path       = require("path");
const webpack    = require("webpack");
const merge      = require("webpack-merge");
const utils      = require("./utils");
const config     = require("./config");
const baseConfig = require("./base");

// 插件 - 获取当前可用的port
const portfinder = require("portfinder");
// 插件 - webpack中拷贝文件和文件夹
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 插件 - 识别某些类别的webpack错误，处理清理，聚合和优先级，以提供更好的开发人员体验
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// 插件 - 使用html-webpack-plugin插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 插件 - 主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// 配置项 - 声明当前系统服务的host
const HOST = process.env.HOST;
// 配置项 - 声明当前系统服务的端口号
const PORT = process.env.PORT && Number(process.env.PORT);

// 开发模式下 webpack的主要配置
const developConfig = merge(baseConfig,{
    mode: "development",
    // 模块
    module: {
      rules: utils.styleLoaders({
        sourceMap: config.dev.cssSourceMap,
        usePostCSS: true                    //是否使用PostCSS插件
      })
    },
    devtool: config.dev.devtool,    // cheap-module-eval-source-map is faster for development
    // 用于快速开发应用程序
    devServer: {
        // type: 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none' | 'warning'
        // silent 关闭日志
        clientLogLevel: "warning",
        historyApiFallback: {                                   // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
          rewrites: [{
            from: /.*/,                                     // 定义源目录
            to: path.posix.join(                            // 定义目标文件，即跳转到指定目录下的index.html
                config.dev.assetsPublicPath,
                "/index.html"
            )
          }]
        },
        disableHostCheck: true,
        hot: true,                                              // 启动热更新
        contentBase: false,                                     // (since we use CopyWebpackPlugin) 使用 CopyWebpackPlugin替代此内置功能
        compress: true,                                         // 是否启用gzip 压缩
        host: HOST || config.dev.host,                          // 启动服务的host
        port: PORT || config.dev.port,                          // 端口号
        open: config.dev.autoOpenBrowser,                       // 是否默认打开浏览器
        overlay: config.dev.errorOverlay                        // 当存在编译器错误或警告时，在浏览器中显示全屏覆盖
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,                // 此路径下的打包文件可在浏览器中访问
        proxy: config.dev.proxyTable,                           // 反向代理配置
        quiet: true,                                            // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
        // 控制与监视文件相关的选项
        watchOptions: {
            poll: config.dev.poll   // 设置为正数
        }
    },
    // // 加载本地loader文件
    // resolveLoader: {
    //     modules: ['node_modules', 'webpackLoader']
    // },
    // 在开发环境下依赖的插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),   // 模块热替换（HRM），在更新时在控制台中显示正确的文件名。
        new webpack.NamedModulesPlugin(),           // 热加载时直接返回更新文件名
        new webpack.NoEmitOnErrorsPlugin(),                 // 捕获到日志错误时，返回false，不输出错误日志，也不会遇到代码就退出。
        new HtmlWebpackPlugin({
          filename: "index.html",
          template: path.resolve(__dirname,"../src/index.html"),
          inject: true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
          from: path.resolve("public"),                                     // 定义要拷贝的源文件
          to: config.dev.assetsSubDirectory,                                // 定义要拷贝到的目标文件夹
          ignore: [".*"]                                                    // 忽略拷贝指定的文件
        }])
    ]
});


module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  // 获得端口，如果端口被占用，则执行端口+1操作
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // 对进程中的port进行赋值·
      process.env.PORT = port;
      // add port to devServer config
      developConfig.devServer.port = port;

      // 添加FriendlyErrorsPlugin插件到队列中
      developConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [ // ${developConfig.devServer.host}
              `请点击此处运行您的应用: http://localhost:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      );

      resolve(developConfig);
    }
  });
});