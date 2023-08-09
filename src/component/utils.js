// 提交问答表单
export function submitQuizForm(answer){
  return new Promise( (resolve, reject) =>{
    setTimeout(() => {
      let shouldError = answer.toLowerCase()!=='rose';
      if(shouldError){
        reject(new Error('答案错误，再试一次吧'))
      } else {
        resolve()
      }
    },1000)
  })
}

// 对角线元素一致则为赢
export function calWinner(squares) {
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