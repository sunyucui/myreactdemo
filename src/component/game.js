/**
 * 小游戏--井字游戏
 */
import { useState } from 'react';
import {calWinner} from './utils'

export default Game;
export {Board,Square,calWinner};

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

