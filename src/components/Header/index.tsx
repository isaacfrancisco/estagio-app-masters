import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '~/contexts/hooks/useAuth';
import { signOutUser } from '~/database/services/firebaseService';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAuth = () => {
    if (user) {
      navigate('/login');
      return signOutUser();
    }
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            AppMasters Test
          </Typography>
          <Button color='inherit' onClick={handleAuth}>
            {user ? 'logout' : 'login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
