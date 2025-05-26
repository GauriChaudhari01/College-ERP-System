import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Grid, Divider, Paper, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FeeChallan from '../Components/FeeChallan';
import Bonafide from '../Components/Bonafide';
import axios from 'axios';
import { useSelector } from 'react-redux';

const labelStyle = {
  fontWeight: '600',
  color: '#555',
  minWidth: 120,
  display: 'inline-block',
};

const StudentDetails = () => {
  const { state } = useLocation();
  const { userData } = useSelector((state) => state.user);

  const [feesStruct, setfeesStruct] = useState(null);

  if (!state) return <Typography>No student data provided.</Typography>;

  useEffect(() => {
    let fetchFeeStrucsByCourse = async () => {
      try {
        let feesStrures = await axios.post("http://localhost:5000/api/getfeestructuctbycourse", {
          CollegeId: userData._id,
          Course: state.Course,
          CourseYear: state.CourseYear,
        });

        setfeesStruct(feesStrures.data.data);
        console.log("Fees", feesStrures.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeeStrucsByCourse();
  }, [state, userData]);

  return (
    <Paper
  elevation={3}
  sx={{
    p: 4,
    maxWidth: 900,
    mx: 'auto',
    mt: 6,
    bgcolor: '#f9f9f9',
    overflowY: 'auto',       // Allow vertical scroll if needed inside paper
    maxHeight: '80vh',       // Limit height to viewport height so scroll appears
  }}
>

      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Student Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Avatar
              src={`http://localhost:5000/${state.StudentPhoto}`}
              alt="Student"
              sx={{ width: 120, height: 120, borderRadius: '50%' }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box mb={3}>
              <Typography variant="body1" fontWeight="600" gutterBottom>
                Personal Information
              </Typography>
              <Typography><strong>Name: </strong> {state.Name}</Typography>
              <Typography><strong>Gender: </strong> {state.Gender}</Typography>
              <Typography><strong>Category: </strong> {state.Category}</Typography>
              <Typography><strong>Aadhar No: </strong> {state.AadharNo}</Typography>
<Typography>
  <strong>DateOfBirth: </strong>{' '}
  {new Date(state.DateOfBirth).toLocaleDateString('en-GB')}
</Typography>            </Box>

            <Box mb={3}>
              <Typography variant="body1" fontWeight="600" gutterBottom>
                Contact Details
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography><span style={labelStyle}>Mobile No :</span> {state.MobileNo}</Typography>
              <Typography><span style={labelStyle}>Email: </span> {state.EmailID}</Typography>
              <Typography><span style={labelStyle}>Address: </span> {state.Address}</Typography>
              <Typography><span style={labelStyle}>City: </span> {state.City}</Typography>
              <Typography><span style={labelStyle}>District: </span> {state.District}</Typography>
              <Typography><span style={labelStyle}>State: </span> {state.State}</Typography>
              <Typography><span style={labelStyle}>Pincode: </span> {state.Pincode}</Typography>
            </Box>

            <Box>
              <Typography variant="body1" fontWeight="600" gutterBottom>
                Academic Details
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography><span style={labelStyle}>Course: </span> {state.Course}</Typography>
              <Typography><span style={labelStyle}>Course Year: </span> {state.CourseYear}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Buttons container */}
      <Box
        mt={5}
        display="flex"
        justifyContent="center"
        gap={3}
        flexWrap="wrap"
        px={2}
        py={2}
        bgcolor="#fff"
        borderRadius={2}
        boxShadow={1}
      >
        {feesStruct && (
          <PDFDownloadLink
            document={
              <FeeChallan
                data={{
                  studentData: state,
                  feeData: feesStruct,
                  dateOfIssue: new Date().toLocaleDateString('en-GB'),
                }}
                Name={userData?.Name || 'College Name'}
                CollegePhoto={userData?.CollegePhoto}
              />
            }
            fileName={`FeeChallan_${state.Name.replace(/\s+/g, '_')}.pdf`}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Button
                variant="contained"
                color="primary"
                sx={{ minWidth: 180 }}
              >
                {loading ? 'Preparing...' : 'Fee Challan'}
              </Button>
            )}
          </PDFDownloadLink>
        )}

        <PDFDownloadLink
          document={
            <Bonafide
              studentData={state}
              dateOfIssue={new Date().toLocaleDateString('en-GB')}
              CollegePhoto={userData?.CollegePhoto}
              CollegeName={userData?.Name || 'College Name'}
            />
          }
          fileName={`Bonafide_${state.Name.replace(/\s+/g, '_')}.pdf`}
          style={{ textDecoration: 'none' }}
        >
          {({ loading }) => (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ minWidth: 180 }}
            >
              {loading ? 'Preparing...' : 'Bonafide Certificate'}
            </Button>
          )}
        </PDFDownloadLink>
      </Box>
    </Paper>
  );
};

export default StudentDetails;
