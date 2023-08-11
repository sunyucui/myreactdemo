import React from 'react';
// import ReactDOM from 'react-dom/client';
// 涅槃--线索管理--二级下拉第一项 
// 右侧 第一个和最后一个

/**
 * class组件
 * this指向
 * 生命周期钩子
 * ClassComponent.defaultProps = {prop1:defaultValue} 给 props添加默认值，
 * 等同于在函数组件中的{prop1=defaultValue} 
 */
/**
 * ===state===
 * 1-class中states设值 this.state={xx:'value'} 一个对象
 * 2-更新 this.setState({xx:this.state.xx++}) 
 */
/**
 * ===props===
 * 1-class中取值 this.props
 * 2-默认值 ClassComponent.defaultProps = {prop1:defaultValue} 给 props添加默认值，
 * 等同于在函数组件中的{prop1=defaultValue}
 */
/**
 * ===事件处理===
 * 1-在constructor中显示的绑定this
 * this.setValue = this.setValue.bind(this)
 * 2-箭头函数 进行传参
 */
/**
 * ===列表和key===
 * key应该在数组的上下文中被指定
 */
export class WebSite extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "name",
            site: "site"
        }
    }
    render() {
        return (
            <div>
                <Name name={this.state.name} />
                <Link site={this.state.site} />
            </div>
        );
    }
}



class Name extends React.Component {
    render() {
        return (
            <h6>{this.props.name}</h6>
        );
    }
}

class Link extends React.Component {
    render() {
        return (
            <a href={this.props.site}>
                {this.props.site}
            </a>
        );
    }
}


function FormattedDate(props) {
    return <h2>现在是 {props.date.toLocaleTimeString()}.</h2>;
}
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    //函数组件中的useEffect
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <FormattedDate date={this.state.date} />
            </div>
        );
    }
}


class Content extends React.Component {
    // 挂载之前执行
    constructor(props) {
        // props传值
        super(props);
        // 状态
        // this.state = {}
    }

    /**
     * 调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用
     */
    // static getDerivedStateFromProps() {
    //     return this.state
    // }
    /**
    * render之后挂载，class组件必须要实现
    * this.props.name接收传递过来的参数
    * 
    * */
    render() {
        return (
            <>
                <h3>{this.props.myNumber}</h3>
            </>
        )
    }

    /**
     * 生命周期函数
     * 挂载-更新-卸载
     */
    /**
     * 触发：组件挂载后（插入到dom）
     * */
    componentDidMount() {
        console.log('componentDidMount')
    }

    /**
     * 更新
     * 触发：props state更变
     */
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    /**
     * 在组件卸载及销毁之前直接调用
     */
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

}
export class MyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: 0 }; //状态:初始值
        // `this` 能在回调函数中使用, setDate指向Mybutton
        this.setData = this.setData.bind(this)//???this的指向
    }
    /**
     * this.state 状态
     * this.setSate() 更新状态函数
     */
    setData() {
        this.setState({ data: this.state.data + 1 })
    }
    render() {
        return (
            <div>
                <button onClick={this.setData}>点击</button>
                <Content myNumber={this.state.data}></Content>
            </div>
        )
    }
}
