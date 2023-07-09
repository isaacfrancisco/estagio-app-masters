import { Routes, Route } from 'react-router-dom';
import Home from '~/pages/Home/Home';
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';
import './styles/global.css';
import Register from './pages/Register/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
