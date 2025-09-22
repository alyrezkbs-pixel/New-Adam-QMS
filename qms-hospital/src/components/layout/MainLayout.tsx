import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeProvider';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  direction: 'ltr' | 'rtl';
}>(({ theme, open, direction }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: direction === 'ltr' ? `-${drawerWidth}px` : 0,
  marginRight: direction === 'rtl' ? `-${drawerWidth}px` : 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: direction === 'ltr' ? 0 : 0,
    marginRight: direction === 'rtl' ? 0 : 0,
  }),
}));

const MainLayout: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { direction } = useTheme();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar open={open} onDrawerToggle={handleDrawerToggle} />
      <Sidebar open={open} onDrawerToggle={handleDrawerToggle} />
      <Main open={open} direction={direction}>
        <Box component="div" sx={{ mt: 8, p: 2 }}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};

export default MainLayout;