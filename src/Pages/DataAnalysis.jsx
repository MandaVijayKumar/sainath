import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

function DataAnalysis({jnbCode, collegeName}) {
    const [courseData, setCourseData] = useState([]);
  const [labData, setLabData] = useState([])
  const isLogin = useSelector((state) => state.authentication.isCdcLogin)
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


  })

  
     
 useEffect(() => {
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


    //end course data


    //logic

    console.log('total data', data)
   
        
        let sumCourses = 0;
        let sumFaculty = 0;
        let sumLabs = 0;
        let sumClasses = 0;
        let sumIntake = 0;
        let sumStudents = 0;
        let sumLabCapcity =0;
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
        setData({
          collegeCode: jnbCode,
          collegeName: collegeName,
          totalCourses:sumCourses,
          totalFaculty:sumFaculty,
          totalLabs: sumLabs,
          totalClasses: sumClasses,
          totalStudents:sumStudents,
          totalIntake:sumIntake,
          facultyEval : facultyEval,
          labCapacity: labCapacity,
    
        })
       
    
      


    //

 },[])    





  return (
    <div className='container'>
        
          <div className="container mt-2 pt-2" style={{minHeight:'300px', backgroundColor:'#cdc5bf'}}>
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
              <p>Lab defeciency  - <span> ( totalLabCapacity - totalStudents  ) =  {data.labCapacity < 0 ? <span className="text-danger">{data.labCapacity} (less lab capacity available - insufficient)</span>:<span className="text-success">+{data.labCapacity} (more lab Capacity available - Sufficient)</span>}</span></p>
              
            </div>

          </div>
        

    </div>
  )
}

export default DataAnalysis