import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '~/contexts/hooks/useAuth';
import { Link } from '@mui/material';
import SimpleSnackbar from '~/components/SimpleSnackbar';
import * as yup from 'yup';
import { useFormik } from 'formik';

const Auth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const { handleSignIn, handleCreateUser, errorMessage } = useAuth();

  const navigate = useNavigate();

  const handleChangeForm = () => {
    setIsSignIn(!isSignIn);
  };

  const onSuccess = () => {
    navigate('/');
  };

  const onError = () => {
    setOpen(true);
    setMessage(errorMessage);
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Digite um email em um formato válido!')
      .required('Email é obrigatório!'),
    password: yup
      .string()
      .required('Senha é obrigatória!')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Deve conter pelomenos 8 caracteres, um maiusculo, um minusculo, um numero e um caractere especial!',
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: ({ email, password }) => {
      isSignIn
        ? handleSignIn({ email, password, onSuccess, onError })
        : handleCreateUser({ email, password, onSuccess, onError });
    },
  });

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Typography variant='h5' textAlign={'center'} sx={{ m: 2 }} gutterBottom>
          Por favor digite suas informações de usuário
        </Typography>
        <CssBaseline />
        <Box
          component={'form'}
          onSubmit={formik.handleSubmit}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isSignIn ? (
            <>
              <Typography component='h1' variant='h5'>
                Entrar
              </Typography>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    autoComplete='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Senha'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                  Entrar
                </Button>
                <Grid item>
                  <Link onClick={handleChangeForm} style={{ cursor: 'pointer' }}>
                    {'Não possui uma conta? Cadastre-se aqui!'}
                  </Link>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Typography component='h1' variant='h5'>
                Cadastrar
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    autoComplete='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                    autoComplete='current-password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, ml: 2 }}>
                  Cadastrar
                </Button>
                <Grid item>
                  <Link onClick={handleChangeForm} style={{ cursor: 'pointer' }}>
                    Já possui uma conta? Entre por aqui!
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Container>
      <SimpleSnackbar open={open} message={message} severity={'error'} handleClose={handleClose} />
    </>
  );
};

export default Auth;
