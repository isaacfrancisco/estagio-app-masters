import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '~/database/services/firebaseService';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleCreateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) return console.log('Senhas não conferem!');

    createUser({ email, password })
      .then(() => {
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
    // <div className='container'>
    //   <h1>Por favor digite suas informações de cadastro</h1>
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
    //     <div className='inputContainer'>
    //       <label htmlFor='password'>Confirme a Senha</label>
    //       <input
    //         type='password'
    //         name='confirm-password'
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />
    //     </div>
    //     <button onClick={(e) => handleCreateUser(e)} className='button'>
    //       Cadastrar
    //     </button>
    //     <div className='footer'>
    //       <p>Você já tem uma conta?</p>
    //       <Link to='/login'>Acesse sua conta aqui</Link>
    //     </div>
    //   </form>
    // </div>
    <Container component='main' maxWidth='xs'>
      <Typography variant='h5' textAlign={'center'} sx={{ m: 2 }} gutterBottom>
        Por favor digite suas informações de cadastro
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
          Sign up
        </Typography>
        <Box component='form' noValidate onSubmit={handleCreateUser} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Senha'
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='confirm-password'
                label='Confirme a senha'
                type='password'
                id='confirm-password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Cadastrar
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link
                onClick={() => navigate('/login')}
                style={{ cursor: 'pointer' }}
                variant='body2'
              >
                Já possui uma conta? Entre por aqui!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
