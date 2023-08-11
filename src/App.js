import './css/App.css';
import Game from './component/game';
import { MyApp, ShowList, Profile, PackingList, PeopleList, Tea } from './component/uiDescription';
import {ToolBar,ToolBarBubble,Gallery, MyForm, Counter,MoveDot,ObjectForm, ObjectForm2,ToDoList} from './component/acton';
import {Quiz,Schedule} from './component/state';
import {StopWacth, CatsGallery,RefDom,EffectDom,ChatRoomBox} from './component/effect';
import {MyButton, WebSite} from './component/classComponent'


export default function App() {
  return (
    <>
      <h1 className='welcomeText'> hello this is a react demo</h1>
      <p>class组件</p>
      <WebSite />
      <MyButton />
      <ChatRoomBox />
      <EffectDom />
      <RefDom />
      <CatsGallery />
      <StopWacth />
      <Schedule />
      <Quiz />
      <ToDoList />
      <ObjectForm2 />
      <ObjectForm />
      <MoveDot/>
      <Counter />
      <MyForm />
      <Gallery />
      <ToolBarBubble />
      <ToolBar />
      <Tea />
      <PeopleList />
      <PackingList />
      <Profile />
      <MyApp />
      <ShowList />
      <hr />
      <Game />
    </>
  )
}
