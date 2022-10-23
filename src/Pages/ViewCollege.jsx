import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
// import {useNavigate} from 'react-router-dom';
import FacultyTable from "../Components/FacultyTable";
import CourseTable from "../Components/CollegeDetails/CourseTable";
import LabTable from "../Components/LabTable";
import ClassRoomTable from "../Components/CollegeDetails/ClassRoomTable";
import {useSelector} from 'react-redux';
import {motion} from 'framer-motion'


function ViewCollege() {
  const { jnbCode } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [labData, setLabData] = useState([])
  const [analysis, setAnalysis] = useState(false)
  const isLogin = useSelector((state) => state.authentication.isCdcLogin);
  const [classData, setClassData] = useState([]);
  const [eachData, setEachData] = useState([])

 
 
  const [collegeData, setCollegeData] = useState({
    jnbCode: "",
    collegeName: "",
    address: "",
  });
  const [data, setData] = useState({
    collegeName:'',
    collegeCode:'',
    totalCourses:'',
    totalFaculty:'',
    totalLabs:'',
    totalClasses:'',
    totalStudents:'',
    totalIntake:'',
    facultyEval:'',
    labCapacity: '',
    classCapacity: '',


  })

  console.log('total data', data)

   
  
  const courseHandler = () => {
    navigate(`/addCourse/${jnbCode}`);
  };
  const facultyHandler = () => {
    navigate(`/addFaculty/${jnbCode}`);
  };
  const labHandler = () => {
    navigate(`/addLabs/${jnbCode}`);
  };
  const classroomHandler = () => {
    navigate(`/addClassrooms/${jnbCode}`);
  };
  const addressHandler = () => {
    
  }
  const statusHandler = () => {
    setStatus(!status)
  }
  const analysisHandler = () => {
    setAnalysis(!analysis);
    let sumCourses = 0;
    let sumFaculty = 0;
    let sumLabs = 0;
    let sumClasses = 0;
    let sumIntake = 0;
    let sumStudents = 0;
    let sumLabCapcity =0;
    let eachCourse = [];
      
    
    
    courseData.length > 0 && courseData.forEach((course,index) => {
      let sum1 = 0;
      let sum2 = 0;
       labData.forEach((lab) => {
        if(course.courseName === lab.courseName) {
          sum1 = sum1 + (Number(lab.capacity)* Number(lab.batches))
        }
       })
       classData.forEach((c) => {
        if(course.courseName === c.courseName) {
          sum2 = sum2 + Number(c.capacity)
        }
       })
       eachCourse.push({cname: course.courseName, lcount: sum1, ccount:sum2})

      //  setEachData([...eachData, ])

    })
    setEachData(eachCourse)
    console.log('eachdata', eachData)
    courseData.length> 0 && courseData.forEach((course, index)=> {
          sumCourses = sumCourses + 1;
          sumFaculty = sumFaculty + Number(course.facultyCount);
          sumLabs = sumLabs + Number(course.labCount);
          sumClasses = sumClasses + Number(course.classCount);
          sumIntake = sumIntake + Number(course.allotedSeats);
          sumStudents = sumStudents + Number(course.enroll2022);
          
    })
    let facultyEval = (sumFaculty - (sumStudents / 25));
    
    let labCapacity = 0;
    if(labData.length >0) {
      labData.forEach((lab) => {
        labCapacity = labCapacity + (Number(lab.capacity) * Number(lab.batches))
      })

    }
    let classCapacity = 0;
    if(classData.length > 0) {
      classData.forEach(classes => {
        classCapacity = classCapacity + Number(classes.capacity);
      })
    }
    setData({
      collegeCode: jnbCode,
      collegeName: collegeData.collegeName,
      totalCourses:sumCourses,
      totalFaculty:sumFaculty,
      totalLabs: sumLabs,
      totalClasses: sumClasses,
      totalStudents:sumStudents,
      totalIntake:sumIntake,
      facultyEval : facultyEval,
      labCapacity: labCapacity,
      classCapacity: classCapacity,

    });


   

  }
 
 

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/viewCollege/${jnbCode}`)
      .then((result) => {
        const { jnbCode, collegeName, address } = result.data;
        setCollegeData({
          jnbCode,
          collegeName: collegeName.toUpperCase(),
          address,
        });
      })
      .catch((error) => alert("collecting data from database failed"));
      //get course data
      axios
      .get(`http://127.0.0.1:5000/getCourse/${jnbCode}`)
      .then((result) => {
        console.log("course data in faculty:", result.data);
        setCourseData(result.data);
      })
      .catch((error) => {
        console.log("fatching coure data in faculty falied");
      });
      axios
    .get(`http://127.0.0.1:5000/getLabs/${jnbCode}`)
    .then((result) => {
      if (result.data.success) {
        setLabData(result.data.data);
      } else {
        alert("fetching lab data failed...!");
      }
    })
    .catch((error) => console.log(error));
    axios
      .get(`http://127.0.0.1:5000/getClasses/${jnbCode}`)
      .then((result) => {
        console.log('classes', result)
        if (result.data.success) {
          setClassData(result.data.data);
          
        } else {
          alert("fetching classes data failed...!");
        }
      })
      .catch((error) => console.log(error));


      //end course data
   
  }, [status]);

  return (
    <div
      style={{ height: "100%", backgroundColor: "#dfd8d2", padding: "12px" }}
    >
      <motion.div
      initial={{opacity: 0, y:-200}}
      animate = {{opacity: 1, y: 0}}
      transition = {{delay:1.5, duration: 2.5, type:'spring', stiffness:300}}
        className="container  text-center text-white "
        style={{
          backgroundColor: "#8b3a62",
          minHeight: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
         
        }}
      >
        <h4>{collegeData.collegeName}</h4>
        <h6>JnbCode : {collegeData.jnbCode}</h6>
      </motion.div>
      <div
        className="container"
        style={{
          minHeight: "100px",
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
       
        variant="success" onClick={courseHandler}>
          Add Course
        </Button>
        <Button variant="success" onClick={facultyHandler}
        disabled= {courseData.length > 0? false: true}
        >
          Add Faculty
        </Button>
        <Button variant="success" onClick={labHandler} disabled= {courseData.length > 0? false: true}>
          Add Labs
        </Button>
        <Button variant="success" onClick={classroomHandler} disabled= {courseData.length > 0? false: true} >
          Add Classroom
        </Button>
        <Button variant="success" onClick={addressHandler} >
          Add Address
        </Button>
        {isLogin && (<Button variant="success" onClick={() => setAnalysis(analysisHandler)} >
         { analysis? 'Close Analysis':'Show Analysis'}
        </Button>)}
      </div>
      <div className="container-fluid mt-4">
        <CourseTable jnbCode={jnbCode} statusHandler={statusHandler} stat= {status}/>
       </div>
       {
        analysis && (
          <div className="container-fluid mt-2 pt-2" style={{minHeight:'300px', backgroundColor:'#cdc5bf'}}>
            <h5 className="text-center text-primary mt-2">Data Analysis</h5>
            <div className="container ">
              <h6 className="text-center">{data.collegeName}</h6>
              <h6 className="text-center">jnbCode- {data.collegeCode}</h6>
              <p>Total number of available Courses = <span>{data.totalCourses}</span></p>
              <p>Total number of available Faculty = <span>{data.totalFaculty}</span></p>
              <p>Total number of available Labs = <span>{data.totalLabs}</span></p>
              <p>Total number of available Classes = <span>{data.totalClasses}</span></p>
              <p>Total number of Intake Seats = <span>{data.totalIntake}</span></p>
              <p>Total number of Student Admissions ( 2022 - 2023 ) = <span>{data.totalStudents}</span></p>
              <p>Faculty defeciency  - <span> ( totalFaculty - totalStudents / 25 ) =  {data.facultyEval < 0 ? <span className="text-danger">{data.facultyEval} (less faculty available - insufficient)</span>:<span className="text-success">+{data.facultyEval} (more faculty available - Sufficient)</span>}</span></p>
              <p>Lab defeciency  - <span> ( totalLabCapacity - totalStudents  ) =  {(data.labCapacity-data.totalStudents) < 0 ? <span className="text-danger">{(data.labCapacity-data.totalStudents)} (less lab capacity available - insufficient)</span>:<span className="text-success">+{(data.labCapacity-data.totalStudents)} (more lab Capacity available - Sufficient)</span>}</span></p>
              <p>class defeciency  - <span> ( totalClassCapacity - totalStudents  ) =  {(data.classCapacity -data.totalStudents) < 0 ? <span className="text-danger">{(data.classCapacity -data.totalStudents)} (less Class capacity available - insufficient)</span>:<span className="text-success">+{(data.classCapacity -data.totalStudents)} (more Class Capacity available - Sufficient)</span>}</span></p>
              {
                courseData.length > 0 ? courseData.map((course,index) => {
                  return(
                    <>
                        <h5 key={index} className="my-2">Course Name - {course.courseName}</h5>
                        <ul className="list-group" >
                        <li className="list-group-item" style={{backgroundColor:'#cdc5bf'}}>Total number of available Faculty = {course.facultyCount} </li>
                          <li className="list-group-item" style={{backgroundColor:'#cdc5bf'}}>Total number of available Labs = {course.labCount}</li>
                          <li className="list-group-item" style={{backgroundColor:'#cdc5bf '}}>Total number of available Classes = {course.classCount}</li>
                          <li className="list-group-item" style={{backgroundColor:'#cdc5bf'}}>Total number of Intake Seats = {course.allotedSeats}</li>
                          <li className="list-group-item" style={{backgroundColor:'#cdc5bf'}}>Total number of Student Admissions ( 2022 - 2023 ) = {course.enroll2022}</li>
                          <li className="list-group-item" style={{backgroundColor:'#cdc5bf'}}>Faculty defeciency ( totalFaculty - totalStudents / 25 ) = {(course.facultyCount - (course.enroll2022/25)) < 0 ? <span className="text-danger">{(course.facultyCount - (course.enroll2022/25))} (less faculty available - insufficient)</span>:<span className="text-success">+{(course.facultyCount - (course.enroll2022/25))} (more faculty available - Sufficient)</span>} </li>
                          <li className="list-group-item" style={{backgroundColor:'#cdc5bf '}}>Lab defeciency ( totalLabCapacity - totalStudents  ) = {(eachData[index].lcount-course.enroll2022) < 0 ? <span className="text-danger">{(eachData[index].lcount-course.enroll2022)} (less lab capacity available - insufficient)</span>:<span className="text-success">+{(eachData[index].lcount-course.enroll2022)} (more lab Capacity available - Sufficient)</span>} </li>
                          <li className="list-group-item" style={{backgroundColor:'#cdc5bf '}}>classroom defeciency ( totalClassroomCapacity - totalStudents  ) = {(eachData[index].ccount-course.enroll2022) < 0 ? <span className="text-danger">{(eachData[index].ccount-course.enroll2022)} (less classroom capacity available - insufficient)</span>:<span className="text-success">+{(eachData[index].ccount-course.enroll2022)} (more classroom Capacity available - Sufficient)</span>} </li>
                         
                        </ul>

                    </>
                  )
                }):null
              }
            </div>

          </div>
        )
       }
       
      <div className="container-fluid">
        <FacultyTable jnbCode={jnbCode} statusHandler={statusHandler} stat= {status}/>
      </div>
      <div className="container-fluid">
        <LabTable jnbCode={jnbCode} statusHandler={statusHandler} stat= {status}/>
      </div>
      <div className="container-fluid">
        <ClassRoomTable jnbCode={jnbCode} statusHandler={statusHandler} stat= {status}/>
      </div>

    </div>
  );

      }
export default ViewCollege;
