import React, { useEffect, useState } from "react";
import axios from "axios";
// import colleges from '../assets/images/colleges.jpeg'
// import coures from '../assets/images/coures.jpeg'
// import book from "../assets/images/book.jpg";
import vc from "../assets/images/vc.jpg";
import "./Home.css";
import { motion } from "framer-motion";

// import {useSelector, useDispatch} from 'react-redux';
// import {officialLogin, collegeLogin} from '../Redux/authSlice'

function Home() {
  const [allData, setAllData] = useState({
    colleges: "",
    courses: "",
    faculty: "",
    students: "",
  });
  console.log(allData);
  // const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.authentication.isCdcLogin)
  // const isCollegeLogin = useSelector((state) => state.authentication.isCollegeLogin)
  // console.log(' home login is:', isLogin);
  // console.log(' home college login is:', isCollegeLogin);
  // // isLogin && dispatch(officialLogin());
  // // isCollegeLogin && dispatch(collegeLogin());
  // console.log(' home login is:', isLogin);
  // console.log(' home college login is:', isCollegeLogin);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/allData")
      .then((result) => {
        console.log("home result", result);
        if (result.data.success) {
          const { colleges, courses, faculty, students } = result.data.data;
          setAllData({
            colleges,
            courses,
            faculty,
            students,
          });
        }
      })
      .catch((error) => {
        console.log("home", error);
      });
  }, []);

  return (
    <div className="container-fluid home">
    <div className="row">
      <div className="col-sm-12">

      
      <div className="row ">
        <div className="col-sm-4  mx-auto mt-3">
          {" "}
          <motion.div
            className=" mt-2"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 2,
              type: "spring",
              stiffness: 200,
            }}
          >
            <img src={vc} alt="" className="img-fluid" />
          </motion.div>
          <div className="text-center text-white mt-1">
            <motion.h5
              initial={{ opacity: 0, x: "-100vw" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1,
                duration: 3,
                type: "spring",
                stiffness: 100,
              }}
            >
              Vice-Chancellor
            </motion.h5>
            <motion.h5
              initial={{ opacity: 0, x: "100vw" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1,
                duration: 3,
                type: "spring",
                stiffness: 100,
              }}
            >
              PROF. AKEPOGU ANANDA RAO
            </motion.h5>
          </div>
        </div>
        <div style={{ height: "200px" }}></div>

        <div
          className="text-white text-center"
          style={{
            fontSize: "18px",
            marginTop: "60px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <motion.span
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 1,
              duration: 1.5,
              type: "spring",
              stiffness: 100,
            }}
            style={{borderRadius:'4px', padding: '3px 6px' , boxShadow:'0px 0px 3px 0px white', outline:'0px solid white'}}
          >
            Colleges : {allData.colleges}{" "}
          </motion.span>
          <motion.span
            initial={{ x: "-100vw", opacity: 0}}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 1,
              duration: 2,
              type: "spring",
              stiffness: 100,
            }}
            style={{borderRadius:'4px', padding: '3px 6px' , boxShadow:'0px 0px 3px 0px white', outline:'0px solid white'}}
          >
            Courses : {allData.courses}{" "}
          </motion.span>
          <motion.span
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 1,
              duration: 2.5,
              type: "spring",
              stiffness: 100,
            }}
            style={{borderRadius:'4px', padding: '3px 6px' , boxShadow:'0px 0px 3px 0px white', outline:'0px solid white'}}
          >
            Faculty : {allData.faculty}{" "}
          </motion.span>
          <motion.span
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 1,
              duration: 3,
              type: "spring",
              stiffness: 100,
            }}
            style={{borderRadius:'4px', padding: '3px 6px' , boxShadow:'0px 0px 3px 0px white', outline:'0px solid white'}}
          >
            Students (2022-2023) : {allData.students}{" "}
          </motion.span>
          
        </div>
        </div>

    </div>
      </div>
    </div>
  );
}

export default Home;
