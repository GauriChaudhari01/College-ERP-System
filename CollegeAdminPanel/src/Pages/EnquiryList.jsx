import { Box, Button, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EnquiryList = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const result = await axios.post("http://localhost:5000/api/getenqbyclg", {
          CollegeId: userData._id,
        });

        const dataWithIds = result.data.data.map(enq => ({
          ...enq,
          id: enq._id,
        }));

        setEnquiries(dataWithIds);
      } catch (error) {
        console.error("Failed to fetch enquiries:", error);
      }
    };

    fetchEnquiries();
  }, [userData._id]);

  const columns = [
    { field: 'Name', headerName: 'Name', flex: 1 },
    { field: 'MobileNo', headerName: 'Mobile No', flex: 1 },
    { field: 'EmailID', headerName: 'Email ID', flex: 1 },
    { field: 'City', headerName: 'City', flex: 1 },
    { field: 'State', headerName: 'State', flex: 1 },
    { field: 'Pincode', headerName: 'Pincode', flex: 1 },
    { field: 'Status', headerName: 'Status', flex: 1 },
      {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (cell) => (
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() =>
            navigate('/studManagement/addnewstudent', { state: cell.row })
          }
        >
          Admission
        </Button>
      ),
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
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
            Enquiry List
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
            + Add Enquiry
          </Button>
        </Box>

        <DataGrid
          rows={enquiries}
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

export default EnquiryList;
