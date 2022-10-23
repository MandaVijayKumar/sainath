import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form , Button} from "react-bootstrap";
import axios from 'axios';

function AddCourse() {
  const { jnbCode } = useParams();
  const navigate = useNavigate();
  const [courseDataList, setCourseDataList] = useState([]);
  const [courseList, setCourseList ] = useState([]);
  const [courseName, setCourseName ] = useState('');
  const [status, setStatus ] = useState(false);
  // console.log(jnbCode);
  const [courseData, setCourseData] = useState({
    courseId: "",
    courseName: "",
    collegeCode: jnbCode,
    courseDuration: "",
    medium: "",
    allotedSeats: "",
    facultyCount:'0',
    labCount:'0',
    enroll2018: '',
    enroll2019:'',
    enroll2020:'',
    enroll2021:'',
    enroll2022:'',
    classCount:'0',
  });
  const [courseData1, setCourseData1] = useState([]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    const newCourseData = {
      ...courseData,
      courseName: courseName
    }
    // console.log('new course data:', newCourseData)

    let selectedCourse = [];
    if(courseDataList.length >0) {
      selectedCourse = courseDataList.filter(course => (course.courseId === newCourseData.courseId) && (course.courseName === newCourseData.courseName) && (course.medium === newCourseData.medium))
    }
    
    if(selectedCourse.length === 0) {
      axios.post(`http://127.0.0.1:5000/registerCourse`, newCourseData).then(result => {
      
        if(result.data.success) {
          alert(`successfully Register course name: ${courseName} and course id : ${courseData.courseId}`)
          setStatus(!status)
          navigate(`/viewCollege/${jnbCode}`)
        } else {
          alert('register failed - please do not enter duplicate course name or unique course ID ...!')
  
        }
      }).catch(error => {
        
          alert('Course Register failed..!');
          setCourseData({courseId: "",
          courseName: "",
          collegeCode: jnbCode,
          courseDuration: "3",
          medium: "English",
          allotedSeats: "",})
        
      })
    

    } else {
      alert(`failed: Alread exits the submited course id ${newCourseData.courseId} and course name ${newCourseData.courseName} and medium ${newCourseData.medium}`)

    }
   
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

    axios
        .get(`http://127.0.0.1:5000/fetchCourse/${jnbCode}`)
        .then((result) => {
          // console.log(result.data);
          setCourseDataList(result.data);
          
  
          if (result.data.success === false)
            alert("fetching course data failed, please add course detials");
        })
        .catch((error) => console.log("fetching course failed"));
  },[status]);
  return (
    <div className="row">
      <div className="col-sm-3"></div>
      <div className="col-sm-6 text-center">
        <h5>Register Course </h5>
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
          <Form.Label>Select Course Id</Form.Label>
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
          <Form.Group className="mb-3">
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
          <Form.Label> Select Course Duration</Form.Label>
          <Form.Select
            name="courseDuration"
            className="mb-3"
            required
            onChange={(e) =>
              setCourseData({
                ...courseData,
                [e.target.name]: e.target.value,
              })
            }
          >
            <option> Course Duration</option>
            <option value="3">3 Years</option>
            <option value=" 2">2 Years</option>
            
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
          </Form.Select>
          <Form.Label>Select Course Medium</Form.Label>
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
            <option>Medium</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
            <option value="Urdu">Urdu</option>
          </Form.Select>
          <Form.Group className="mb-3">
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
          <Button type='submit' variant='success' size='small'>Register</Button>
        </Form>
      </div>
      <div className="col-sm-3"></div>
    </div>
  );
}

export default AddCourse;
