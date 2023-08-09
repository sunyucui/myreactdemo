# react学习记录

### 问题
- img src的地址 是谁相对谁？ 在imgsrc当前引入图片 而不是用地址
- 事件如何传参 写成箭头函数然后使用函数调用

### list
>描述UI
- 编写函数组件
- 导入导出
  - 根组件
  - 默认导出+ 具名导出
  - 组件拆分 data utils..
- JSX
  - 基本语法
  - 大括号使用js（变量，对象，函数-函数引用而不是函数调用），双大括号css
- prop组件传值
  - 传递，读取， 指定默认值
  - prop JSX {children}
- 条件渲染
  - if else
  - 三目运算
  - && 
- 列表渲染
  - map()
  - filter()
  - key值
- 纯函数
>添加交互
- 添加事件处理函数  传递 读取 prop 自定义命名组件的事件名
- 事件传播 阻止冒泡 阻止默认行为
- state
  - 局部变量的缺点：重新渲染时无法缓存，发生改变不会触发渲染
  - 作用域只在当前的组件，多个组件调用多次 state也是不同的
  - state会触发重新渲染 只会为下一次渲染变更 state 的值，组件内调用多次不会叠加更变
  - state 会固定在事件内部（事件触发延迟执行过程中改变了state 但是执行的时候还是触发时的state值）
- state批处理
  - 更新函数 setN(n => n+1) 函数进入队列 在下一次渲染时返回n来更新state
  - 更新函数的变量名 可以是变量的第一个字母
  - state的更新会加入到队列，在事件处理完之后，顺序执行进行下一次渲染
- state更新一个对象
  - 用新对象进行替换 而不是修改对象本身 否则不会触发重新渲染
- 渲染和提交
  - 初次渲染 react-dom createRoot 调用render
  - 状态改变渲染 差异时才会更改 DOM 节点
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
    - 唯一标识
    - 发生变化时可以同步渲染DOM

### 组件
- react组件
  - 函数组件
  - class组件 es6class定义的继承React.Component 或者React.PureComponent
```js
function Welcome = (props) => {
  const sayHi = () => {
    alert(`Hi ${props.name}`);
  }
  
  return (
    <div>
      <h1>Hello, {props.name}</h1>
      <button onClick ={sayHi}>Say Hi</button>
    </div>
  )
}

```
> 函数组件：简洁 代码量少 无状态 无this state 生命周期   
接收prop 渲染DOM 不必关注其他逻辑

```js
import React from 'react'

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.sayHi = this.sayHi.bind(this);
  }

  sayHi() {
    alert(`Hi ${this.props.name}`);
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <button onClick ={this.sayHi}>Say Hi</button>
      </div>
    )
  } 
}

```
> JSX (javaScript XML) 
- 将 JSX 作为子组件传递 
  - 参数必须是 **children**
```js
function Card({children}){
  return (
    <div className='card'>
      {children}
    </div>
  )
}
function Profile(){
  return (
    <Card>
      <h5>0808-将JSX作为子组件，传参给父组件</h5>
      <ShowList/>
    </Card>
  )
}
```
- JSX 赋值给变量，然后用大括号将其嵌入到其他 JSX 中
- 直接放在 map() 方法里的 JSX 元素一般都需要指定 key 值
- 纯函数 不依赖于或者改变外部变量，只依赖于prop

