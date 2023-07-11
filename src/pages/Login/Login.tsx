import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '~/database/services/firebaseService';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '~/contexts/hooks/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInUser({ email, password })
      .then((userCredential) => {
        const userData = userCredential.user;
        setUser({ user_uid: userData.uid, user_email: userData.email });
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
    // <div className='container'>
    //   <h1>Por favor digite suas informações de login</h1>
    //   <form>
    //     <div className='inputContainer'>
    //       <label htmlFor='email'>E-mail</label>
    //       <input
    //         type='text'
    //         name='email'
    //         placeholder='test@test.com'
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div className='inputContainer'>
    //       <label htmlFor='password'>Senha</label>
    //       <input
    //         type='password'
    //         name='password'
    //         placeholder='********************'
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>

    //     <button onClick={(e) => handleSignIn(e)} className='button'>
    //       Cadastrar
    //     </button>
    //     <div className='footer'>
    //       <p>Não possui uma conta?</p>
    //       <Link to='/register'>Cadastre sua conta aqui!</Link>
    //     </div>
    //   </form>
    // </div>
    <Container component='main' maxWidth='xs'>
      <Typography variant='h5' textAlign={'center'} sx={{ m: 2 }} gutterBottom>
        Por favor digite suas informações de login
      </Typography>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Entrar
        </Typography>
        <Box component='form' onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Senha'
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              <Link
                onClick={() => navigate('/register')}
                style={{ cursor: 'pointer' }}
                variant='body2'
              >
                {'Não possui uma conta? Cadastre-se aqui!'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
