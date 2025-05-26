import { Box, Button, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData || !userData._id) return;

    const fetchEmployees = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/getemployeebyclg", {
          CollegeId: userData._id
        });

        const dataWithIds = response.data.data.map(item => ({
          ...item,
          id: item._id,
        }));

        setEmployees(dataWithIds);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, [userData]);

  const columns = [
    {
      field: 'EmpPhoto',
      headerName: 'Photo',
      flex: 1,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000/${params.row.EmpPhoto}`}
          alt="Emp"
          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
        />
      ),
    },
    { field: 'Name', headerName: 'Name', flex: 1 },
    { field: 'Gender', headerName: 'Gender', flex: 1 },
    { field: 'Designation', headerName: 'Designation', flex: 1 },
    { field: 'MobileNo', headerName: 'Mobile No', flex: 1 },
    { field: 'EmailId', headerName: 'Email ID', flex: 1 },
    { field: 'Education', headerName: 'Education', flex: 1 },
    { field: 'IsNetQualified', headerName: 'NET Qualified', type: 'boolean', flex: 1 },
    { field: 'IsSetQualified', headerName: 'SET Qualified', type: 'boolean', flex: 1 },
    { field: 'IsPhdQualified', headerName: 'PhD Qualified', type: 'boolean', flex: 1 },
    { field: 'JoiningDate', headerName: 'Joining Date', flex: 1 },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={4}
        sx={{
          width: '95%',
          maxWidth: '1200px',
          padding: 4,
          borderRadius: 3,
          backgroundColor: '#ffffff',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Employee List
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/staffmanagement/addfaculty')}
            sx={{
              backgroundColor: '#1976d2',
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          >
            + Add Employee
          </Button>
        </Box>

        <DataGrid
          rows={employees}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          autoHeight
        />
      </Paper>
    </Box>
  );
};

export default EmployeeList;
