import { Routes, Route } from 'react-router-dom';
import Home from '~/pages/Home/Home';
import Error from './pages/Error/Error';
import './styles/global.css';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
