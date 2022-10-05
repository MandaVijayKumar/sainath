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

function App() {
  return (
    <div>
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/officialLogin" element={<OfficialLogin />} />
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
        <Route path="/viewCollege/:jnbCode" element={
        <SafeRouter4>
          <ViewCollege />

        </SafeRouter4>
        } />
        <Route path="/downLoadTable" element={<DownLoadTable />} />
      </Routes>
    </div>
  );
}

export default App;
