import './App.scss'
import Commercial from './Components/Commercial/Commercial';
import RegistrationSheet from './Components/Registration/RegistrationSheet/RegistrationSheet';
function App() {


  return (
    <div className='app-container'>
        <RegistrationSheet />
        <Commercial />
    </div>
  )
}

export default App
