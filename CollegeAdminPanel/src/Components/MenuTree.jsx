import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Box, Typography } from '@mui/material';

const MenuTree = () => {
  const navigate = useNavigate();

  const renderLabel = (icon, label) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Typography variant="body2" sx={{ color: '#F8FAFC' }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <SimpleTreeView>
      <TreeItem
        itemId="1"
        label={renderLabel(<DashboardIcon sx={{ color: '#F8FAFC' }} />, 'Dashboard')}
      >
        <TreeItem itemId="2" label="Overview" onClick={() => navigate('/dashboard/overview')} />
        <TreeItem itemId="4" label="Fee Collection Summary" onClick={() => navigate('/dashboard/feecollection')} />
        <TreeItem itemId="5" label="Enquiry List" onClick={() => navigate('/dashboard/enquirylist')} />
      </TreeItem>

      <TreeItem
        itemId="6"
        label={renderLabel(<SchoolIcon sx={{ color: '#F8FAFC' }} />, 'Student Management')}
      >
        <TreeItem itemId="7" label="Add New Student" onClick={() => navigate('/studManagement/addnewstudent')} />
        <TreeItem itemId="8" label="Student List and Profiles" onClick={() => navigate('/studManagement/studentlistandProfile')} />
      </TreeItem>

      <TreeItem
        itemId="9"
        label={renderLabel(<PeopleIcon sx={{ color: '#F8FAFC' }} />, 'Faculty and Staff Management')}
      >
        <TreeItem itemId="10" label="Add Faculty/Staff" onClick={() => navigate('/staffmanagement/addfaculty')} />
        <TreeItem itemId="11" label="Staff List And Roles" onClick={() => navigate('/staffmanagement/stafflistandroles')} />
      </TreeItem>

      <TreeItem
        itemId="12"
        label={renderLabel(<AccountBalanceIcon sx={{ color: '#F8FAFC' }} />, 'Fees and Finance')}
      >
        <TreeItem itemId="13" label="Fee Structure List" onClick={() => navigate('/fees/feestructurelist')} />
        <TreeItem itemId="14" label="Fee Collection and Dues" onClick={() => navigate('/fees/feeCollectiondues')} />
      </TreeItem>
    </SimpleTreeView>
  );
};

export default MenuTree;
