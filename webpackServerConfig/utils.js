"use strict";

const path   = require("path");
const config = require("./config");
const packageConfig = require("../package.json");

//插件 - 在webpack4中，建议用mini-css-extract-plugin替代，这个插件把css提取
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// exports.processEnv = function(){
//     process.env.npm_config_NODEENV==="production"?'':'';
// };
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    // options是loader的选项配置
    options: {
      // modules: true,
      sourceMap: options.sourceMap  // 根据参数是否生成sourceMap文件
    }
  }
  /**
   * PostCSS是一个用js插件来自动化进行规范的CSS操作的软件开发工具。
   * 支持PostCSS的js插件可以lint CSS代码、可以支持变量和mixins操作、可以转义未来的CSS语法(future CSS syntax)、内联(inline)图片
   * @type {{loader: string, options: {sourceMap: *}}}
   */
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      // importLoaders: 2    // 允许存在[postcss,less]
    }
  }

  // generate loader string to be used with extract text plugin
  // 生成要与提取文本插件一起使用的加载程序
  function generateLoaders(loader, loaderOptions) {
      const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

      if (loader) {
        loaders.push({
          loader: loader + '-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap: options.sourceMap
          })
        });
      };

      // Extract CSS when that option is specified
      // (which is the case during production build)
      if (options.extract) {
        return [
          {
            loader: MiniCssExtractPlugin.loader
          }, ...loaders
        ];
      } else {
        return ["react-style-loader"].concat(loaders);
      };
  };

  return {
      css: generateLoaders(),
      postcss: generateLoaders(),
      less: generateLoaders('less'),
      sass: generateLoaders('sass', { indentedSyntax: true }),
      scss: generateLoaders('sass'),
      stylus: generateLoaders('stylus'),
      styl: generateLoaders('stylus')
  }
}

// http://www.ruanyifeng.com/blog/2016/06/css_modules.html
exports.styleLoaders = function (options) {
    // 定义返回的数组，数组中保存的是针对各类型的样式文件的处理方式
    const output = [];
    // 调用cssLoaders方法返回各类型的样式对象(css: loader)
    const loaders = exports.cssLoaders(options);
    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'), // 处理的文件类型
            use: loader // 用loader来处理，loader来自loaders[extension]
            // modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
        });
    };

    // var fs = require("fs");
    // fs.writeFileSync( path.join(__dirname,"./test.json"), JSON.stringify(output), { // existsSync
    //     encoding: "utf8",
    //     flags: "a",
    //     mode: 438
    // });

    return output;
}


// 根据当前“模式” 指定查找资源
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.npm_config_NODEENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};



//当遇到错误时，给你推送信息
exports.createNotifierCallback = () => {
  // 当遇到错误时，它能用系统原生的推送方式给你推送信息
  const notifier = require("node-notifier");

  return (severity, errors) => {
    if (severity !== "error") return false;

    var error    = errors[0],
      filename = error.file && error.file.split("!").pop()

    notifier.notify({
      title: packageConfig.name || "react-cli",   // 框架名称
      message: severity + ": " + error.name,      // 消息内容
      subtitle: filename || "",                   // 消息名称
      icon: ""                                    // path.join(__dirname, "errlog.png")
    });
  }
};




// //用来返回针对各类型的样式文件的处理方式(方法)
// exports.cssLoaders1 = function (options) {
//   options = options || {};

//   const cssLoader = {
//       loader: "css-loader",
//       options: {                        // options是loader的选项配置
//           // modules: true,
//           sourceMap: options.sourceMap  // 根据参数是否生成sourceMap文件
//       }
//   };
//   /**
//    * PostCSS是一个用js插件来自动化进行规范的CSS操作的软件开发工具。
//    * 支持PostCSS的js插件可以lint CSS代码、可以支持变量和mixins操作、可以转义未来的CSS语法(future CSS syntax)、内联(inline)图片
//    * @type {{loader: string, options: {sourceMap: *}}}
//    */
//   const postcssLoader = {
//       loader: "postcss-loader",
//       options: {
//           sourceMap: options.sourceMap,
//           importLoaders: 2    // 允许存在[postcss,less]
//       }
//   };

//   // 生成要与提取文本插件一起使用的加载程序
//   function generateLoaders(loader, loaderOptions) {
//     // PostCSS 一般不单独使用，而是与已有的构建工具进行集成,如cssLoader
//     var loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

//     if (loader) {
//         // 开启css module local Ident name模式
//         if(loader=="less"){
//             let cssLoader = {
//                 loader: "css-loader"
//                 // options: {                        
//                 //     modules: true,
//                 //     localIdentName: "[hash:base64:2]",   // 设置css的name名为hash
//                 //     sourceMap: options.sourceMap
//                 // }
//             };

//             loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
//             loaders.push({
//               loader: "less-loader",
//               options: Object.assign({}, loaderOptions, {
//                 sourceMap: options.sourceMap
//               })
//             });
//         }else{
//           loaders.push({
//             loader: loader + "-loader",
//             options: Object.assign({}, loaderOptions, {
//               sourceMap: options.sourceMap
//               // importLoaders: 2
//             })
//           });
//         };
//     };

//     if (options.extract) {
//       return ExtractTextPlugin.extract({
//         use: loaders,
//         fallback: "vue-style-loader"
//       });
//     } else {
//         return ["vue-style-loader"].concat(loaders);
//     };
//     // console.log(loader, loaders, options, loaderOptions);
//   }

//   // 返回css类型对应的loader组成的对象 generateLoaders()来生成loader
//   return {
//       css: generateLoaders(),
//       postcss: generateLoaders(),
//       less: generateLoaders("less"),
//       sass: generateLoaders("sass", {indentedSyntax: true}),
//       scss: generateLoaders("sass"),
//       stylus: generateLoaders("stylus"),
//       styl: generateLoaders("stylus")
//   }
// };