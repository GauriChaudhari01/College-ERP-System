import { Box, Button, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FeeStructureList = () => {
  const navigate = useNavigate();
  const [feeStructures, setFeeStructures] = useState([]);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchFeeStructures = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/getfeestructurebyclg", {
          CollegeId: userData._id,
        });

        const data = response.data?.data || response.data;

        if (!Array.isArray(data)) {
          console.error("Expected an array from API but got:", data);
          return;
        }

        const dataWithIds = data.map(item => ({
          ...item,
          id: item._id,
        }));

        setFeeStructures(dataWithIds);
      } catch (error) {
        console.error("Error fetching fee structures:", error);
      }
    };

    if (userData?._id) {
      fetchFeeStructures();
    }
  }, [userData._id]);

  const columns = [
    { field: 'Course', headerName: 'Course', flex: 1 },
    { field: 'CourseYear', headerName: 'Course Year', flex: 1 },
    { field: 'TotalFee', headerName: 'Total Fee', flex: 1 },
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
          maxWidth: '1000px',
          padding: 4,
          borderRadius: 3,
          backgroundColor: '#ffffff',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Fee Structure List
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/feestructure')}
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
            + Add Fee Structure
          </Button>
        </Box>

        <DataGrid
          rows={feeStructures}
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

export default FeeStructureList;
