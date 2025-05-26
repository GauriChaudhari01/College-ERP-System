import { Box, Button, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentListProfiles = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await axios.post("http://localhost:5000/api/getstudbyclg", {
          CollegeId: userData._id
        });

        const dataWithIds = result.data.data.map(item => ({
          ...item,
          id: item._id,
        }));
        setStudents(dataWithIds);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, [userData._id]);

  const columns = [
    {
      field: 'StudentPhoto',
      headerName: 'Photo',
      flex: 1,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000/${params.row.StudentPhoto}`}
          alt="Student"
          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
        />
      ),
    },
    { field: 'Name', headerName: 'Name', flex: 1 },
    { field: 'MobileNo', headerName: 'Mobile No', flex: 1 },
    { field: 'EmailID', headerName: 'Email ID', flex: 1 },
    { field: 'City', headerName: 'City', flex: 1 },
    { field: 'Category', headerName: 'Category', flex: 1 },
    { field: 'DateOfBirth', headerName: 'DOB', flex: 1 },
    { field: 'AadharNo', headerName: 'Aadhar No', flex: 1 },
    { field: 'Course', headerName: 'Course', flex: 1 },
    { field: 'CourseYear', headerName: 'Course Year', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      sortable: false,
      filterable: false,
      renderCell: (cell) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/studdetails', { state: cell.row })}
        >
          Student Details
        </Button>
      ),
    },
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
            Student List
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/dashboard/enquiry')}
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
            + Add Student
          </Button>
        </Box>

        <DataGrid
          rows={students}
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

export default StudentListProfiles;
