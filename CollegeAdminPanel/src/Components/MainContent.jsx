import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Overview from '../Pages/Overview';
import FeeCollection from '../Pages/FeeCollection';
import AddNEwStudent from '../Pages/AddNEwStudent';
import StudentListProfiles from '../Pages/StudentListProfiles';
import AddFacultyStaff from '../Pages/AddFacultyStaff';
import StaffListAndRoles from '../Pages/StaffListAndRoles';
import FeeCollectionDue from '../Pages/FeeCollectionDue';
import Enquiry from '../Pages/Enquiry';
import Login from '../Components/Login';
import Register from '../Pages/Register';
import EnquiryList from '../Pages/EnquiryList';
import FeeStructureList from '../Pages/FeeStructureList';
import FeeStructure from '../Pages/FeeStructure';
import StudentDetails from '../Pages/StudentDetails';
import CollegeProfile from '../Pages/CollegeProfile';

const MainContent = () => {
  return (
    <Box component="main" sx={{ flexGrow:1, p:3, width:'100%'}}>
<Routes>
<Route path="/dashboard/overview" element={<Overview/>}/>
<Route path="/dashboard/feecollection" element={<FeeCollection/>}/>
<Route path="/dashboard/enquiry" element={<Enquiry/>}/>
<Route path="/dashboard/enquirylist" element={<EnquiryList/>}/>
<Route path='/studManagement/addnewstudent' element={<AddNEwStudent/>}/>
<Route path='/studManagement/studentlistandProfile' element={<StudentListProfiles/>}/>

<Route path='/staffmanagement/addfaculty' element={<AddFacultyStaff/>}/>
<Route path='/staffmanagement/stafflistandroles' element={<StaffListAndRoles/>}/>

<Route path='/fees/feestructurelist' element={<FeeStructureList/>}/>
<Route path='/fees/feeCollectiondues' element={<FeeCollectionDue/>}/>


<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/feestructure' element={<FeeStructure/>}/>
<Route path='/studdetails'element={<StudentDetails/>}/>
<Route path='/clgprofile' element={<CollegeProfile/>}/>

</Routes>

    </Box>
  )
}

export default MainContent