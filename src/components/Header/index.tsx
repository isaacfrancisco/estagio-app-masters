import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <button onClick={() => navigate('/login')}>Login</button>
    </header>
  );
};

export default Header;
