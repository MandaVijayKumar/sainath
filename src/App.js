
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navbars from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import {Routes, Route} from 'react-router-dom'

function App() {
 
  return (
    <div>
      <Navbars/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element= {<Login/>} />
      </Routes>
      
     
    </div>
  );
}

export default App;
