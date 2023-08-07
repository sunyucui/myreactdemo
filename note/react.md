# react学习记录
### 创建一个项目
通过脚手架 `npx create-react-app myreactdemo`  
文件目录
- 只有 `public `下的文件才能被 public/index.html 使用
  - public/index.html 页面模板
- 只有 `src` 下的文件才会被 Webpack 处理
  - index.js # JavaScript 打包入口文件
- package-lock.json
    - 描述 node_modules 文件中所有模块的版本信息，模块来源及依赖的小版本信息
    - 升级的时候按照指定版本升级  ^1.0.0 会按照最新版本来升级