// import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
/**
 * 创建和嵌套组件
 * className
 * {user.name}
 */
const user = {
  name: 'joe',
  age: 18,
  sex: 'female',
  widthSize: 100,
  heightSize: 100,
};


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


function MyApp() {
  // 父级状态
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <h1 className='welcomeText'> hello this is a react demo</h1>

      <h5>封装组件嵌套使用</h5>
      <p>
        嵌套组件 + 添加事件 + 利用useState保存状态
      </p>
      <MyButton></MyButton>
      <MyButton></MyButton>
      <p>每个组件都有自己state 互不影响</p>
      <h5>组件之间共享数据</h5>
      <ShareBtn count={count} onClick={handleClick} />
      <ShareBtn count={count} onClick={handleClick} />


      <h5>使用大括号显示变量</h5>
      <div>{user.name}</div>
      <div>{user.age}</div>
      <div>{user.sex}</div>
      <hr />

      <h5>渲染条件</h5>
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
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

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
      <h5>显示列表内容，将自动循环展示出listItem所有内容</h5>
      <ul>{listItem}</ul>
    </div>

  );
}
/**
 * 小游戏--井字游戏
 */
function Game() {
  // 记录每次棋盘的状态 最多可以走九步
  const [history, setHistory] = useState([Array(9).fill(null)])
  // 记录落子状态
  // 当前停留的步数
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  // length不计算null 则length-1就是当前最新的步数所对应的棋盘
  // const currentSquares = history[history.length - 1];
 
  
  
  // 更新游戏

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // // 之前的棋盘 + 新新棋盘
    // setHistory([...history, nextSquares]);
    // // 修改落子状态
    // setXIsNext(!xIsNext);
  }

  // 跳转到某个历史棋盘
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // 生成棋盘步数按钮
  const steps = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = '返回第' + index + '步';
    } else {
      description = '重新开始';
    }
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{steps}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // 初始化放方格中的状态 传递给子组件
  // const [squares, setSquares] = useState(Array(9).fill(null))
  // 记录落子状态
  // const [xIsNext, setXIsNext] = useState(true);
  // 检查获胜者
  const winner = calWinner(squares)
  // 显示获胜状态
  let status;
  if (winner) {
    status = '获胜者是：' + winner;
  } else {
    status = '下一个玩家：' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(index) {
    // 已经存在值则不改变,同时检查是否有获胜者
    if (calWinner(squares) || squares[index]) {
      return;
    }
    const nextSquares = squares.slice(); //数组复制
    nextSquares[index] = xIsNext ? 'X' : 'O';
    // 调用父类传来的方法
    onPlay(nextSquares);
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
  }

  return (
    <>
      <h5>井字小游戏</h5>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}
// 组件复用
function Square({ value, onSquareClick }) {


  return <button
    className="square"
    onClick={onSquareClick}
  >
    {value}
  </button>;
}
// 对角线元素一致则为赢
function calWinner(squares) {
  // 所有对角线下标
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}
export { MyApp, ShowList, Game }
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
