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
      
    };
    for(let x in opts){
      this.configs[x] = opts[x];
    };
  }
  apply(compiler){
    compiler.plugin("emit",(compilation, callback)=>{
      
      callback();
    });
  }
};

exports.default = extractMedia;
module.exports = extractMedia;