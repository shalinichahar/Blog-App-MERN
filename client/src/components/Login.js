import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link, Box, CssBaseline } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('profileImage', data.profileImage); // Store profile image URL
      setAuth(true);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: 'url(https://imgs.search.brave.com/uPr1XYcwWECOX-T_OhSmWK00Vu4NUs75vTNV1eTeWxw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9z/dG9uZS10ZXh0dXJl/LWJhY2tncm91bmRf/NjMyNDk4LTk3My5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',  // semi-transparent white background
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Your email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
          <Box textAlign="center">
            <Link href="/signup" variant="body2">
              {"Don't have an account? SignUp"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
