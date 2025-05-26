import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FeeCollectionDueList = () => {
  const [feeCollection, setFeeCollection] = useState([]);
  const [selectedFeeData, setSelectedFeeData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [payingNow, setPayingNow] = useState('');
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData?._id) {
      fetchFeeCollection();
    }
  }, [userData._id]);

  const fetchFeeCollection = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/getfeebyclg', {
        CollegeId: userData._id,
      });

      const data = response.data.data;

      const dataWithIds = data.map((item) => ({
        ...item,
        id: item._id,
        Name: item.StudentId?.Name || 'N/A',
        StudentId: item.StudentId,
        CollegeId: item.CollegeId,
        RemainingFee: item.TotalFee - item.FeesPaid,
      }));

      setFeeCollection(dataWithIds);
    } catch (error) {
      console.error('Error fetching fee data:', error);
    }
  };

  const handleDialogOpen = (row) => {
    setSelectedFeeData(row);
    setPayingNow('');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedFeeData(null);
    setPayingNow('');
  };

  const handleFeeUpdate = async () => {
    if (!payingNow || Number(payingNow) <= 0) return;

    try {
      const res = await axios.put(`http://localhost:5000/api/updatefee`, {
        CollegeId: selectedFeeData.CollegeId,
        StudentId: selectedFeeData.StudentId._id,
        amount: Number(payingNow),
      });

      const updated = res.data.data;

      setFeeCollection((prev) =>
        prev.map((fee) =>
          fee._id === updated._id
            ? {
                ...fee,
                FeesPaid: updated.FeesPaid,
                RemainingFee: updated.RemainingFees || (updated.TotalFee - updated.FeesPaid),
              }
            : fee
        )
      );

      handleDialogClose();
    } catch (error) {
      console.error('Error updating fee:', error);
    }
  };

  const columns = [
    { field: 'Name', headerName: 'Student Name', flex: 1 },
    { field: 'TotalFee', headerName: 'Total Fee', flex: 1 },
    { field: 'FeesPaid', headerName: 'Fee Paid', flex: 1 },
    { field: 'RemainingFee', headerName: 'Remaining Fee', flex: 1 },
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
          onClick={() => handleDialogOpen(cell.row)}
        >
          Pay Remaining Fee
        </Button>
      ),
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      py={6}
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
            Fee Collection And Due List
          </Typography>
          {/* Optional: You can add an "Add Fee" button here if needed */}
          {/* <Button variant="contained" color="primary">+ Add Fee</Button> */}
        </Box>

        <DataGrid
          rows={feeCollection}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          autoHeight
          sx={{ mt: 1 }}
        />

        <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
          <DialogTitle>Update Student Fee</DialogTitle>
          <DialogContent>
            {selectedFeeData && (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Student:</strong> {selectedFeeData.Name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Total Fee:</strong> ₹{selectedFeeData.TotalFee}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Paid Fee:</strong> ₹{selectedFeeData.FeesPaid}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Remaining Fee:</strong> ₹
                    {selectedFeeData.TotalFee - selectedFeeData.FeesPaid}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Amount Paying Now"
                    type="number"
                    value={payingNow}
                    onChange={(e) => setPayingNow(e.target.value)}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleFeeUpdate}
              disabled={!payingNow || Number(payingNow) <= 0}
            >
              Update Fee
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default FeeCollectionDueList;
