import { useState } from 'react'
import { sculptureList } from './data'
import { useImmer } from 'use-immer'

export { ToolBar, ToolBarBubble, Gallery, MyForm, Counter, MoveDot, ObjectForm,ObjectForm2,ToDoList }

/**
 * 修改state中的数组
 */
let nextId = 0;
function ToDoList(){
    const [todoItem,setTodoItem] = useState('');
    const [list, setList] = useState([]);

    function handleInputChange(e){
        setTodoItem(e.target.value)
    }
    function handleSubmit(e){
        // e.stopPropagation();
        e.preventDefault();
        setList([...list, {id:nextId++, item: todoItem, isFinshed: false}])
        setTodoItem("")
    }
    // 修改数组，点击改变状态
    function handleItemClick(id){
      setList(list.map((item,index)=>{ 
        if(item.id===id) {
          list[index].isFinshed=true;
        }
          return list[index]
      }))
    }
    return (
        <>
        <h5 className='h5Title'>修改state中的数组 实现TODOList</h5>
            <form>
                <input value={todoItem} onChange={handleInputChange}></input>
                <button onClick={handleSubmit}>添加</button>
            </form>
            <ul>
                {list.map(i => 
                    <li key={i.id} style={{cursor: 'pointer'}}>
                      {i.isFinshed ?(<del>{i.item}</del>) :i.item}
                      <EventButton onClick={() => handleItemClick(i.id)}>完成</EventButton>
                      <EventButton onClick={() => setList(list.filter(item => i.id !== item.id)) }>删除</EventButton>
                    </li>
                )}
            </ul>
        </>
    )
}
/**
 * state修改对象中的单个属性
 */

function ObjectForm() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
    <h5 className='h5Title'>state修改对象中的单个属性, 方法1-使用扩展运算符进行对象的浅拷贝，然后新值替换旧值</h5>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
    </>
  );
}
function ObjectForm2() {
    const [person, updatePerson] = useImmer({
      name: 'Niki de Saint Phalle',
      artwork: {
        title: 'Blue Nana',
        city: 'Hamburg',
        image: 'https://i.imgur.com/Sd1AgUOm.jpg',
      }
    });
  
    function handleNameChange(e) {
        updatePerson(draft => {
          draft.name = e.target.value;
        });
      }
    
      function handleTitleChange(e) {
        updatePerson(draft => {
          draft.artwork.title = e.target.value;
        });
      }
    
      function handleCityChange(e) {
        updatePerson(draft => {
          draft.artwork.city = e.target.value;
        });
      }
    
      function handleImageChange(e) {
        updatePerson(draft => {
          draft.artwork.image = e.target.value;
        });
      }
    
  
    return (
      <>
      <h5 className='h5Title'>state修改对象中的单个属性, 方法2-使用useImmer</h5>
        <label>
          Name:
          <input
            value={person.name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Title:
          <input
            value={person.artwork.title}
            onChange={handleTitleChange}
          />
        </label>
        <label>
          City:
          <input
            value={person.artwork.city}
            onChange={handleCityChange}
          />
        </label>
        <label>
          Image:
          <input
            value={person.artwork.image}
            onChange={handleImageChange}
          />
        </label>
        <p>
          <i>{person.artwork.title}</i>
          {' by '}
          {person.name}
          <br />
          (located in {person.artwork.city})
        </p>
      </>
    );
  }
/**
 * state修改对象
 */
function MoveDot() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    return (
        <>
            <h5 className='h5Title'>state更新对象， 将states视为只读，使用新对象进行替换</h5>
            <div
                style={{
                    // position: 'relative',
                    border: '1px solid #000',
                    width: '100px',
                    height: '100px',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}
                onPointerMove={e => {
                    setPosition({
                        x: e.clientX,
                        y: e.clientY
                    })
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        backgroundColor: 'green',
                        borderRadius: '50%',
                        transform: `translate(${position.x}px,${position.y}px)`,
                        left: -10,
                        top: -10,
                        width: 20,
                        height: 20,
                    }}
                ></div>
            </div>
        </>
    )
}

/**
 * state批处理
 */
function Counter() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <h5 className='h5Title'>state批处理  更新加入到队列中</h5>
            <h6>{number}</h6>
            <button onClick={() => {
                setNumber(number + 5);
                setNumber(n => n + 1);
                setNumber(42);
            }}>增加数字</button>
        </>
    )
}

/**
 * state的渲染
 */
function MyForm() {
    const [to, setTo] = useState('Alice');
    function handleSubmit(e) {
        e.preventDefault();
        setTimeout(() => {
            alert(`you choose ${to}`)
        }, 5000)
    }
    return (
        <>
            <h5 className='h5Title'>state值会保留在事件调用的时候</h5>
            <form onSubmit={handleSubmit}>
                to:
                <select onChange={e => setTo(e.target.value)}>
                    <option value="Alice">Alice</option>
                    <option value="Bob">Bob</option>
                </select>
                <button type="submit">Send</button>
            </form>
        </>
    );
}

/**
 * state存储状态
 * react是内部是如何定位到state更新的呢？
 * 1-渲染时hook有稳定的调用顺序 
 * 2-react为每个组件保存了state对组成的数组并维护state对的索引值
 * 
 */
function Gallery() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    // 状态改变,会重新渲染 再次调用
    function handleNextClick() {
        setIndex(index + 1)
    }
    function handleShowMore() {
        setShowMore(!showMore)
    }
    let galleryItem = sculptureList[index];
    return (
        <>
            <h5 className='h5Title'>使用state Hook保存组件状态 存在多个不同的state</h5>
            <section>
                <EventButton onClick={handleNextClick}>
                    下一页
                </EventButton>
                <img src={galleryItem.url} alt='pic' style={{width:100,height:100}}></img>
                <b>{galleryItem.name}</b> by {galleryItem.artist}
                <h6>page {index} / {sculptureList.length}</h6>
                <EventButton onClick={handleShowMore}>
                    {showMore ? '隐藏' : '显示'} 更多
                </EventButton>
                {showMore && <p> {galleryItem.description} </p>}
            </section>
        </>
    )
}
/**
 * 组件添加事件
 * 自定义一个函数 然后将它作为prop传递
 */

// 可被复用 添加不同的事件
function EventButton({ onClick, children }) {

    return (
        // <button onClick={onClick}>{children}</button>
        // 阻止冒泡 先调用e的事件在调用prop
        <button onClick={e => {
            e.stopPropagation();
            onClick();
        }}>
            {children}
        </button>
    )
}
// 多个不同用途的按钮
function PlayMovie({ movieName }) {
    return (
        <EventButton onClick={() => alert(`正在播放${movieName}`)}>
            播放电影{movieName}
        </EventButton>
    )
}
// 添加获得焦点时变色， 1怎么获取组件dom？ 2.怎么添加className 3怎么直接添加样式？
function DownLoadBtn() {
    return (
        <EventButton onClick={() => alert('准备下载')}>
            模拟下载
        </EventButton>
    )
}
function ToolBar() {
    return (
        <>
            <h5 className="h5Title">添加响应事件</h5>
            <PlayMovie movieName="《西游记》" />
            <DownLoadBtn />
        </>
    )
}
function ToolBarBubble() {
    return (
        <>
            <h5 className="h5Title">添加响应事件 存在冒泡 阻止冒泡 先调用e的事件在调用prop</h5>
            <div className="Toolbar" onClick={() => {
                alert('你点击了 toolbar ！');
            }}>
                <EventButton onClick={() => alert(`正在播放`)}>
                    播放电影
                </EventButton>
                <EventButton onClick={() => alert('准备下载')}>
                    模拟下载
                </EventButton>
            </div>
        </>
    )
}