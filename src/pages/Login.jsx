import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/auth/authSlice';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: 'kminchelle',
    password: '0lelplR',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login check (can replace with real API later)
    if (
      credentials.username === 'kminchelle' &&
      credentials.password === '0lelplR'
    ) {
      dispatch(
        loginSuccess({
          user: { username: credentials.username },
          token: 'dummy-token-123456',
        })
      );
      navigate('/dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
