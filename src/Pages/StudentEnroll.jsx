import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function StudentEnroll() {
  const [courseData, setCourseData] = useState({
    courseId: "",
    collegeCode: "",
    allotedSeats: "",
    courseName: "",
    medium: "",

    enroll2018: "",
    enroll2019: "",
    enroll2020: "",
    enroll2021: "",
    enroll2022: "",
    enroll2023: "",
  });
  const { courseIdCollegeCode } = useParams();

  const [courseId, collegeCode] = courseIdCollegeCode.split("_");
  const jnbCode = collegeCode;
  console.log(courseId, collegeCode);
  console.log("cousse data", courseData);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/fetchCourse/${jnbCode}`)
      .then((result) => {
        console.log(result.data);
        const newCourseData = result.data.filter(
          (course) => course.courseId === courseId
        );
        console.log("new course data", newCourseData[0]);
        // const {
        //   courseId,
        //   courseName,
        //   collegeCode,
        //   collegeDuration,
        //   allotedSeats,
        //   medium,
        // } = newCourseData;
        // console.log(result.data);
        setCourseData({
          ...courseData,
          courseId: newCourseData[0].courseId,
          collegeCode: newCourseData[0].collegeCode,
          allotedSeats: newCourseData[0].allotedSeats,
          courseName: newCourseData[0].courseName,
          medium: newCourseData[0].medium,
        });

        if (result.data.success === false)
          alert("fetching course data failed, please add course detials");
      })
      .catch((error) => console.log("fetching course failed"));
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-5 m-auto">
          <Form responsive hover bordered>
            <h5>Student Enrollment(last five years)</h5>
            <Form.Group className="mb-3">
              <Form.Label>course id </Form.Label>
              <Form.Control
                type="text"
                placeholder="CourseId"
                value={courseData.courseId}
                name="courseId"
                readOnly
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="course name"
                value={courseData.courseName}
                name="courseName"
                readOnly
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control
                type="text"
                placeholder="Medium"
                value={courseData.medium}
                name="medium"
                readOnly
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alloted Seats</Form.Label>
              <Form.Control
                type="text"
                placeholder="allotedSeats"
                value={courseData.allotedSeats}
                name="allotedSeats"
                readOnly
                required
              />
            </Form.Group>

            
          </Form>
        </div>
      </div>
    </div>
  );
}

export default StudentEnroll;
