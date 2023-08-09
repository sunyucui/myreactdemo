import { createContext, useContext, useReducer } from "react";
import { initialTasks } from "./data";
import { taskReducer } from "./reducer";

/**
 * 放在context中的内容 组件的位置都可以读取
 * 与reducer结合 状态可以在组件任意位置读取
 * 1.上下文组件
 * 2.上下文使用
 */

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null)
// 定义上下文的使用
export function useTasks(){
    return useContext(TasksContext)
}
export function useTasksDispatch() {
    return useContext(TasksDispatchContext)
}
// 自定义一个上下文组件
export function TasksProvider({children}){
    const [tasks,dispatch] = useReducer(taskReducer,initialTasks)
    return (
        <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
            {children}
        </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )

}
