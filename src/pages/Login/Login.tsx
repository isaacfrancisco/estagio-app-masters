import React, { MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInUser } from '~/database/services/firebaseService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    signInUser({ email, password })
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user', user);
        navigate('/');
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
      <h1>Por favor digite suas informações de login</h1>
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

        <button onClick={(e) => handleSignIn(e)} className='button'>
          Cadastrar
        </button>
        <div className='footer'>
          <p>Não possui uma conta?</p>
          <Link to='/register'>Cadastre sua conta aqui!</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
