import { Button, Input } from "antd";
import { useState, useRef, forwardRef, useEffect,useEffectEvent} from "react";
import cat1 from '../img/cat1.jpg';
import cat2 from '../img/gost.jpg';
import cat3 from '../img/cat3.jpg';


export { StopWacth, CatsGallery, RefDom, EffectDom,ChatRoomBox}
/**
 * useEffectEvent将effect不需要响应的依赖转移出来
 * 实现一个聊天框链接服务
 */
function ChatRoomEvent({ roomId, theme }) {
    const onConnected = useEffectEvent(() => {
        alert('Connected! them is ' + theme);
      });
    useEffect(() => {
        const connection = createConnection();
        connection.on('connected', () => {
            onConnected()
        });
        connection.connect();
        return () => connection.disconnect();
    }, [roomId]);

    return <h6 className="welcomeText">欢迎来到 {roomId} 空间!</h6>
}
function ChatRoomBoxWithEvent() {
    const [roomId, setRoomId] = useState('头条');
    const [isDark, setIsDark] = useState(false);
    return (
        <>
            <h5 className='h5Title'>【使用版】useEffectEvent将effect不需要响应的依赖转移出来</h5>
            <label>
                选择空间:{' '}
                <select
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                >
                    <option value="头条">头条</option>
                    <option value="旅游">旅游</option>
                    <option value="音乐">音乐</option>
                </select>
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={isDark}
                    onChange={e => setIsDark(e.target.checked)}
                />
                使用 dark theme
            </label>
            <ChatRoomEvent
                roomId={roomId}
                theme={isDark ? 'dark' : 'light'}
            />
        </>
    );
}
function ChatRoom({ roomId, theme }) {
    useEffect(() => {
        const connection = createConnection();
        connection.on('connected', () => {
            alert('Connected! them is ' + theme);
        });
        connection.connect();
        return () => connection.disconnect();
    }, [roomId, theme]);

    return <h6 className="welcomeText">欢迎来到 {roomId} 空间!</h6>
}

function ChatRoomBox() {
    const [roomId, setRoomId] = useState('头条');
    const [isDark, setIsDark] = useState(false);
    return (
        <>
            <h5 className='h5Title'>【未使用版】useEffectEvent将effect不需要响应的依赖转移出来</h5>
            <label>
                选择空间:{' '}
                <select
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                >
                    <option value="头条">头条</option>
                    <option value="旅游">旅游</option>
                    <option value="音乐">音乐</option>
                </select>
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={isDark}
                    onChange={e => setIsDark(e.target.checked)}
                />
                使用 dark theme
            </label>
            <ChatRoom
                roomId={roomId}
                theme={isDark ? 'dark' : 'light'}
            />
        </>
    );
}



function createConnection() {
    // 真正的实现实际上会连接到服务器
    let connectedCallback;
    let timeout;
    return {
        connect() {
            timeout = setTimeout(() => {
                if (connectedCallback) {
                    connectedCallback();
                }
            }, 100);
        },
        on(event, callback) {
            if (connectedCallback) {
                throw Error('Cannot add the handler twice.');
            }
            if (event !== 'connected') {
                throw Error('Only "connected" event is supported.');
            }
            connectedCallback = callback;
        },
        disconnect() {
            clearTimeout(timeout);
        }
    };
}
/**
 * effect在渲染之后执行 配合ref操作dom
 */
function EffectDom() {
    const [isPlay, setIsPlay] = useState(false);

    return (
        <>
            <h5 className='h5Title'>effect在渲染之后并且依赖数组中存在更变时执行 配合ref操作dom</h5>
            <Button onClick={() => { setIsPlay(!isPlay) }}>
                {isPlay ? '暂停' : '播放'}
            </Button>
            <VideoPlay
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                isPlay={isPlay}
                loop
                playsInline
            ></VideoPlay>

        </>
    )
}
function VideoPlay({ src, isPlay }) {
    const ref = useRef(null);
    useEffect(() => {
        isPlay ? ref.current.play() : ref.current.pause()
    }, [isPlay])
    return (
        <>
            <video src={src} ref={ref} className="videoplay"></video>
        </>
    )
}

/**
 * ref操作组件的dom
 */
const MyInput = forwardRef((props, ref) => {
    // return <input {...props} ref={ref}></input>
    return <Input {...props} ref={ref} style={{ width: '200px' }}></Input>
})
function RefDom() {
    const inputRef = useRef(null);

    function handleClick() {
        inputRef.current.focus();
    }

    return (
        <>
            <h5 className='h5Title'>ref操作组件的dom forwardRef进行转发</h5>
            <MyInput ref={inputRef}></MyInput>
            <Button onClick={handleClick}>聚焦</Button>
        </>
    )
}
/**
 * ref操作dom
 */
function CatsGallery() {
    const firstCatRef = useRef(null);
    const secCatRef = useRef(null);
    const thirCatRef = useRef(null);
    function handleFirCatClick() {
        firstCatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        })
    }
    function handleSecCatClick() {
        secCatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        })
    }
    function handleThirCatClick() {
        thirCatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        })
    }

    return (
        <>
            <h5 className='h5Title'> ref操作dom</h5>
            <nav>
                <Button onClick={handleFirCatClick}>cat1</Button>
                <Button onClick={handleSecCatClick}>cat2</Button>
                <Button onClick={handleThirCatClick}>cat3</Button>
            </nav>
            <div className="catsGallery">
                <img ref={firstCatRef} src={cat1} alt="cat1" ></img>
                <img ref={secCatRef} src={cat2} alt="cat2"></img>
                <img ref={thirCatRef} src={cat3} alt="cat3"></img>
            </div>

        </>
    )
}

/**
 * ref跟state
 * state可以刷新页面UI ref可以存储值不被更新
 * 完成计时器
 */
function StopWacth() {
    const [start, setStart] = useState(null);
    const [now, setNow] = useState(null);
    const intervalRef = useRef(null);

    function handleStartClick() {
        setStart(Date.now());
        setNow(Date.now());

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now())
        }, 10)
    }
    function handleStopClick() {
        clearInterval(intervalRef.current)
    }

    return (
        <>
            <h5 className='h5Title'>ref可以存储值不被更新,state改变可以刷新页面UI</h5>
            <h5>完成计时器</h5>
            {start !== null && now !== null && <p>{(now - start) / 1000}</p>}
            <Button type="primary" size="small" onClick={handleStartClick}>计时开始</Button>
            <Button type="primary" size="small" onClick={handleStopClick}>暂停</Button>

        </>
    )
}