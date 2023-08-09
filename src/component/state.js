import { useState } from 'react';
import { submitQuizForm } from './utils'
import { Form, Button, Col, Row, Input, Checkbox } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { initialTasks } from './data';
import { TasksProvider, useTasks, useTasksDispatch } from './context'

/**
 * react-状态管理
 */
export { Quiz, Schedule }
/**
 * reduce管理状态的变化
 * dispatch提交一个action action的结构自定义 但必须有一个type
 * 
 * 利用context将状态共享给组件，reducer的状态 赋值给content.provider 的value
 * 
 * 父级组件不需要再维护状态 
 */
let nextIndex = initialTasks.length;
function Schedule() {
    return (
        <>
            <h5 className='h5Title'>reduce管理状态的变化 useReducer(reducer,initSate) dispatch(action)</h5>
            <h5>国庆假期的行程安排</h5>
            <TasksProvider>
                <AddTask />
                <TaskList />
            </TasksProvider>
        </>
    )

}
// 添加任务组件
function AddTask() {
    // input文本value
    const [text, setText] = useState('');
    const dispatch = useTasksDispatch();

    function handleAdd() {
        setText('')
        dispatch({
            type: 'add',
            id: nextIndex++,
            text: text
        })
    }

    return (
        <>
            <Row gutter={8}>
                <Col span={3}>
                    <Input value={text} onChange={e => setText(e.target.value)} />
                </Col>
                <Col span={1}>
                    <Button type='primary' onClick={handleAdd}>添加</Button>
                </Col>
            </Row>
        </>
    )
}
// 展示任务组件
function TaskList() {
    const tasks = useTasks();
    return (
        <>
            <ul>
                {tasks.map(i =>
                    <li key={i.id}>
                        <Task task={i} />
                    </li>
                )}
            </ul>
        </>
    )
}
function Task({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.text);
    const dispatch = useTasksDispatch();

    function handleCheck(e) {
        console.log('check')
        dispatch({
            type: 'change',
            task: {
                ...task,
                done: e.target.checked
            }
        });
    }
    function handleDelete() {
        console.log('delete')
        dispatch({
            type: 'delete',
            id: task.id
        });
    }
    function handleChange() {
        setIsEditing(!isEditing)
        // 保存提交改变
        if (isEditing) {
            dispatch({
                type: 'change',
                task: {
                    ...task,
                    text: text
                }
            });
        }
    }


    return (
        <>
            <Row gutter={'16px'}>
                <Col span={4}>
                    {isEditing ? <Input value={text} onChange={e => setText(e.target.value)} /> :
                        <Checkbox checked={task.done} onChange={handleCheck}> {task.text}</Checkbox>}
                </Col>
                <Col span={1}>
                    <Button size='small' onClick={handleChange}>
                        {isEditing ? '保存' : '编辑'}
                    </Button>
                </Col>
                <Col span={1}>
                    <Button size='small' onClick={handleDelete}>
                        删除
                    </Button>
                </Col>
            </Row>
        </>
    );
}
/**
 * dom的变更与状态绑定，实现一个问答的表单
 */
function Quiz() {
    // 绑定文本内容
    const [answer, setAnswer] = useState('');
    /**
     * 用户的状态 
     * typing：正常态
     * submitting：禁止输入 禁止按钮
     * success:只显示成功文本
     *  */
    const [status, setStatus] = useState('')
    // 错误类
    const [error, setError] = useState(null)

    // 按钮提交 判断答案
    async function onFinish(e) {
        // e.preventDefault();
        setStatus('submitting');
        try {
            await submitQuizForm(answer);
            setStatus('success')
        } catch (err) {
            setStatus('typing')
            setError(err)
        }
    }

    // 绑定文本值
    function handleTextAreaChange(e) {
        setAnswer(e.target.value)
    }
    // 显示答案正确文本
    if (status === 'success') {
        return <h4 className='successMsg'>猜对了！</h4>
    }
    return (
        <>
            <h5 className='h5Title'>react-状态管理 dom的变更与状态绑定，实现一个问答的表单</h5>
            <p>Q：请问玫瑰的英文是什么？</p>
            <Row>
                <Col span={8}>
                    <Form name='quizForm' onFinish={onFinish}>
                        <Form.Item>
                            <TextArea
                                rows={3}
                                value={answer}
                                placeholder='请输入你的答案...'
                                onChange={handleTextAreaChange}
                                disabled={status === 'submitting'}
                            ></TextArea>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                disabled={status === 'submitting' || answer.length === 0}
                            >
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                    {error !== null && <p className='errorMsg'>{error.message}</p>}

                </Col>
            </Row>

        </>
    )

}