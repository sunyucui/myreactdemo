//自定义reducer函数来改变状态 真正修改逻辑的地方
/**
 * tasks：state状态
 * action:dispatch提交
 */
// draft 存了state的内容
export function tasksImmerReducer({draft, action}){
    switch (action.type) {
        // immerReducer的不同写法
        case 'add' : {
            draft.push({
                id: action.id,
                text: action.text,
                done: false
            });
            break;
        }
        case 'delete': {
            return draft.filter(i => i.id !== action.id)
        }
        case 'change': {
            const index = draft.findIndex( i => i.id === action.id);
            draft[index] = action.task;
            break;
        }
        default : {
            throw Error('未知action：'+ action.type)
        }        
    }
}

export function taskReducer(tasks, action){
    console.log("taskReduce")
    console.log(action)
    console.log(tasks)
    switch (action.type) {
        case 'add' : {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false
                }
            ]
        }
        case 'delete': {
            return tasks.filter(i => i.id !== action.id)
        }
        case 'change': {
            return tasks.map( i => {
                if(i.id === action.task.id){
                    return action.task;
                }else {
                    return i;
                }
            })
        }
        default : {
            throw Error('syc!未知action：'+ action.type)
        }        
    }
}