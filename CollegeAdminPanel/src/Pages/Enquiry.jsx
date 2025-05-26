import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddNewEnquiry = () => {
  const { userData } = useSelector((state) => state.user);

  const SubmitEnquiry = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const EnquiryData = Object.fromEntries(formData.entries());

    try {
      const result = await axios.post("http://localhost:5000/api/createenquiry", {
        ...EnquiryData,
        CollegeId: userData._id,
      });

      alert(result.data.message || "Enquiry submitted successfully");
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Failed to submit enquiry");
    }
  };

  const fieldStyle = {
    '& .MuiInputBase-root': { height: 36 },
    '& input': { fontSize: '0.875rem' },
  };

  const selectStyle = {
    '& .MuiInputBase-root': { height: 36 },
    '& .MuiSelect-select': { fontSize: '0.875rem', paddingY: '4px' },
  };

  return (
    <Box sx={{ p: 4, mt: 8, overflowX: 'hidden', overflowY: 'auto', minHeight: '100vh' }}>
      <Box
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Add Enquiry
        </Typography>

        <Box
          component="form"
          onSubmit={SubmitEnquiry}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* LEFT COLUMN */}
          <Box sx={{ flex: 1, minWidth: '48%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField size="small" label="Name" name="Name" type="text" required sx={fieldStyle} />
            <TextField size="small" label="Mobile Number" name="MobileNo" type="text" required sx={fieldStyle} />
            <TextField size="small" label="Email ID" name="EmailID" type="email" required sx={fieldStyle} />
            <TextField size="small" label="Address" name="Adress" type="text" required sx={fieldStyle} />
            <TextField size="small" label="City" name="City" type="text" required sx={fieldStyle} />
          </Box>

          {/* RIGHT COLUMN */}
          <Box sx={{ flex: 1, minWidth: '48%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            <TextField size="small" label="State" name="State" type="text" required sx={fieldStyle} />
            <TextField size="small" label="Pincode" name="Pincode" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Admission" name="admission" type="number" required sx={fieldStyle} />
            <FormControl size="small" required sx={selectStyle}>
              <InputLabel>Status</InputLabel>
              <Select label="Status" name="Status" defaultValue="">
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" size="small">
              Submit Enquiry
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewEnquiry;
