import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '~/contexts/hooks/useAuth';
import SimpleSnackbar from '~/components/SimpleSnackbar';
import SignInForm from '~/components/SignInForm';

const Auth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [open, setOpen] = useState(false);

  const { errorMessage } = useAuth();

  const navigate = useNavigate();

  const handleChangeForm = () => {
    setIsSignIn(!isSignIn);
  };

  const onSuccess = () => {
    navigate('/estagio-app-masters/');
  };

  const onError = () => {
    setOpen(true);
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Typography variant='h5' textAlign={'center'} sx={{ m: 2 }} gutterBottom>
          Por favor digite suas informações de usuário
        </Typography>
        <CssBaseline />
        <SignInForm
          isSignIn={isSignIn}
          handleChangeForm={handleChangeForm}
          onError={onError}
          onSuccess={onSuccess}
        />
      </Container>
      <SimpleSnackbar
        open={open}
        message={errorMessage}
        severity={'error'}
        handleClose={handleClose}
      />
    </>
  );
};

export default Auth;
