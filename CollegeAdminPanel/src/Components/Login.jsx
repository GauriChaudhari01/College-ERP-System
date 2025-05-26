import React from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../ReduxWork/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();

  // let {collegeData} = useSelector((state)=> state.user)
let dispatcher =useDispatch()

let doLoginReq = async (e) => {
  e.preventDefault()
  let formEntries = new FormData(e.target)
  let loginCollegeData = Object.fromEntries(formEntries.entries())
  console.log("DATA", loginCollegeData);

  try {
      let loginResult = await axios.post("http://localhost:5000/api/dologin", loginCollegeData)
      console.log("RES", loginResult.data.data);
      dispatcher(login(loginResult.data.data))
      alert("login successfull")
      navigate('/dashboard/overview')
  } catch (error) {
    
      console.log(error);
  }
}
  return (
    <Box
      sx={{
        height: '100%',
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        position:"absolute",
        right:50,
        left:50

      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={(e)=>doLoginReq(e)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Email"
              name="EmailId"
              type="email"
              size="small"
              required
            />
            <TextField
              label="Password"
              name="Password"
              type="password"
              size="small"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </Box>
        </Paper>

        {/* Register Button */}
        <Box sx={{ marginTop: 2 }}>
          <Button variant="text" onClick={() => navigate('/register')}>
            New user? Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
