"use strict";
/** 
 * webpack基础配置
 */

const path = require("path");
const config = require("./config.js");
const utils = require("./utils");

// 插件 - 分解任务和多线程管理
// const HappyPack = require("happypack");
// 配置项 - 创建进程池，分步运算文件
// const HappyThreadPool = HappyPack.ThreadPool({ size: 5 });
// console.log(`path.resolve(__dirname,'./src')`, path.resolve(__dirname,`../src`));
// 环境判断
const isProduction = process.env.npm_config_NODEENV === "production";
const BaseConfig = {
    entry: {
        app: resolve(`src/index.jsx`)
    },
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        chunkFilename: "[name].[contenthash:7].chunk.js",
        // 配置CDN路径
        publicPath: isProduction ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    // 配置寻找模块的规则
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".json"],
        // 配置别名 让你在开发的时候更舒服
        alias: {
            "@": resolve("src")
        }
    },
    // 防止将某些 import 的包(package)打包到 bundle 中
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
      // "react-router-dom": "ReactRouterDOM"
    },
    // 配置处理模块的规则
    module: {
        rules: [{
          test: /\.(js|jsx|ts|tsx)$/,                                     
          loader: "babel-loader", 
          // use: ["happypack/loader?id=babel&cacheDirectory"],
          // use: ["babel-loader?cacheDirectory=true"],
          //针对特定目录内的文件
          include: [
            resolve("src"),
            resolve("test")
          ],
          exclude: /(node_modules)/
        },{
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 匹配图片文件
          loader: "url-loader",
          options: {
            limit: 1024, // limit: 1024,限制 图片大小 1kB，小于限制会将图片转换为 base64格式
            name: utils.assetsPath("img/[name].[contenthash:7].[ext]") // 图片名称进行hash处理
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 匹配音频文件
          loader: "url-loader",
          options: {
            limit: 1024,
            name: utils.assetsPath("media/[name].[contenthash:7].[ext]")
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 匹配字体文件
          loader: "url-loader",
          options: {
            limit: 1024,
            name: utils.assetsPath("fonts/[name].[contenthash:7].[ext]")
          }
        }
        // {
        //     test: /\.(jsx|js)$/,
        //     loader: 'eslint-loader',
        //     exclude: /node_modules/, // 不检测的文件
        //     enforce: 'pre', // 编译前检查
        //     include: [path.resolve(`src`)], // 指定检查的目录   //[resolve("client")],
        //     options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
        //         formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        //     }
        // }
        ]
    },
    plugins: [
        // new HappyPack({
        //     // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
        //     id: 'babel',
        //     // 使用共享进程池中的子进程去处理任务。
        //     threadPool: HappyThreadPool,
        //     // 如何处理.js文件，用法和Loader配置是一样的
        //     loaders: [{
        //         loader: 'babel-loader',
        //         options: { cacheDirectory: true }
        //     }]
        // })
    ],
    // 用于从配置中解析入口起点
    context: path.resolve(__dirname, "../"),
    // node自带的模块，不需要安装，但有时候在实际项目中引入会报错，所以在此设置
    node: {
        setImmediate: false,
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty"
    }
};

// if( isProduction ){
    // BaseConfig.entry['mainClient'] = resolve("client/mainClient.js");
// };

module.exports = BaseConfig;

// 路径获取的封装
function resolve(dir) {
    return path.join(__dirname, "..", dir);
};