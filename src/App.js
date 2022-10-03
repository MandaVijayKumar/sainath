
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navbars from './Components/Navbar';
import Home from './Pages/Home';
import CdcRegister from './Pages/CdcRegister';
import {Routes, Route} from 'react-router-dom'
import OfficialLogin from './Pages/OfficialLogin';
import CollegeTable from './Components/CollegeTable';
import CdcEditable from './Components/CdcEditable';

function App() {
 
  return (
    <div>
      <Navbars/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/officialLogin' element= {<OfficialLogin/>} />
        <Route path='/cdcRegister' element = {<CdcRegister/>} />
        <Route path='/collegeTable' element = {<CollegeTable/>} />
        <Route path= '/cdeEditable/:jnbCode' element = {<CdcEditable/>} />
      </Routes>
      
     
    </div>
  );
}

export default App;
