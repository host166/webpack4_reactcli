// var express = require('express');//引用express
// var app = express();//创建express实例

const fs = require("fs");
const MD5 = require("MD5");
// const Terser = require("terser");
const { setFileSync, resolve, Service } = require('./utils.js');

// 当做缓存用
let afterData = {
  pad: "",
  mobile: ""
};

class extractMedia {
  constructor(opts={}){
    this.configs = {
      prefixPath: "./client/shared/extractMedia/skinCss"
    };
    for(let x in opts){
      this.configs[x] = opts[x];
    };
  }
  apply(compiler){
    let _prefixPath = this.configs.prefixPath;
    compiler.plugin("emit",(compilation, callback)=>{
      let oMap = {
        pad: [],
        mobile: []
      };
      // app.get('/css/app.css', function (req, res) {//当路由url匹配为'/'时，执行function，返回Hello World
      //   console.log(res);
      // });
      Service({
        method : 'GET',
        url : `http://localhost:${process.env.PORT}/css/app.css`,
        callback: (err,resp)=> {
          let cssResp = resp.body;
          // 提取中大屏设备样式
          let matchMediaPad = cssResp.match(/(?<=[^\d](1024)PX\)+( |))\{[^@|$]+\}/g);
          if( !!matchMediaPad ){
            matchMediaPad.map(item=>{
              oMap.pad.push(item.replace(/[\n]+/gim,"").substring(1).replace(/(\}\})+/gim,"}"))
            });
          };

          // 提取小屏设备
          let matchMediaMobile = cssResp.match(/(?<=[^\d](750)PX\)+( |))\{[^@|$]+\}/g);
          if( !!matchMediaMobile ){
            matchMediaMobile.map(item=>{
              oMap.mobile.push(item.replace(/[\n]+/gim,"").substring(1).replace(/(\}\})+/gim,"}"))
            });
          };

          // console.log( MD5(oMap.pad.join("")), MD5(afterData.pad) );

          if( MD5(oMap.pad.join("")) === MD5(afterData.pad)&&MD5(oMap.mobile.join("")) === MD5(afterData.mobile) ){
            return false;
          };

          // 清空数据
          afterData = {
            pad: oMap.pad.join(""),
            mobile: oMap.mobile.join("")
          };

          // setFileSync(
          //   resolve(`${_prefixPath}/ipadMobile.txt`), 
          //   JSON.stringify({
          //     pad: afterData.pad,
          //     mobile: afterData.mobile
          //   })
          //   // `${afterData.pad.replace(/[\n]+/gim,"")} \n\n\n\n\n\n ${oMap.pad.join("").replace(/[\n]+/gim,"")}`
          // );
          
          setFileSync(
            resolve(`${_prefixPath}/ipadMobile.json`), 
            JSON.stringify({
              pad: afterData.pad,
              mobile: afterData.mobile
            })
            // `${afterData.pad.replace(/[\n]+/gim,"")} \n\n\n\n\n\n ${oMap.pad.join("").replace(/[\n]+/gim,"")}`
          );
          // .replace(/[\n]+/gim,"")

          
        }
      });

      callback();
    });
  }
};

exports.default = extractMedia;
module.exports = extractMedia;

// const fs = require("fs");
// const MD5 = require("MD5");
// const { setFileSync, resolve } = require('./utils.js');

// let oMap = {
//   ipad: [],
//   mobile: []
// };
// let fileMD5 = "";

// class extractMedia{
//   constructor(opts={}){
//     this.configs = {
//       prefixPath: "./client/shared/extractMedia/skinCss"
//     };
//     for(let x in opts){
//       this.configs[x] = opts[x];
//     };
//     fileMD5 = "";
//     oMap = {
//       ipad: [],
//       mobile: []
//     };
//   }
//   apply(compiler){
//     let _prefixPath = this.configs.prefixPath;
//     fileMD5 = require(resolve(`${_prefixPath}/ipadMobile.json`)); //MD5( );

//     compiler.plugin("emit",(compilation, callback)=>{
//       // compilation.chunks是块的集合，构建后将要输出的文件，即编译之后得到的结果。
//       compilation.chunks.forEach(function(chunk) {
//           // // chunk.modules是模块的集合（构建时webpack梳理出的依赖，即import、require的module）
//           // chunk.modules&&chunk.modules.forEach(function(module) {
//           //     // module.fileDependencies就是具体的文件，最真实的资源【举例，在css中@import("reset.css")，这里的reset.css就是 fileDependencie】
//           //     module.fileDependencies.forEach(function(filepath) {
//           //         // 到这一步，就可以操作源文件了
//           //         console.log("filepath: ", filepath);
//           //         content += filepath;
//           //     });
//           // });
//           // 最终生成的文件的集合
//           chunk.files.forEach( function(itemFileName) {
//               // console.log('itemFileName',itemFileName);
//               // source() 可以得到每个文件的源码
//               var source = compilation.assets[itemFileName].source();
//               // options.map(item=>{
//               //     let _regexp = new RegExp(item.expstr, "gi"),
//               //         _match = source.match(_regexp),
//               //         matchingString = "";
                  
//               //     if( _match ){
//               //         matchingString = _match[0].substr(1);
//               //     };
//               //     source = source.replace(_regexp, `${item.target}${matchingString}`).replace(/(\/@@)+?(?=\/)/gi,"");
//               //     // console.log( item.target, matchingString );
//               // });

//               // compilation.assets[itemFileName] = {
//               //     source: ()=>{
//               //         return source
//               //     },
//               //     size: () => {
//               //         return Buffer.byteLength(source, 'utf8')
//               //     }
//               // };
//               // 提取中大屏设备样式
//               let matchMediaPad = source.replace(/(\\n|(\\))+/gi,"").match(/(?<=[^\d](1024)PX\)+( |))\{[^@|$]+\}/g);
//               if( !!matchMediaPad ){
//                 matchMediaPad.map(item=>{
//                   oMap.ipad.push(item.substring(1,item.length-1))
//                 });
//               };
//               // 提取小屏设备
//               let matchMediaMobile = source.replace(/(\\n|(\\))+/gi,"").match(/(?<=[^\d](750)PX\)+( |))\{[^@|$]+\}/g);
//               if( !!matchMediaMobile ){
//                 matchMediaMobile.map(item=>{
//                   oMap.mobile.push(item.substring(1,item.length-1))
//                 });
//               };
//           });
//       });
      
//       oMap.ipad = [...new Set(oMap.ipad)];
//       oMap.mobile = [...new Set(oMap.mobile)];

//       // console.log( '个数：',oMap.ipad.length, [...new Set(oMap.ipad)].length );
//       // console.log(
//       //   fileMD5.ipad,
//       //   oMap.ipad.join(""),
//       //   fileMD5.ipad===oMap.ipad.join("")
//       // );

//       if( fileMD5.ipad!==oMap.ipad.join("") || fileMD5.mobile!==oMap.mobile.join("") ){
//         setFileSync(
//           resolve(`${_prefixPath}/ipadMobile.json`), 
//           JSON.stringify({
//             ipad: oMap.ipad.join(""),
//             mobile: oMap.mobile.join("")
//           }) 
//         );
//       };      

//       callback();
//     });

//     // compiler.plugin("watch-run", (watching, callback)=>{


//     //   callback();
//     // });
//   }
// };

// // common js standard
// exports.default = extractMedia;
// module.exports = extractMedia;