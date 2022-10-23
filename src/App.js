import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbars from "./Components/Navbar";
import Home from "./Pages/Home";
import CdcRegister from "./Pages/CdcRegister";
import { Routes, Route } from "react-router-dom";
import OfficialLogin from "./Pages/OfficialLogin";
import CollegeTable from "./Components/CollegeTable";
import CdcEditable from "./Components/CdcEditable";
import ViewCollege from "./Pages/ViewCollege";
import DownLoadTable from "./Pages/DownLoadTable";
import ProtectedRouter1 from "./Components/ProtectedRouter1";
import ProtectedRouter2 from "./Components/ProtectedRouter2";
import SafeRouter3 from "./Components/SafeRouter3";
import SafeRouter4 from "./Components/SafeRouter4";
import SafeRouter5 from "./Components/SafeRouter5";
import SafeRouter6 from "./Components/SafeRouter6";
import AddCourse from "./Components/CollegeDetails/AddCourse";
import AddFaculty from "./Components/CollegeDetails/AddFaculty";
import CourseList from "./Pages/CourseList";
import EditCollegeCourses from "./Pages/EditCollegeCourses";
import StudentEnroll from "./Pages/StudentEnroll";
import AddLabs from "./Components/CollegeDetails/AddLabs";
import AddClassroom from "./Components/CollegeDetails/AddClassroom";
import CollegeLoginPage from "./Pages/CollegeLoginPage";
import AllDataCollege from "./Pages/AllDataCollege";

function App() {
  return (
    <div>
      <Navbars />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/collegeLogin" element={<CollegeLoginPage />} />
        <Route path="/officialLogin" element={<OfficialLogin />} />
        <Route path='/allDataCollege' element={<AllDataCollege/>} />
        <Route
          path="/cdcRegister"
          element={
            <ProtectedRouter2>
              <CdcRegister />
            </ProtectedRouter2>
          }
        />
        <Route
          path="/collegeTable"
          element={
            <ProtectedRouter1>
              <CollegeTable />
            </ProtectedRouter1>
          }
        />
        <Route
          path="/cdeEditable/:jnbCode"
          element={
            <SafeRouter3>
              <CdcEditable />
            </SafeRouter3>
          }
        />
        <Route
          path="/viewCollege/:jnbCode"
          element={
            <SafeRouter4>
              <ViewCollege />
            </SafeRouter4>
          }
        />
        <Route
          path="/addCourse/:jnbCode"
          element={
            <SafeRouter6>
              <AddCourse />

            </SafeRouter6>
              
            
          }
        />
        <Route
          path="/addFaculty/:jnbCode"
          element={
            
              <AddFaculty />
            
          }
        />
        <Route
          path="/cdcViewCollege/:jnbCode"
          element={
            <SafeRouter5>
              <ViewCollege />
            </SafeRouter5>
          }
        />
        <Route path='/addCourseList' element={<CourseList/>} />
        <Route path='/courseCollegeEdit/:courseIdCollegeCode' element={<EditCollegeCourses/>} />
        <Route path='/addLabs/:jnbCode' element={<AddLabs/>} />
        <Route path='/addClassrooms/:jnbCode' element={<AddClassroom/>} />
        <Route path='/studentEnroll/:courseIdCollegeCode' element={<StudentEnroll/>} />
        <Route path="/downLoadTable" element={<DownLoadTable />} />
      </Routes>
    </div>
  );
}

export default App;
