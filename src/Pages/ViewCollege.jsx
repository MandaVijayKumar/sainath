import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
// import {useNavigate} from 'react-router-dom';
import FacultyTable from "../Components/FacultyTable";
import CourseTable from "../Components/CollegeDetails/CourseTable";
import LabTable from "../Components/LabTable";
import ClassRoomTable from "../Components/CollegeDetails/ClassRoomTable";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import certificatepdf from "../assets/aprcet.pdf";

function ViewCollege() {
  const { jnbCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null)
  
  const [status, setStatus] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [analysis, setAnalysis] = useState(false);
  const isLogin = useSelector((state) => state.authentication.isCdcLogin);
  const [classData, setClassData] = useState([]);
  const [eachData, setEachData] = useState([]);
  const [enable, setEnable] = useState("false");
  const [buildingData, setBuildingData] = useState(undefined);
  const [doc,setDoc] = useState('land')
  const isCollegeLogin = useSelector(
    (state) => state.authentication.isCollegeLogin
  );

  const [collegeData, setCollegeData] = useState({
    jnbCode: "",
    collegeName: "",
    address: "",
  });
  const [data, setData] = useState({
    collegeName: "",
    collegeCode: "",
    totalCourses: "",
    totalFaculty: "",
    totalLabs: "",
    totalClasses: "",
    totalStudents: "",
    totalIntake: "",
    facultyEval: "",
    labCapacity: "",
    classCapacity: "",
  });

  console.log("total data", data);
  console.log("view enable is", enable);
  // let map;
  // if(buildingData !== undefined) {
  //   map = `https://maps.google.com/maps?q=15.834294313671508, 78.04838165168479&hl=es&z=14&amp;output=embed`
  // } else {
  //   map =''
  // }
  
console.log('what is loading',loading)
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
  const buildingHandler = () => {
    navigate(`/addBuilding/${jnbCode}`);
  };
  const statusHandler = () => {
    setStatus(!status);
  };
  const deleteBuildingHandler = () => {
    axios
      .post("http://127.0.0.1:5000/deleteBuilding", { jnbCode: jnbCode })
      .then((result) => {
        if (result.data.success === true) {
          alert(`  building is deleted successfully...!`);
          setBuildingData(undefined);
          setStatus(!status);
        } else {
          alert(" delete failed ...!");
        }
      })
      .catch((error) => console.log(error));
  };
  const analysisHandler = () => {
    setAnalysis(!analysis);
    let sumCourses = 0;
    let sumFaculty = 0;
    let sumLabs = 0;
    let sumClasses = 0;
    let sumIntake = 0;
    let sumStudents = 0;
    let sumLabCapcity = 0;
    let eachCourse = [];

    courseData.length > 0 &&
      courseData.forEach((course, index) => {
        let sum1 = 0;
        let sum2 = 0;
        labData.forEach((lab) => {
          if (course.courseName === lab.courseName) {
            sum1 = sum1 + Number(lab.capacity) * Number(lab.batches);
          }
        });
        classData.forEach((c) => {
          if (course.courseName === c.courseName) {
            sum2 = sum2 + Number(c.capacity);
          }
        });
        eachCourse.push({
          cname: course.courseName,
          lcount: sum1,
          ccount: sum2,
        });

        //  setEachData([...eachData, ])
      });
    setEachData(eachCourse);
    console.log("eachdata", eachData);
    courseData.length > 0 &&
      courseData.forEach((course, index) => {
        sumCourses = sumCourses + 1;
        sumFaculty = sumFaculty + Number(course.facultyCount);
        sumLabs = sumLabs + Number(course.labCount);
        sumClasses = sumClasses + Number(course.classCount);
        sumIntake = sumIntake + Number(course.allotedSeats);
        sumStudents = sumStudents + Number(course.enroll2022);
      });
    let facultyEval = sumFaculty - sumStudents / 25;

    let labCapacity = 0;
    if (labData.length > 0) {
      labData.forEach((lab) => {
        labCapacity = labCapacity + Number(lab.capacity) * Number(lab.batches);
      });
    }
    let classCapacity = 0;
    if (classData.length > 0) {
      classData.forEach((classes) => {
        classCapacity = classCapacity + Number(classes.capacity);
      });
    }
    setData({
      collegeCode: jnbCode,
      collegeName: collegeData.collegeName,
      totalCourses: sumCourses,
      totalFaculty: sumFaculty,
      totalLabs: sumLabs,
      totalClasses: sumClasses,
      totalStudents: sumStudents,
      totalIntake: sumIntake,
      facultyEval: facultyEval,
      labCapacity: labCapacity,
      classCapacity: classCapacity,
    });
  };
  console.log("my building data", buildingData);
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
      .get(`http://127.0.0.1:5000/getLabs/${jnbCode}`, {
        onDownloadProgress: (dataUpload) => {
          console.log("upload loaded", dataUpload.loaded);
          console.log("download lab total", dataUpload.total);
          console.log(typeof dataUpload.total)
          console.log('percentage',Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100));
          setLoading(
            Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100)
          );
        },
      })
      .then((result) => {
        if (result.data.success) {
          setLabData(result.data.data);
          setLoading(null)
        } else {
          setLoading(null)
          alert("fetching lab data failed...!");
        }
      })
      .catch((error) => console.log(error));
    axios
      .get(`http://127.0.0.1:5000/getClasses/${jnbCode}`)
      .then((result) => {
        console.log("classes", result);
        if (result.data.success) {
          setClassData(result.data.data);
        } else {
          alert("fetching classes data failed...!");
        }
      })
      .catch((error) => console.log(error));
    axios
      .get(`http://127.0.0.1:5000/getBuilding/${jnbCode}`, {
        onDownloadProgress: (dataUpload) => {
          console.log("download loaded", dataUpload.loaded);
          console.log("download building total", dataUpload.total);
          console.log(typeof dataUpload.total)
          console.log('percentage',Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100));
          setLoading(
            Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100)
          );
        },
      })
      .then((result) => {
        console.log("building", result);
        if (result.data.success) {
          setBuildingData(result.data.data[0]);
          setLoading(null)
          
        } else {
          setLoading(null)
          alert("fetching building data failed...!");
        }
      })
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:5000/enable")
      .then((result) => {
        if (result.data.success === true) {
          setEnable(result.data.data[0].enable);
        } else {
          alert("fetch enable data failed...!");
        }
      })
      .catch((error) => console.log("error"));

    //end course data
  }, [status]);

  return (
    <div
      style={{ height: "100%", backgroundColor: "#f5e8a6", padding: "12px" }}
    >

      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 2.5,
          type: "spring",
          stiffness: 300,
        }}
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
      {loading !== null &&(<div className="contianer">
        <div className="progress m-2" style={{ height:'30px'}}>
          <div
            className="progress-bar progress-bar-striped bg-primary"
            role="progressbar"
            style={{width:`${loading}%`}}
            aria-valuenow={loading}
            aria-valuemin="0"
            aria-valuemax="100"
          >
           <h4 className="text-center text-white">{loading} % loading </h4> 
          </div>
        </div>
      </div>)}
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
        {isCollegeLogin && enable === "true" && (
          <>
            <Button variant="primary" onClick={courseHandler}>
              Add Course
            </Button>
            <Button
              variant="primary"
              onClick={facultyHandler}
              disabled={courseData.length > 0 ? false : true}
            >
              Add Faculty
            </Button>
            <Button
              variant="primary"
              onClick={labHandler}
              disabled={courseData.length > 0 ? false : true}
            >
              Add Lab
            </Button>
            <Button
              variant="primary"
              onClick={classroomHandler}
              disabled={courseData.length > 0 ? false : true}
            >
              Add Classroom
            </Button>
            <Button variant="primary" onClick={buildingHandler}>
              Add Building
            </Button>
          </>
        )}
      </div>
      <div className="text-end">
        {isLogin && (
          <Button
            variant="info"
            size="sm"
            onClick={() => setAnalysis(analysisHandler)}
          >
            {analysis ? "Close Analysis" : "Show Analysis"}
          </Button>
        )}
      </div>
      <div className="container-fluid mt-4">
        <CourseTable
          jnbCode={jnbCode}
          statusHandler={statusHandler}
          stat={status}
        />
      </div>
     

      {analysis && (
        <div
          className="container-fluid mt-2 pt-2"
          style={{
            minHeight: "300px",
            backgroundColor: "#c1c8e4",
            fontSize: "20px",
            fontFamily: "times-now",
          }}
        >
          <h4 className="text-center text-primary mt-2">
            Data Analysis Report
          </h4>
          <div className="container ">
            <h5 className="text-center">{data.collegeName}</h5>
            <h6 className="text-center">jnbCode- {data.collegeCode}</h6>
            <p>
              Total number of available Courses ={" "}
              <span>{data.totalCourses}</span>
            </p>
            <p>
              Total number of available Faculty ={" "}
              <span>{data.totalFaculty}</span>
            </p>
            <p>
              Total number of available Labs = <span>{data.totalLabs}</span>
            </p>
            <p>
              Total number of available Classes ={" "}
              <span>{data.totalClasses}</span>
            </p>
            <p>
              Total number of Intake Seats = <span>{data.totalIntake}</span>
            </p>
            <p>
              Total number of Student Admissions ( 2022 - 2023 ) ={" "}
              <span>{data.totalStudents}</span>
            </p>
            <p>
              Total number of empty seats ( 2022 - 2023 ) ={" "}
              {data.totalIntake - data.totalStudents}
            </p>

            {buildingData !== undefined && (
              <p>College Building Property = {buildingData.property}</p>
            )}
            {buildingData !== undefined && (
              <p>
                College Building Total Area = {buildingData.totalArea} square
                feets
              </p>
            )}
            <p>
              Faculty defeciency -{" "}
              <span>
                {" "}
                ( totalFaculty - totalStudents / 25 ) ={" "}
                {data.facultyEval < 0 ? (
                  <span className="text-danger">
                    {data.facultyEval} (less faculty available - insufficient)
                  </span>
                ) : (
                  <span className="text-success">
                    +{data.facultyEval} (more faculty available - Sufficient)
                  </span>
                )}
              </span>
            </p>
            <p>
              Lab defeciency -{" "}
              <span>
                {" "}
                ( totalLabCapacity - totalStudents ) ={" "}
                {data.labCapacity - data.totalStudents < 0 ? (
                  <span className="text-danger">
                    {data.labCapacity - data.totalStudents} (less lab capacity
                    available - insufficient)
                  </span>
                ) : (
                  <span className="text-success">
                    +{data.labCapacity - data.totalStudents} (more lab Capacity
                    available - Sufficient)
                  </span>
                )}
              </span>
            </p>
            <p>
              ClassRoom defeciency -{" "}
              <span>
                {" "}
                ( totalClassCapacity - totalStudents ) ={" "}
                {data.classCapacity - data.totalStudents < 0 ? (
                  <span className="text-danger">
                    {data.classCapacity - data.totalStudents} (less ClassRoom
                    capacity available - insufficient)
                  </span>
                ) : (
                  <span className="text-success">
                    +{data.classCapacity - data.totalStudents} (more ClassRoom
                    Capacity available - Sufficient)
                  </span>
                )}
              </span>
            </p>
            {courseData.length > 0
              ? courseData.map((course, index) => {
                  return (
                    <>
                      <h5
                        key={index}
                        className="my-2 text-primary text-center "
                      >
                        Course Name - {course.courseName}
                      </h5>
                      <ul className="list-group">
                        <li
                          className="list-group-item"
                          style={{ backgroundColor: "" }}
                        >
                          Total number of available Faculty ={" "}
                          {course.facultyCount}{" "}
                        </li>
                        <li
                          className="list-group-item"
                          style={{ backgroundColor: "" }}
                        >
                          Total number of available Labs = {course.labCount}
                        </li>
                        <li
                          className="list-group-item"
                          style={{ backgroundColor: "" }}
                        >
                          Total number of available Classes ={" "}
                          {course.classCount}
                        </li>
                        <li
                          className="list-group-item"
                          style={{ backgroundColor: "" }}
                        >
                          Total number of Intake Seats = {course.allotedSeats}
                        </li>
                        <li
                          className="list-group-item"
                          style={{ backgroundColor: "" }}
                        >
                          Total number of Student Admissions ( 2022 - 2023 ) ={" "}
                          {course.enroll2022}
                        </li>
                        <li
                          className="list-group-item"
                          style={{ backgroundColor: "" }}
                        >
                          Total number of Empty seats ( 2022 - 2023 ) ={" "}
                          {course.allotedSeats - course.enroll2022}
                        </li>
                        <li
                          className="list-group-item"
                          style={{ backgroundColor: "" }}
                        >
                          Faculty defeciency ( totalFaculty - totalStudents / 25
                          ) ={" "}
                          {course.facultyCount - course.enroll2022 / 25 < 0 ? (
                            <span className="text-danger">
                              {course.facultyCount - course.enroll2022 / 25}{" "}
                              (less faculty available - insufficient)
                            </span>
                          ) : (
                            <span className="text-success">
                              +{course.facultyCount - course.enroll2022 / 25}{" "}
                              (more faculty available - Sufficient)
                            </span>
                          )}{" "}
                        </li>
                        <li
                          className="list-group-item"
                          style={{ backgroundColor: "" }}
                        >
                          Lab defeciency ( totalLabCapacity - totalStudents ) ={" "}
                          {eachData[index].lcount - course.enroll2022 < 0 ? (
                            <span className="text-danger">
                              {eachData[index].lcount - course.enroll2022} (less
                              lab capacity available - insufficient)
                            </span>
                          ) : (
                            <span className="text-success">
                              +{eachData[index].lcount - course.enroll2022}{" "}
                              (more lab Capacity available - Sufficient)
                            </span>
                          )}{" "}
                        </li>
                        <li
                          className="list-group-item"
                          style={{ backgroundColor: "" }}
                        >
                          classroom defeciency ( totalClassroomCapacity -
                          totalStudents ) ={" "}
                          {eachData[index].ccount - course.enroll2022 < 0 ? (
                            <span className="text-danger">
                              {eachData[index].ccount - course.enroll2022} (less
                              classroom capacity available - insufficient)
                            </span>
                          ) : (
                            <span className="text-success">
                              +{eachData[index].ccount - course.enroll2022}{" "}
                              (more classroom Capacity available - Sufficient)
                            </span>
                          )}{" "}
                        </li>
                      </ul>
                    </>
                  );
                })
              : null}
          </div>
        </div>
      )}

      <div className="container-fluid">
        <FacultyTable
          jnbCode={jnbCode}
          statusHandler={statusHandler}
          stat={status}
        />
      </div>
      <div className="container-fluid">
        <LabTable
          jnbCode={jnbCode}
          statusHandler={statusHandler}
          stat={status}
        />
      </div>
      <div className="container-fluid">
        <ClassRoomTable
          jnbCode={jnbCode}
          statusHandler={statusHandler}
          stat={status}
        />
      </div>
      {buildingData !== undefined && (
        <div className="container-fluid text-center">
          <h4 className="text-primary">College Building info</h4>
          <div className="row">
            <div className="col-sm-8 text-center m-auto">
              <Card style={{ width: "50rem" }}>
                <Card.Img
                  variant="top"
                  src={`http://127.0.0.1:5000/uploads/${buildingData.image1}`}
                />
                <Card.Body>
                  <Card.Title>Front Building</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Property - {buildingData.property}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    Total Area - {buildingData.totalArea} square feets
                  </Card.Subtitle>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={deleteBuildingHandler}
                  >
                    delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div
            className="row text-center my-5"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <div className="col-sm-3 p-1">
              <Card style={{ width: "26rem" }} className="m-1">
                <Card.Img
                  variant="top"
                  src={`http://127.0.0.1:5000/uploads/${buildingData.image2}`}
                />
              </Card>
            </div>
            <div className="col-sm-3 p-1">
              <Card style={{ width: "26rem" }}>
                <Card.Img
                  variant="top"
                  src={`http://127.0.0.1:5000/uploads/${buildingData.image3}`}
                />
              </Card>
            </div>
            <div className="col-sm-3 p-1">
              <Card style={{ width: "26rem"}}>
                <Card.Img
                  variant="top"
                  src={`http://127.0.0.1:5000/uploads/${buildingData.image4}`}
                />
              </Card>
            </div>
          </div>
        </div>
      )}
      {buildingData !== undefined && (
        <div>
          <div className="text-center" >
             <h5 className="text-primary mt-3">College Building Documentation</h5>
            <Button variant='primary' className='m-2' size='md' onClick={() => setDoc('land')}>
              Land Document
            </Button>
            

            { buildingData.property ==='Leased Building' && (<Button variant='primary' size='md' className='m-2' onClick={() => setDoc('leased')}>
              Leased Document
            </Button>)}
            <Button variant='primary' size='md' className='m-2' onClick={() => setDoc('ec')}>
              EC Document
            </Button>
            {(doc === 'land') &&(
              <iframe src={`http://127.0.0.1:5000/uploads/${buildingData.landfile}`} width='100%' height='700px'></iframe>
            )}
             {((doc === 'leased')&&(buildingData.property === 'Leased Building')) &&(
              <iframe src={`http://127.0.0.1:5000/uploads/${buildingData.leasedfile}`} width='100%' height='700px'></iframe>
            )}
             {(doc === 'ec') &&(
              <iframe src={`http://127.0.0.1:5000/uploads/${buildingData.ecfile}`} width='100%' height='700px'></iframe>
            )}

          </div>
          <div className="map">
          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122843.11696966983!2d77.96976074613187!3d15.811998150279054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5ddf506b7c6c9%3A0x19a7ac74f858d6f2!2sKurnool%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1666961426710!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d121818.67489003231!2d78.43020777909207!3d17.419771935893376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sRestaurants!5e0!3m2!1sen!2sin!4v1666961749577!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1038413.302303255!2d78.8155966279508!3d15.569671736090713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5ddf506b7c6c9%3A0x19a7ac74f858d6f2!2sKurnool%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1666966440433!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
15.834294313671508, 78.04838165168479
<iframe 
  width="300" 
  height="170" 
  frameborder="0" 
  scrolling="no" 
  marginheight="0" 
  marginwidth="0" 
  src="https://maps.google.com/maps?q='{buildingData.lat}','{buildingData.lng}'&hl=es&z=14&amp;output=embed"
 >
 </iframe>
          </div>
          <div className="card">
            <div className="card-footer bg-secondary text-white">
              <h6>
                <u>Address</u>
              </h6>
              <p>{buildingData.address}</p>
              <h6>Phone Number : {buildingData.phoneNumber}</h6>
              <h6>Email : {buildingData.email}</h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ViewCollege;
