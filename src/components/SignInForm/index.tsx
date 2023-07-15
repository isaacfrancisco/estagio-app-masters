import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '~/contexts/hooks/useAuth';
import { Link } from '@mui/material';

interface SignInFormProps {
  isSignIn: boolean;
  handleChangeForm: () => void;
  onSuccess: () => void;
  onError: () => void;
}

const SignInForm = ({ isSignIn, handleChangeForm, onSuccess, onError }: SignInFormProps) => {
  const { handleSignIn, handleCreateUser } = useAuth();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Digite um email no formato válido formato válido! Ex: (example@mail.com)')
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
    onSubmit: ({ email, password }, { resetForm }) => {
      resetForm();
      isSignIn
        ? handleSignIn({ email, password, onSuccess, onError })
        : handleCreateUser({ email, password, onSuccess, onError });
    },
  });

  return (
    <>
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
        <Typography component='h1' variant='h5'>
          {isSignIn ? 'Entrar' : 'Cadastrar'}
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
            {isSignIn ? 'Entrar' : 'Cadastrar'}
          </Button>
          <Grid item>
            <Link
              onClick={() => {
                formik.resetForm();
                return handleChangeForm();
              }}
              style={{ cursor: 'pointer' }}
            >
              {isSignIn
                ? 'Não possui uma conta? Cadastre-se aqui!'
                : 'Já possui uma conta? Entre por aqui!'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignInForm;
