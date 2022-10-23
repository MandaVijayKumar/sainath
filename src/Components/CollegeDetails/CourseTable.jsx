
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { collegeDumy } from "../../Redux/authSlice";
import {useSelector} from 'react-redux';

function CourseTable({jnbCode, statusHandler, stat}) {
    
    const navigate = useNavigate();
    
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [courseData, setCourseData] = useState([]);
    const dispatch = useDispatch();
  
  const dumy = useSelector((state) => state.authentication.dumy)




    const editCourseHandler = (courseId, medium) => {
        navigate(`/courseCollegeEdit/${courseId}_${jnbCode}_${medium}`)
    };
    const deleteCourseHandler = (courseId, courseName, medium) => {
      const deleteData = {
        courseId: courseId,
        jnbCode: jnbCode,
        courseName: courseName,
        medium:medium
      };
      axios
      .post("http://127.0.0.1:5000/deleteCollegeCourses", deleteData)
      .then((result) => {
        if (result.data.success) {
          setDeleteStatus(!deleteStatus)
          alert(`courseId:${courseId} delete successfully...!  `);
          statusHandler();
          dispatch(collegeDumy());
        } else {
          alert("delete is failed...!");
        }
      });
    }

    useEffect(() => {
        axios
        .get(`http://127.0.0.1:5000/fetchCourse/${jnbCode}`)
        .then((result) => {
          // console.log(result.data);
          setCourseData(result.data);
          
  
          if (result.data.success === false)
            alert("fetching course data failed, please add course detials");
        })
        .catch((error) => console.log("fetching course failed"));

    },[deleteStatus, dumy ])
  return (
    <div>
         <div className="row">
        {courseData.length > 0 ? (
          <div className="col-sm-12">
            <h5 className="text-center text-primary">
              Course Information Table
            </h5>
            <Table
              responsive
              bordered
              hover
              className="text-center"
              style={{ backgroundColor: "#e2c9ca" }}
            >
              <thead style={{ backgroundColor: "#e2c9ca" }}>
                <tr>
                  <th>Sno</th>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Medium</th>
                  <th>Faculty Count</th>
                  <th>Lab Count</th>
                  <th>Class Count</th>
                  <th>Intake Seats</th>
                  <th>2018-2019</th>
                  <th>2019-2020</th>
                  <th>2020-2021</th>
                  <th>2021-2022</th>
                  <th>2022-2023</th>

                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {courseData.length > 0
                  ? courseData.map((course, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{course.courseId}</td>
                        <td>{course.courseName}</td>
                        <td>{course.medium}</td>
                        <td>{course.facultyCount}</td>
                        <td>{course.labCount}</td>
                        <td>{course.classCount}</td>
                        <td>{course.allotedSeats}</td>
                        
                        <td>{course.enroll2018}</td>
                        <td>{course.enroll2019}</td>
                        <td>{course.enroll2020}</td>
                        <td>{course.enroll2021}</td>
                        <td>{course.enroll2022}</td>
                        
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => editCourseHandler(course.courseId,course.medium)}
                          >
                            edit
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => deleteCourseHandler(course.courseId, course.courseName, course.medium)}
                          >
                            delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CourseTable;