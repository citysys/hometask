import './App.scss'
import LeftSide from './components/LeftSide'
import RightSide from './components/RightSide'
function App() {

  return (
    <>
      <div className='app'>
        <div className='left-side-container'>
          <LeftSide />
        </div>
        <div className='right-side-container'>
          <RightSide />
        </div>
      </div>
    </>
  )
}

export default App
