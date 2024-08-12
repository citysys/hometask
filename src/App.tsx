import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Access from './pages/AccessPage/AccessPage';

function App() {
  return (
    <Routes>
      <Route path=":type" element={<Access />} />
      <Route path="/" element={<Access />} />
    </Routes>
  );
}

export default App;