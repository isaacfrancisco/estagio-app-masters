import { Button, Grid, TextField } from '@mui/material';

interface SignInFormProps {
  setEmail: (event: string) => void;
  setPassword: (event: string) => void;
  handleSignIn: () => void;
}

const SignInForm = ({ setEmail, setPassword, handleSignIn }: SignInFormProps) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSignIn}
      >
        Entrar
      </Button>
    </Grid>
  );
};

export default SignInForm;
