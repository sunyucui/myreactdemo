import { useState } from 'react'
import { user, products, people } from './data'


export { MyApp, ShowList, Profile, PackingList, PeopleList, Tea }
/**
 * 纯函数
 */
function Cup({ t }) {
  return <h4>这里有{t}杯子水</h4>
}
function Tea() {
  let cups = []
  for (let i = 1; i < 6; i++) {
    cups.push(<Cup key={i} t={i}></Cup>)
  }
  return (
    <>
      <h5 className='h5Title'>纯函数</h5>
      <small>1-纯函数 2-变更与渲染分离 3-严格模式React.StrictMode包裹根组件</small>
      {cups}
    </>

  );
}

/**
 * 列表渲染 map() filter()
 */
function PeopleList() {
  // 筛选化学家
  const chemists = people.filter(i => i.profession === '化学家')
  const listItem = chemists.map(i => {
    return (
      <li key={i.id}>
        <img src={i.imageId} alt={i.name}></img>
        <p>
          <b>{i.name}</b>
          {' ' + i.profession + ' '}
          功绩：{i.accomplishment}
        </p>
      </li>
    )
  })
  return (
    <>
      <h5 className='h5Title'>渲染列表 map() filter()应用 key值</h5>
      <p>化学家</p>
      <ul>{listItem}</ul>
    </>

  )
}

/**
 * 条件渲染
 */

function PackingList() {
  return (
    <section>
      <h5 className='h5Title'>条件渲染</h5>
      <h6>Sally Ride 的行李清单</h6>

      <ul>
        <Item
          isPacked={true}
          name="宇航服"
        />
        <Item
          isPacked={true}
          name="带金箔的头盔"
        />
        <Item
          isPacked={false}
          name="Tam 的照片"
        />
      </ul>
    </section>
  );
}
function Item({ isPacked, name }) {
  return (
    <li className='item'>
      {isPacked ? (<del>{name} ✔</del>) : (name)}
    </li>
  )
}

/**
 * 
 * @param {将 JSX 作为子组件传递} param0 
 * @returns 
 */
function Card({ children }) {
  return (
    <div className='card'>
      {children}
    </div>
  )
}
function Profile() {
  return (
    <Card>
      <h5 className='h5Title'>将JSX作为子组件，传参给父组件</h5>
      <small>传递prop 读取prop prop指定默认值 传递JSX(children) </small>
      <ShowList />
    </Card>
  )
}

/**
 * 创建和嵌套组件
 * className
 * {user.name}
 */
// 组件嵌套
function MyButton() {
  /**
   * 添加事件处理+传递状态实现一个点击器
   */

  const [count, setCount] = useState(0);
  //useState(0) 0是初始状态 赋值给count
  // setCount用于更新状态的函数

  function handleClick() {
    setCount(count + 1);
  }

  // 传递给事件
  return (
    <button
      style={{ width: user.widthSize, height: user.heightSize }}
      onClick={handleClick}
    >
      i am a counter button,<br /> you click me {count} times!
    </button>
  );
}

// 共享数据
function ShareBtn({ count, onClick }) {

  return (
    <button
      onClick={onClick}
      style={{ width: user.widthSize, height: user.heightSize }}
    >
      shareParam, <br />you click {count} times
    </button>
  );
}

function LoginBtn() {
  return (
    <button className='LoginBtn'>
      LoginBtn
    </button>
  );
}
function RegisterBtn() {
  return (
    <button className='RegisterBtn' >
      RegisterBtn
    </button>
  );
}



function MyApp() {
  // 父级状态
  const [count, setCount] = useState(0);

  // 渲染条件
  let isLogin = true;
  // let isLogin = false;
  // 条件语句-1
  let showBtn;
  if (isLogin) {
    showBtn = <LoginBtn />;
  } else {
    showBtn = <RegisterBtn />
  }
  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>

      <h5 className='h5Title'>封装组件嵌套使用</h5>
      <p>
        嵌套组件 + 添加事件 + 利用useState保存状态
      </p>
      <MyButton></MyButton>
      <MyButton></MyButton>
      <p>每个组件都有自己state 互不影响</p>
      <h5 className='h5Title'>组件之间共享数据</h5>
      <ShareBtn count={count} onClick={handleClick} />
      <ShareBtn count={count} onClick={handleClick} />


      <h5 className='h5Title'>使用大括号显示变量</h5>
      <div>{user.name}</div>
      <div>{user.age}</div>
      <div>{user.sex}</div>
      <hr />

      <h5 className='h5Title'>渲染条件</h5>
      条件渲染-1
      {showBtn}
      条件渲染-2
      {isLogin ? (<LoginBtn />) : (<RegisterBtn />)}
      条件渲染-3
      {isLogin && <LoginBtn />}
      {!isLogin && <RegisterBtn />}
    </div>
  );
}
/**
 * 
 * @returns 显示列表
 */


function ShowList() {
  const listItem = products.map(item =>
    <li
      key={item.id}
      style={{
        color: item.isFruit ? 'green' : 'blue'
      }}
    >
      {item.title}
    </li>
  )


  return (
    <div>
      <h5 className='h5Title'>显示列表内容，将自动循环展示出listItem所有内容</h5>
      <ul>{listItem}</ul>
    </div>

  );
}