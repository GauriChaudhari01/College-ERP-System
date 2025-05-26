import React, { useState } from 'react';
import {Box,Button,Checkbox,FormControl,FormControlLabel,InputLabel,MenuItem,Select,TextField,Typography,} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddFacultyStaff = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
   let {userData} = useSelector((state)=> state.user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

   

    const formObject = Object.fromEntries(formData.entries());
    formObject.IsNetQualified = formData.get('IsNetQualified') === 'on';
    formObject.IsSetQualified = formData.get('IsSetQualified') === 'on';
    formObject.IsPhdQualified = formData.get('IsPhdQualified') === 'on';

    console.log("Employee Data:", formObject);

    try {
      const result = await axios.post('http://localhost:5000/api/createemployee', {...formObject, EmpPhoto:selectedPhoto, CollegeId:userData._id }, 
        {
          headers:
          {'Content-Type': 'multipart/form-data'}
      });
      alert(result.data.message || "Employee added successfully");
    } catch (error) {
      console.error("Error submitting employee:", error);
      // alert("Failed to submit employee");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2, flexDirection: 'column', position: "absolute", right: 50, left: 50, top: 50 }}>
      <Typography variant='h5' align='center' gutterBottom>
        Add New Employee
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 500 }}>
        <TextField size="small" label="Name" name="Name" type="text" required />
        
        <FormControl size="small" required>
          <InputLabel>Gender</InputLabel>
          <Select label="Gender" name="Gender" defaultValue="">
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField size="small" label="Designation" name="Designation" type="text" />
        <TextField size="small" label="Mobile Number" name="MobileNo" type="text" />
        <TextField size="small" label="Email ID" name="EmailId" type="email" />
        <TextField size="small" label="Education" name="Education" type="text" />

        <FormControlLabel
          control={<Checkbox name="IsNetQualified" />}
          label="NET Qualified"
        />
        <FormControlLabel
          control={<Checkbox name="IsSetQualified" />}
          label="SET Qualified"
        />
        <FormControlLabel
          control={<Checkbox name="IsPhdQualified" />}
          label="PhD Qualified"
        />

        <TextField size="small" label="Joining Date" name="JoiningDate" type="date" InputLabelProps={{ shrink: true }} />

        <Button  variant="outlined" component="label">
          Upload Photo
          <input
            type="file"
            name="EmpPhoto"
            hidden
            onChange={(e) => setSelectedPhoto(e.target.files[0])}
          />
        </Button>

        {/* <TextField size="small" label="College ID" name="collegeId" type="text" required /> */}

        <Button type="submit" variant="contained" color="primary" size="small">
          Submit Employee
        </Button>
      </Box>
    </Box>
  );
};

export default AddFacultyStaff;
