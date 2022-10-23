import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form , Button} from "react-bootstrap";
import axios from 'axios';

function EditCollegeCourses() {
  const {courseIdCollegeCode}= useParams();
 
  const [courseId, collegeCode,medium] = courseIdCollegeCode.split('_');
  console.log(medium)
  const jnbCode = collegeCode;
  // console.log('course id', courseId);
  // console.log('collegecode', collegeCode);
  const navigate = useNavigate();
  const [courseList, setCourseList ] = useState([]);
  const [courseName, setCourseName ] = useState('');
  
//   console.log(jnbCode);
  const [courseData, setCourseData] = useState({
    courseId: " ",
    courseName: "",
    collegeCode: collegeCode,
    courseDuration: "",
    medium: "",
    allotedSeats: "",
    enroll2018:'',
    enroll2019:'',
    enroll2020:'',
    enroll2021:'',
    enroll2022:''
  });
  
  const submitHandler = (e) => {
    e.preventDefault();
    const newCourseData = {
      ...courseData,
      courseName: courseName,
      selectedMedium: medium,
    }
    // console.log('new course data:', newCourseData)
    
    axios.post(`http://127.0.0.1:5000/courseCollegeEdit/${courseId}_${collegeCode}`, newCourseData).then(result => {
      
      if(result.data.success) {
        alert(`successfully Edited course name: ${courseName} and course id : ${courseData.courseId}`)
        navigate(`/viewCollege/${jnbCode}`)
      } else {
        alert('Edit course failed - please do not enter duplicate course name or unique course ID ...!')

      }
    }).catch(error => {
      
        alert('Course Register failed..!');
        setCourseData({courseId: "",
        courseName: "",
        collegeCode: jnbCode,
        courseDuration: "",
        medium: "",
        allotedSeats: "",})
      
    })
  }
  const courseIdHandler = async (e) => {
    const p = new Promise((success, failure) => {
      setCourseData({...courseData, [e.target.name]: e.target.value});
      success(e.target.value)

    })
    const result = await p;
    const filterCourse = courseList.filter(course => course.courseId === result);
    // console.log('filter course is:', filterCourse[0].courseName);
    setCourseName(filterCourse[0].courseName)
    

    

  }
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/getCourseList').then((result)=> {
      // console.log('add coursess list', result.data);
      setCourseList(result.data);
    }).catch((error) => {
      alert(`fetching course list failed...!`)
    })
  },[]);
  return (
    <div className="row">
      <div className="col-sm-3"></div>
      <div className="col-sm-6 text-center">
        <h5>Edit Course Details</h5>
        <Form
          className="border border-primary bg-info p-3"
          style={{ borderRadius: "5px" }}
          onSubmit = {submitHandler}
        >
          <Form.Group className="mb-4">
            <Form.Label>Jnb Code</Form.Label>
            <Form.Control
              type="Number"
              placeholder="jnb code"
              value={courseData.collegeCode}
              name="collegeCode"
              readOnly
              required
            />
          </Form.Group>
          {/* <Form.Group className="mb-4">
            <Form.Label>Course Id</Form.Label>
            <Form.Control
              type="Number"
              placeholder="Course Id"
              value={courseData.courseId}
              name="courseId"
              required
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group> */}
            <Form.Select
            name="courseId"
            className="mb-4"
            required
            onChange={courseIdHandler}
          >
            <option>Course Id</option>
            {
              courseList.length > 0 ? courseList.map((course,index) =>(
                <option value={course.courseId}>{course.courseId}-{course.courseName}</option>
              )):null
            }
           
          </Form.Select>
          <Form.Group className="mb-5">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Course Name"
              value={courseName}
              name="courseName"
              readOnly
              required
              // onChange={(e) =>
              //   setCourseData({
              //     ...courseData,
              //     [e.target.name]: e.target.value.toUpperCase(),
              //   })
              // }
            />
          </Form.Group>
          <Form.Select
            name="courseDuration"
            className="mb-4"
            required
            onChange={(e) =>
              setCourseData({
                ...courseData,
                [e.target.name]: e.target.value,
              })
            }
          >
            <option>Course Duration</option>
            <option value=" 2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
          </Form.Select>
          <Form.Group className="mb-5">
            <Form.Label>Alloted Seats</Form.Label>
            <Form.Control
              type="text"
              placeholder="Alloted Seats"
              value={courseData.allotedSeats}
              name="allotedSeats"
              required
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  [e.target.name]: e.target.value.toUpperCase(),
                })
              }
            />
          </Form.Group>
          <Form.Select
            name="medium"
            className="mb-4"
            required
            onChange={(e) =>
              setCourseData({
                ...courseData,
                [e.target.name]: e.target.value,
              })
            }
          >
            <option>Course medium</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
            <option value="Urdu">Urdu</option>
          </Form.Select>
          <Form.Group className="mb-3">
              <Form.Label>2018-2019 </Form.Label>
              <Form.Control
                type="text"
                placeholder="student admission in 2018-2019"
                value={courseData.enroll2018}
                name="enroll2018"
                required
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>2019-2020 </Form.Label>
              <Form.Control
                type="text"
                placeholder="student admission in 2019-2020"
                value={courseData.enroll2019}
                name="enroll2019"
                required
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>2020-2021 </Form.Label>
              <Form.Control
                type="text"
                placeholder="student admission in 2020-2021"
                value={courseData.enroll2020}
                name="enroll2020"
                required
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>2021-2022 </Form.Label>
              <Form.Control
                type="text"
                placeholder="student admission in 2021-2022"
                value={courseData.enroll2021}
                name="enroll2021"
                required
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>2022-2023 </Form.Label>
              <Form.Control
                type="text"
                placeholder="student admission in 2022-2023"
                value={courseData.enroll2022}
                name="enroll2022"
                required
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            
            </Form.Group>
          <Button type='submit' variant='success' size='small'>Edit</Button>
        </Form>
      </div>
      <div className="col-sm-3"></div>
    </div>
  );
}

export default React.memo(EditCollegeCourses);
