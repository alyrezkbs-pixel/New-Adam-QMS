import React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme/ThemeProvider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArticleIcon from '@mui/icons-material/Article';
import SpeedIcon from '@mui/icons-material/Speed';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GavelIcon from '@mui/icons-material/Gavel';
import SchoolIcon from '@mui/icons-material/School';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FlagIcon from '@mui/icons-material/Flag';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const drawerWidth = 280;

const openedMixin = (theme: Theme, direction: 'ltr' | 'rtl'): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  [direction === 'ltr' ? 'left' : 'right']: 0,
});

const closedMixin = (theme: Theme, direction: 'ltr' | 'rtl'): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  [direction === 'ltr' ? 'left' : 'right']: 0,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'direction' })(
  ({ theme, open, direction }: { theme: Theme; open: boolean; direction: 'ltr' | 'rtl' }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme, direction),
      '& .MuiDrawer-paper': openedMixin(theme, direction),
    }),
    ...(!open && {
      ...closedMixin(theme, direction),
      '& .MuiDrawer-paper': closedMixin(theme, direction),
    }),
  }),
);

interface SidebarProps {
  open: boolean;
  onDrawerToggle: () => void;
}

interface NavItem {
  key: string;
  path: string;
  icon: React.ReactNode;
  translationKey: string;
  roles: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ open, onDrawerToggle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { direction } = useTheme();
  
  // Mock user role - in a real app, this would come from authentication context
  const userRole = 'qualityAdmin'; // One of: 'ceo', 'qualityAdmin', 'hod', 'staff'
  
  const navItems: NavItem[] = [
    { key: 'dashboard', path: '/', icon: <DashboardIcon />, translationKey: 'navigation.dashboard', roles: ['ceo', 'qualityAdmin', 'hod', 'staff'] },
    { key: 'admin', path: '/admin', icon: <AdminPanelSettingsIcon />, translationKey: 'navigation.admin', roles: ['qualityAdmin'] },
    { key: 'documents', path: '/documents', icon: <ArticleIcon />, translationKey: 'navigation.documents', roles: ['ceo', 'qualityAdmin', 'hod', 'staff'] },
    { key: 'performance', path: '/performance', icon: <SpeedIcon />, translationKey: 'navigation.performance', roles: ['ceo', 'qualityAdmin', 'hod'] },
    { key: 'risks', path: '/risks', icon: <WarningAmberIcon />, translationKey: 'navigation.risks', roles: ['ceo', 'qualityAdmin', 'hod'] },
    { key: 'audit-compliance', path: '/audit-compliance', icon: <GavelIcon />, translationKey: 'navigation.auditCompliance', roles: ['ceo', 'qualityAdmin', 'hod'] },
    { key: 'training', path: '/training', icon: <SchoolIcon />, translationKey: 'navigation.training', roles: ['ceo', 'qualityAdmin', 'hod', 'staff'] },
    { key: 'feedback', path: '/feedback', icon: <FeedbackIcon />, translationKey: 'navigation.feedback', roles: ['ceo', 'qualityAdmin', 'hod', 'staff'] },
    { key: 'incidents', path: '/incidents', icon: <ReportProblemIcon />, translationKey: 'navigation.incidents', roles: ['ceo', 'qualityAdmin', 'hod'] },
    { key: 'safety', path: '/safety', icon: <HealthAndSafetyIcon />, translationKey: 'navigation.safety', roles: ['ceo', 'qualityAdmin', 'hod'] },
    { key: 'meetings', path: '/meetings', icon: <MeetingRoomIcon />, translationKey: 'navigation.meetings', roles: ['ceo', 'qualityAdmin', 'hod'] },
    { key: 'strategy-projects', path: '/strategy-projects', icon: <FlagIcon />, translationKey: 'navigation.strategyProjects', roles: ['ceo', 'qualityAdmin', 'hod'] },
    { key: 'knowledge', path: '/knowledge', icon: <MenuBookIcon />, translationKey: 'navigation.knowledge', roles: ['ceo', 'qualityAdmin', 'hod', 'staff'] },
  ];
  
  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      direction={direction}
      anchor={direction === 'rtl' ? 'right' : 'left'}
    >
      <DrawerHeader>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: open ? 'flex-start' : 'center', px: 2 }}>
          {open && (
            <Typography variant="h6" noWrap component="div">
              {t('app.title')}
            </Typography>
          )}
        </Box>
        <IconButton onClick={onDrawerToggle}>
          {direction === 'rtl' ? 
            (open ? <ChevronRightIcon /> : <ChevronLeftIcon />) : 
            (open ? <ChevronLeftIcon /> : <ChevronRightIcon />)}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.path || 
                         (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: isActive ? 'action.selected' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    ml: open ? 0 : 'auto',
                    justifyContent: 'center',
                    color: isActive ? 'primary.main' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={t(item.translationKey)} 
                  sx={{ 
                    opacity: open ? 1 : 0,
                    color: isActive ? 'primary.main' : 'inherit',
                    fontWeight: isActive ? 'bold' : 'normal',
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;