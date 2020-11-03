module.exports = {
  presets: ['@babel/env', '@babel/preset-react'],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      'corejs': 3 // 指定 runtime-corejs 的版本
    }],
    ['@babel/plugin-proposal-class-properties',{ "loose": true }], // loose：采用赋值法直接定义
    // "@babel/plugin-transform-arrow-functions"  // 这个是箭头函数的处理
  ]
};