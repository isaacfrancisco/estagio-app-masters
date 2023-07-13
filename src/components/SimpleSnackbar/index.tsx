import { Alert, AlertColor, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react';

interface SimpleSnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

const SimpleSnackbar = ({ open, message, severity, handleClose }: SimpleSnackbarProps) => {
  const action = (
    <React.Fragment>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} action={action}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SimpleSnackbar;
