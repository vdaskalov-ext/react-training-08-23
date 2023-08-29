import { NavLink, Outlet } from 'react-router-dom';
import { AppBar, Box, Button, Stack } from '@mui/material';

export const AppContainer = () => (
  <Box sx={{ width: '100vw', height: '100vh' }}>
    <AppBar position="static">
      <Stack direction="row">
        <NavLink to={'/home'}>
          {({ isActive }) => (
            <Button
              sx={{ borderRadius: 0 }}
              color="secondary"
              variant={isActive ? 'contained' : 'text'}
            >
              Home
            </Button>
          )}
        </NavLink>
        <NavLink to={'/forbidden'}>
          {({ isActive }) => (
            <Button
              sx={{ borderRadius: 0 }}
              color="secondary"
              variant={isActive ? 'contained' : 'text'}
            >
              Forbidden
            </Button>
          )}
        </NavLink>
        <NavLink to={'/issues'}>
          {({ isActive }) => (
            <Button
              sx={{ borderRadius: 0 }}
              color="secondary"
              variant={isActive ? 'contained' : 'text'}
            >
              Issues
            </Button>
          )}
        </NavLink>
      </Stack>
    </AppBar>
    <h1>App Container</h1>
    <Outlet />
  </Box>
);
