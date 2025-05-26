import React from 'react'
import { AppBar, Box } from '@mui/material';
import SideBar from './SideBar';
import MainContent from './MainContent';


const AdminLayout = () => {
  return (
    <Box
     sx={{
    display: 'flex',
    height: '100vh',           // Full viewport height
    overflow: 'hidden',        // Prevent scrolling
  }}>
       
        <SideBar/>
        <MainContent/>

    </Box>
  )
}

export default AdminLayout
