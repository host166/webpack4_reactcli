"use strict";
/** 
 * webpack打包时的配置项
 * 
 */
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const utils = require("./utils");
const config = require("./config");
const baseConfig = require("./base");


// 插件 - 主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 插件 - 此插件使用uglify-js进行js文件的压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 插件 - 压缩、去重提取css
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
// 插件 - webpack中拷贝文件和文件夹
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 插件 - 获取当前可用的port
// const portfinder = require("portfinder");
// 插件 - 使用html-webpack-plugin插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 插件 - 识别某些类别的webpack错误，处理清理，聚合和优先级，以提供更好的开发人员体验
// const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

// 生产模式下 webpack的主要配置
const produceConfig = merge(baseConfig, {
    mode: "production",
    // 模块
    module: {
      rules: utils.styleLoaders({
        sourceMap: config.dev.cssSourceMap,
        extract: true, // 提取样式到文件中
        usePostCSS: true // 是否使用PostCSS插件
      })
    },
    // Source Map等
    devtool: config.build.devtool,
    // 输出
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath("js/[name].[contenthash:7].js"), // .[chunkhash]
      chunkFilename: utils.assetsPath("js/[name].[contenthash:7].js") // .[chunkhash]
    },
    optimization: {
      minimize: true,
      minimizer: [
        // 使用uglify-js进行js文件的压缩: https://blog.csdn.net/u013884068/article/details/83511343
        new UglifyJsPlugin({
          extractComments: /(@extract notes)/i,
          uglifyOptions: {
            compress: {
              // webpack删除没有用到的代码时不输出警告
              warnings: false,
              // 是否删除所有console.log语句
              drop_console: true
            }
          },
          sourceMap: config.build.productionSourceMap,
          parallel: true // 使用多进程并行运行来提高构建速度
        }),
        // 压缩、去重提取css
        new OptimizeCSSPlugin({
          cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true }
        })
      ],
      moduleIds: 'hashed',    // hashed，它会导致更小的文件束
      splitChunks: {
        // automaticNameDelimiter: '-', // 链接模块名之间的标签
        // chunk: "all",    // 同步和异步?
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/, //打包第三方库
            chunks: "all",
            priority: -10 // 优先级
          },
          common: { // 打包其余的的公共代码
            minChunks: 2, // 引入两次及以上被打包
            name: 'common', // 分离包的名字
            chunks: 'all',
            priority: 5
          }
          // reactbuild: {
          //   chunks:"all",
          //   test:/(react)/,  
          //   name: "reactbuild",
          //   minChunks: 1,
          //   enforce: true,
          //   priority: 2
          // }
        }
      },
      // optimization.runtimeChunk 用来提取 entry chunk 中的 runtime部分函数，形成一个单独的文件，这部分文件不经常变换，方便做缓存。
      runtimeChunk: {
        name: `reactManifest`  //'manifest'
      }
    },
    plugins: [
        // 将CSS提取到文件中
        new MiniCssExtractPlugin({
            filename: utils.assetsPath("css/[name].[contenthash:7].css"), //.[contenthash] || .[hash]
            chunkFilename: utils.assetsPath("css/[name].[contenthash:7].css"),
            allChunks: true
        }),
        // 根据模块的相对路径生成一个四位数的hash作为模块id: https://webpack.docschina.org/plugins/hashed-module-ids-plugin/
        new webpack.HashedModuleIdsPlugin(),
        // 作用域提升(scope hoisting), 预编译所有模块到一个闭包中。
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
          filename: config.build.index,
          template: resolve("src/index.html"),
          inject: true,
          minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
          },
          // type: 'none' | 'auto' | 'dependency' | 'manual' | {Function}
          chunksSortMode: "dependency"
        }),
        // copy指定文件夹的静态数据
        new CopyWebpackPlugin([{
            from: resolve("public"),
            to: config.build.assetsSubDirectory,
            ignore: [".*"]
        }])
    ]
});

module.exports = produceConfig;


// 路径获取的封装
function resolve(dir) {
    return path.join(__dirname, "..", dir);
};