import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Checkbox, } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [type, setType] = useState('');
  const [naacGrade, setNaacGrade] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target)
    let reqData = Object.fromEntries(formData.entries())
    console.log(reqData)
    try {
      const result = await axios.post('http://localhost:5000/api/createclg', { ...reqData, CollegePhoto: selectedImage },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(result.data.data)
      alert(result.data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add college');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: '#f4f4f4',
        position: "absolute", right: 50, left: 50
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: 500,
          backgroundColor: '#fff',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Add College
        </Typography>

        <TextField label="Name" name="Name" size="small" required />
        <TextField label="Email ID" name="EmailId" size="small" type="email" required />
        <TextField label="Password" name="Password" size="small" type="password" required />
        <TextField label="Address" name="Address" size="small" required />
        <TextField label="City" name="City" size="small" required />
        <TextField label="District" name="District" size="small" required />
        <TextField label="State" name="State" size="small" required />
        <TextField label="Pincode" name="Pincode" size="small" type="number" required />

        <FormControl size="small" required>
          <InputLabel>Type</InputLabel>
          <Select name="Type" value={type} label="Type" onChange={(e) => setType(e.target.value)}>
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="Government">Government</MenuItem>
            <MenuItem value="Autonomous">Autonomous</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" required>
          <InputLabel>NAAC Grade</InputLabel>
          <Select
            name="NAACGrade"
            value={naacGrade}
            label="NAAC Grade"
            onChange={(e) => setNaacGrade(e.target.value)}
          >
            <MenuItem value="A++">A++</MenuItem>
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B++">B++</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B">B</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" component="label">
          Upload Photo
          <input type="file" hidden name="CollegePhoto" onChange={(e) => setSelectedImage(e.target.files[0])} />
        </Button>

        <FormControlLabel control={<Checkbox name="isBlock" />} label="Block this college?" />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
