import { useAuth } from '../auth/auth-context';
import { getDeepLink } from '../auth/auth-utils';
import { Navigate } from 'react-router-dom';
import { Box, Button, Paper, Stack, TextField } from '@mui/material';
import { Field, FieldProps, Form, Formik } from 'formik';
import { Send } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { LoginSchema } from './login-schema';
import { getErrors } from '../../utils/formik';

const initialValues = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const link = getDeepLink();
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={link ?? '/home'} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'primary.main',
      }}
    >
      <Box
        sx={{
          width: '80%',
          maxWidth: '500px',
        }}
      >
        <Paper sx={{ padding: '2rem' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log({ values });
              login(values.email, values.password);
            }}
          >
            {({ dirty, isValid }) => (
              <Form>
                <Stack direction="column" spacing={3}>
                  <h1>Login</h1>
                  <Field name="email">
                    {({ field, form }: FieldProps<string>) => (
                      <TextField
                        {...field}
                        label="Email"
                        type="email"
                        error={!!getErrors('email', form)}
                        helperText={getErrors('email', form)}
                      />
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }: FieldProps<string>) => (
                      <TextField
                        {...field}
                        label="Password"
                        type="password"
                        error={!!getErrors('password', form)}
                        helperText={getErrors('password', form)}
                      />
                    )}
                  </Field>
                  <Button
                    disabled={!(dirty && isValid)}
                    variant="contained"
                    type="submit"
                    endIcon={<Send />}
                  >
                    Login
                  </Button>
                  <Link to="/register">Register</Link>
                </Stack>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
};
