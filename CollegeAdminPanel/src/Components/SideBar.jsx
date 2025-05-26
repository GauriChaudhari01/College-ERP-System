import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MenuTree from './MenuTree';
import { logout } from '../ReduxWork/UserSlice';

const drawerWidth = 240;

const SideBar = () => {
  const { isLogin, userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1E293B', // Dark blue-gray
            color: '#F8FAFC', // Light text
            borderRight: '1px solid #334155',
            overflow: 'hidden',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List disablePadding>
          <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px',
              borderBottom: '1px solid #334155',
              backgroundColor: '#0F172A',
            }}
          >
            <GridViewTwoToneIcon sx={{ color: '#F8FAFC' }} />
            <ListItemText
              primary="Admin Dashboard"
              primaryTypographyProps={{ fontWeight: 'bold', fontSize: '16px' }}
            />
          </ListItem>

          {userData?.CollegePhoto && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <img
                alt="Logo"
                src={`http://localhost:5000/UploadImages/${userData.CollegePhoto}`}
                height={120}
                width={120}
                style={{
                  borderRadius: '50%',
                  border: '2px solid #38bdf8',
                  objectFit: 'cover',
                  boxShadow: '0 0 12px rgba(56, 189, 248, 0.5)',
                }}
              />
            </Box>
          )}

          <Divider sx={{ backgroundColor: '#334155', my: 1 }} />

          {/* MenuTree */}
          {isLogin && (
            <Box sx={{ overflow: 'auto', px: 1 }}>
              <MenuTree />
            </Box>
          )}
        </List>
      </Drawer>

      {/* Main Content and AppBar */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: '#0F172A',
            borderBottom: '1px solid #334155',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
              College Dashboard
            </Typography>

            {isLogin ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: deepOrange[500], mr: 1 }}>
                  {userData?.Name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography variant="body1" sx={{ mr: 1 }}>
                  {userData?.Name}
                </Typography>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ color: '#F8FAFC' }}
                  aria-controls={open ? 'user-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/clgprofile'); }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        {/* AppBar Spacer */}
        <Toolbar />

        {/* Your main routed content can go here */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2, backgroundColor: '#F1F5F9' }}>
          {/* Outlet or Page Content */}
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
