import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogOutBtn';

const Header = ({ name, email, profileImage, setAuth }) => {
  return (
    <AppBar position="static" sx={{ marginBottom: 4, backgroundColor: '#2196f3' }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Welcome, {name}
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="center" sx={{ flexGrow: 1 }}>
              <Button color="inherit" component={NavLink} to="/" exact>
                Home
              </Button>
              <Button color="inherit" component={NavLink} to="/blogs">
                Blog
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              {profileImage && (
                <Box
                  component="img"
                  src={`http://localhost:5000${profileImage}`}
                  alt={name}
                  sx={{ width: 40, height: 40, borderRadius: '50%', marginRight: 2 }}
                />
              )}
              <LogoutButton setAuth={setAuth} />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
