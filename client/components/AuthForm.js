import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate, getUserByToken } from '../store';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Box,
  Link,
  Paper,
} from '@mui/material';
import rocks from '../snow_mountain.mp4';

const AuthForm = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [notification, setNotification] = useState();

  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (authMode === 'signup' && !firstName) {
      setNotification('Please enter first name.');
    } else if (authMode === 'signup' && !lastName) {
      setNotification('Please enter last name.');
    } else if (!email) {
      setNotification('Please enter email.');
    } else if (!password) {
      setNotification('Please enter password.');
    } else {
      const result = await dispatch(
        authenticate({ firstName, lastName, email, password, method: authMode })
      );
      if (result.payload && result.payload.error) {
        setNotification('Invalid username or password.');
      } else {
        const user = await dispatch(getUserByToken());
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        navigate('/dashboard');
      }
    }
  };

  if (!mode) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        backgroundImage: `url(${rocks})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem',
          margin: '0 auto',
          marginTop: '40px',
        }}
      >
        <Container component='main' maxWidth='xl'>
          <Grid container>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light'
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component='h2' variant='h5'>
                  {authMode === 'signup' ? 'Sign up' : 'Log in'}
                </Typography>
                <Box
                  component='form'
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    {' '}
                    {authMode === 'signup' && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label='First Name'
                            name='firstName'
                            type='text'
                            value={firstName}
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label='Last Name'
                            name='lastName'
                            type='text'
                            value={lastName}
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Email'
                        name='email'
                        type='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {notification && (
                        <Typography
                          variant='body1'
                          align='center'
                          sx={{
                            color: 'red',
                            mt: 1,
                          }}
                        >
                          {notification}
                        </Typography>
                      )}
                      <Button
                        type='submit'
                        fullWidth
                        variant='outlined'
                        sx={{ mt: 3, mb: 2 }}
                      >
                        {authMode === 'signup' ? 'Sign up' : 'Log in'}
                      </Button>
                      <Grid item xs={12}>
                        {' '}
                        {authMode === 'signup' && (
                          <Grid container justifyContent='center'>
                            <Grid item>
                              <Link href='/login' variant='body2'>
                                Already have an account? Log in
                              </Link>
                            </Grid>
                          </Grid>
                        )}
                        {authMode === 'login' && (
                          <Grid container justifyContent='center'>
                            <Grid item>
                              <Link href='/signup' variant='body2'>
                                Need to make an account? Sign up
                              </Link>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export { AuthForm };
