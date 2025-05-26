import React from 'react';
import { Box, Typography, Avatar, Divider, Grid, Paper } from '@mui/material';

const CollegeProfile = ({ collegeData }) => {
  if (!collegeData) {
    return <Typography variant="h6" align="center">No college data available.</Typography>;
  }

  return (
    <Paper 
      elevation={4}
      sx={{ 
        maxWidth: 900, 
        mx: 'auto', 
        mt: 6, 
        p: 4, 
        bgcolor: '#fefefe',
        borderRadius: 3,
      }}
    >
      {/* Header: Logo + Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={`http://localhost:5000/UploadImages/${collegeData.CollegePhoto}`}
          alt="College Logo"
          sx={{ width: 80, height: 80, mr: 2, borderRadius: '8px', border: '1px solid #ccc' }}
          variant="square"
        />
        <Typography variant="h4" fontWeight="700" color="primary">
          {collegeData.Name}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Contact & Address */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom fontWeight={600} color="text.secondary">
            Contact & Address
          </Typography>
          <Typography><strong>Email ID:</strong> {collegeData.EmailId}</Typography>
          <Typography><strong>Address:</strong> {collegeData.Address}</Typography>
          <Typography><strong>City:</strong> {collegeData.City}</Typography>
          <Typography><strong>District:</strong> {collegeData.District}</Typography>
          <Typography><strong>State:</strong> {collegeData.State}</Typography>
          <Typography><strong>Pincode:</strong> {collegeData.Pincode}</Typography>
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom fontWeight={600} color="text.secondary">
            Details
          </Typography>
          <Typography><strong>Type:</strong> {collegeData.Type}</Typography>
          <Typography><strong>NAAC Grade:</strong> {collegeData.NAACGrade}</Typography>
          <Typography><strong>Status:</strong> {collegeData.isBlock ? "Blocked" : "Active"}</Typography>
          <Typography sx={{ mt: 2, fontSize: 12, color: 'gray' }}>
            Registered on: {new Date(collegeData.createdAt).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CollegeProfile;
