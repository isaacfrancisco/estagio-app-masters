import { Routes, Route } from 'react-router-dom';
import Home from '~/pages/Home/Home';
import Error from './pages/Error/Error';
import './styles/global.css';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/estagio-app-masters/' element={<Home />} />
        <Route path='/estagio-app-masters/auth' element={<Auth />} />
        <Route path='/estagio-app-masters/*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
