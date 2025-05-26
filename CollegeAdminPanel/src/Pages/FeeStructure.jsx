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
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddFeeStructure = () => {
  const { userData } = useSelector((state) => state.user);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCourseYear, setSelectedCourseYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formObject = Object.fromEntries(formData.entries());
    let total = 0;

    for (let key in formObject) {
      if (!['Course', 'CourseYear'].includes(key)) {
        let value = Number(formObject[key]) || 0;
        formObject[key] = value;
        if (key !== 'TotalFee') {
          total += value;
        }
      }
    }

    formObject.TotalFee = total;

    try {
      const result = await axios.post('http://localhost:5000/api/createfeestructure', {
        ...formObject,
        CollegeId: userData._id,
      });
      alert(result.data.message || 'Fee structure added successfully');
    } catch (error) {
      console.error('Error submitting fees:', error);
    }
  };

  const fieldStyle = {
    '& .MuiInputBase-root': { height: 36 },
    '& input': { fontSize: '0.875rem' },
  };

  return (
    <Box sx={{ p: 4, mt: 8, overflowX: 'hidden', overflowY: 'auto', minHeight: '100vh' }}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: 4,
          borderRadius: 3,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Add Fee Structure
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            alignItems: 'start',
          }}
        >
          {/* Column 1 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl size="small" required>
              <InputLabel>Course</InputLabel>
              <Select
                name="Course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                label="Course"
              >
                <MenuItem value="Bsc">Bsc</MenuItem>
                <MenuItem value="Msc">Msc</MenuItem>
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="MCA">MCA</MenuItem>
                <MenuItem value="BBA">BBA</MenuItem>
                <MenuItem value="MBA">MBA</MenuItem>
                <MenuItem value="Btech">Btech</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" required>
              <InputLabel>CourseYear</InputLabel>
              <Select
                name="CourseYear"
                value={selectedCourseYear}
                onChange={(e) => setSelectedCourseYear(e.target.value)}
                label="CourseYear"
              >
                <MenuItem value="FY">FY</MenuItem>
                <MenuItem value="SY">SY</MenuItem>
                <MenuItem value="TY">TY</MenuItem>
              </Select>
            </FormControl>

            <TextField size="small" label="Tuition Fee" name="TuitionFee" type="number" sx={fieldStyle} />
            <TextField size="small" label="College Development Fund" name="CollegeDevelopmentFund" type="number" sx={fieldStyle} />
            <TextField size="small" label="Admission Fee" name="AdmissionFee" type="number" sx={fieldStyle} />
            <TextField size="small" label="Alumni Association Fee" name="AlumniAssociationFee" type="number" sx={fieldStyle} />
            <TextField size="small" label="Ashwamedh Fee" name="AshwamedhFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Computerization Fee" name="ComputerizationFee" type="number" required sx={fieldStyle} />
           
          </Box>

          {/* Column 2 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField size="small" label="Disaster Management Fee" name="DisasterManagementFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="E-Suvidha Fee" name="ESuvidhaFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Eligibility Fee" name="EligibilityFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Flag Fund" name="FlagFund" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Gathering Fee" name="GatheringFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Green Energy Fee" name="GreenEnergyFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Gymkhana Fee" name="GymkhanaFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Identity Card Fee" name="IdentityCardFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Library Fee" name="LibraryFee" type="number" required sx={fieldStyle} />
          </Box>

          {/* Column 3 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField size="small" label="Magazine Fee" name="MagazineFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Medical Fee" name="MedicalFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Miscellaneous Fee" name="MiscellaneousFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="NSS Self Finance Unit" name="NSSSelfFinanceUnit" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Poor Student Aid Fee" name="PoorStudentAidFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Personality Development & Career Counseling Fee" name="PersonalityDevelopmentCareerCounselingFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Registration Fee" name="RegistrationFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Student Activity Fee" name="StudentActivityFee" type="number" required sx={fieldStyle} />

          </Box>

          {/* Column 4 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField size="small" label="Student Group Insurance" name="StudentGroupInsurance" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Training & Placement Fee" name="TrainingPlacementFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Tutorial & Internal Exam Fee" name="TutorialInternalExamFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Vivekanand Fee" name="VivekanandFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Dress Code Fee" name="DressCodeFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Exam Fee" name="ExamFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Industrial Visit Fee" name="IndustrialVisitFee" type="number" required sx={fieldStyle} />
            <TextField size="small" label="Farewell / Fresher Fee" name="FarewellFresherFee" type="number" required sx={fieldStyle} />

            <Button type="submit" variant="contained" color="primary" size="small">
              Submit Fee Structure
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddFeeStructure;
