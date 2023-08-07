# react学习记录
### 创建一个项目
通过脚手架 `npx create-react-app myreactdemo`  
>文件目录
- 只有 `public `下的文件才能被 public/index.html 使用
  - public/index.html 页面模板
- 只有 `src` 下的文件才会被 Webpack 处理
  - index.js # JavaScript 打包入口文件
- package-lock.json
    - 描述 node_modules 文件中所有模块的版本信息，模块来源及依赖的小版本信息
    - 升级的时候按照指定版本升级  ^1.0.0 会按照最新版本来升级
> 运行与构建
- npm start
- npm run build
## 入门
>创建和嵌套组件 ok   
添加标签和样式  ok 
显示数据  ok  
渲染条件和列表  ok
对事件做出响应并更新界面  ok
在组件间共享数据  ok

- JSX标签语法必须有个共享的父级
- react组件返回标签
- 每个组件都会拥有自己的 state   
- 以 use 开头的函数被称为 Hook
- 共享数据： 共享的数据放在父级，然后prop给子组件
- 不能在父标签中的事件写成handleEvent(0)
  - 可能将会造成死循环-这里是props 传递（而不是调用）因为 handleClick(0) 通过调用 setSquares 改变了棋盘组件的 state，所以你的整个棋盘组件将再次重新渲染。但这再次运行了 handleClick(0)，导致无限循环：
  - 应该写成调用的样式 `onClick= { () => handleClick(0)}`
- state更新，父级及其所有子组件都将重新渲染
- 为每个列表项指定一个 key 属性
  - key 告诉 React 每个组件的身份，这使得 React 可以在重新渲染时保持 state。如果组件的 key 发生变化，组件将被销毁，新 state 将重新创建。