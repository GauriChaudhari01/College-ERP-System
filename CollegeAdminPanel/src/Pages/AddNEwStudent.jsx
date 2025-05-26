import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const AddStudent = () => {
  const studentdata = useLocation().state;
  const { userData } = useSelector((state) => state.user);
  const [selectImage, setselectImage] = useState(null);
  const [selectedCourse, setselectedCourse] = useState('');
  const [selectedCourseYear, setselectedCourseYear] = useState('');
  const [FeesPaid, setFeesPaid] = useState('');
  const [feestructure, setfeestructure] = useState([]);

  useEffect(() => {
    const fetchFeeStructures = async () => {
      try {
        const result = await axios.post("http://localhost:5000/api/getfeestructuctbycourse", {
          CollegeId: userData._id,
          Course: selectedCourse,
          CourseYear: selectedCourseYear
        });
        setfeestructure(result.data.data);
      } catch (error) {
        console.error("Failed to fetch Fees", error);
      }
    };

    fetchFeeStructures();
  }, [selectedCourse, selectedCourseYear, userData._id]);

  const handleChangeCourse = (e) => {
    setselectedCourse(e.target.value);
  };

  const handleChangeCourseYear = (e) => {
    setselectedCourseYear(e.target.value);
  };

  const postStudentFees = async (studId, formDataObject) => {
    const total = parseFloat(feestructure?.TotalFee || 0);
    const paid = parseFloat(FeesPaid || 0);

    const feesData = {
      StudentId: studId,
      CollegeId: userData?._id,
      Course: formDataObject.Course,
      CourseYear: formDataObject.CourseYear,
      TotalFee: total,
      FeesPaid: paid,
      RemainingFees: total - paid
    };

    try {
      return await axios.post("http://localhost:5000/api/createfee", feesData);
    } catch (error) {
      console.error("Fee post failed", error);
    }
  };

  const submitFormData = async (event) => {
    event.preventDefault();
    const formEntries = new FormData(event.target);
    const formDataObject = Object.fromEntries(formEntries.entries());

    try {
      const result = await axios.post(
        "http://localhost:5000/api/createstudent",
        {
          ...formDataObject,
          StudentPhoto: selectImage,
          CollegeId: userData._id,
          enquiryId: studentdata?._id,
          TotalFee: feestructure?.TotalFee || 0
        },
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      await postStudentFees(result.data.student._id, formDataObject);
      alert(result.data.message);
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  return (
   <Box sx={{ p: 2, background: '#f4f6f8', mt: 10 }}>
  <Box
    sx={{
      maxWidth: '1200px',
      mx: 'auto',
      backgroundColor: '#fff',
      p: 3,
      borderRadius: 3,
      boxShadow: 4
    }}
  >
    <Typography variant="h5" textAlign="center" mb={3}>
      Student Form
    </Typography>

        <form onSubmit={submitFormData}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 2
            }}
          >
            <TextField defaultValue={studentdata?.Name} fullWidth label="Student Name" name="Name" required />
            <TextField defaultValue={studentdata?.Address} fullWidth label="Address" name="Address" />
            <TextField defaultValue={studentdata?.Gender} fullWidth select label="Gender" name="Gender" required>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField defaultValue={studentdata?.DOB} fullWidth label="Date Of Birth" InputLabelProps={{ shrink: true }} type="date" name="DateOfBirth" />
            <FormControl size='small' required fullWidth>
              <InputLabel>Course</InputLabel>
              <Select name="Course" label="Course" value={selectedCourse} onChange={handleChangeCourse}>
                <MenuItem value="Bsc">Bsc</MenuItem>
                <MenuItem value="Msc">Msc</MenuItem>
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="MCA">MCA</MenuItem>
                <MenuItem value="BBA">BBA</MenuItem>
                <MenuItem value="MBA">MBA</MenuItem>
                <MenuItem value="Btech">Btech</MenuItem>
              </Select>
            </FormControl>
            <FormControl size='small' required fullWidth>
              <InputLabel>Course Year</InputLabel>
              <Select name="CourseYear" label="Course Year" value={selectedCourseYear} onChange={handleChangeCourseYear}>
                <MenuItem value="FY">FY</MenuItem>
                <MenuItem value="SY">SY</MenuItem>
                <MenuItem value="TY">TY</MenuItem>
              </Select>
            </FormControl>
            <TextField defaultValue={studentdata?.AcademicYear} fullWidth select label="Academic Year" name="AcademicYear">
              <MenuItem value="2025-26">2025-26</MenuItem>
              <MenuItem value="2024-25">2024-25</MenuItem>
            </TextField>
            <TextField defaultValue={studentdata?.AdmissionDate} fullWidth label="Admission Date" InputLabelProps={{ shrink: true }} type="date" name="AdmissionDate" />
            <TextField defaultValue={studentdata?.MobileNo} fullWidth label="Phone No." name="MobileNo" />
            <TextField defaultValue={studentdata?.EmailID} fullWidth label="Email" name="EmailID" />
            <TextField defaultValue={studentdata?.Password} fullWidth label="Password" name="Password" type="password" />
            <TextField defaultValue={studentdata?.AadharNo} fullWidth label="Aadhar No" name="AadharNo" type="number" />
            <TextField defaultValue={studentdata?.Category} fullWidth label="Category" name="Category" />
            <TextField defaultValue={studentdata?.City} fullWidth label="City" name="City" />
            <TextField defaultValue={studentdata?.District} fullWidth label="District" name="District" />
            <TextField defaultValue={studentdata?.State} fullWidth label="State" name="State" />
            <TextField defaultValue={studentdata?.Pincode} fullWidth label="Pincode" name="Pincode" type="number" />
            {feestructure?.TotalFee ? (
              <>
                <Typography>Total Fees: ₹{feestructure.TotalFee}</Typography>
                <TextField
                  size="small"
                  label="Fees Paid"
                  name="PaidFee"
                  type="number"
                  value={FeesPaid}
                  onChange={(e) => setFeesPaid(e.target.value)}
                  required
                />
                <Typography>
                  Remaining Fees: ₹{feestructure.TotalFee - parseFloat(FeesPaid || 0)}
                </Typography>
              </>
            ) : (
              <Typography color="text.secondary">Select Course & Year to see fee</Typography>
            )}
            <Button variant="outlined" component="label" fullWidth>
              Upload Photo
              <input
                type="file"
                hidden
                name="StudentPhoto"
                onChange={(e) => setselectImage(e.target.files[0])}
              />
            </Button>
            {selectImage && (
              <Typography variant="body2" mt={1}>
                Selected: {selectImage.name}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mt: 3 }}>
              Add Student
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddStudent;
