import { Routes, Route } from 'react-router-dom';
import Home from '~/pages/Home/Home';
import Error from './pages/Error/Error';
import './styles/global.css';

function App() {
  return (
    <div>
      <h1>Lista de Jogos</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
