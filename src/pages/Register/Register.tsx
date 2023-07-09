import React, { MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '~/database/services/firebaseService';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleCreateUser = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) return console.log('Senhas não conferem!');

    createUser({ email, password })
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user', user);
        navigate('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode', errorCode);
        console.log('errorMessage', errorMessage);
      });
  };

  return (
    <div className='container'>
      <h1>Por favor digite suas informações de cadastro</h1>
      <form>
        <div className='inputContainer'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='text'
            name='email'
            placeholder='test@test.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            name='password'
            placeholder='********************'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='inputContainer'>
          <label htmlFor='password'>Confirme a Senha</label>
          <input
            type='password'
            name='confirm-password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={(e) => handleCreateUser(e)} className='button'>
          Cadastrar
        </button>
        <div className='footer'>
          <p>Você já tem uma conta?</p>
          <Link to='/login'>Acesse sua conta aqui</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
