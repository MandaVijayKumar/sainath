import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";

function CourseList() {
  const [data, setData] = useState({ courseId: "", courseName: "", courseCategory:'' });
  const [courseListData, setCourseListData] = useState([]);
  const [status, setStatus] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:5000/courseList", data).then((result) => {
      if (result.data.success === true) {
        setStatus(!status);
        alert("new course added successfully...!");
      } else {
        alert("falied- new course failed to add in database");
      }
    });
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/getCourseList")
      .then((result) => {
        setCourseListData(result.data);
      })
      .catch((error) => {
        alert("fetching course list failed");
      });
  }, [status]);
  return (
    <div className="container">
      <div className="row mt-5 text-center">
        <div className="col-sm-5 m-auto">
          <Form
            onSubmit={submitHandler}
            style={{
              borderRadius: "10px",
              backgroundColor: "#af52ad",
              padding: "8px",
            }}
          >
            <h5 className="text-white">Register courses</h5>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Enter course Id"
                value={data.courseId}
                name="courseId"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter course name"
                value={data.courseName}
                name="courseName"
                onChange={(e) =>
                  setData({
                    ...data,
                    [e.target.name]: e.target.value.toUpperCase(),
                  })
                }
                required
              />
            </Form.Group>
            <Form.Label>Select Course Catergoy</Form.Label>
          <Form.Select
            name="courseCategory"
            className="mb-4"
            required
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          >
            <option value="Bachelor Of Sciences">Select Course Category</option>
            <option value="Bachelor Of Sciences">Bachelor Of Sciences</option>
            <option value="Bachelor Of Arts">Bachelor Of Arts</option>
           
          </Form.Select>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <div className="row mt-5 ">
        <div className="col-sm-6 m-auto text-center p-3">
          <h5 className="text-primary">Course List Information</h5>
          <Table
            bordered
            responsive
            hover
            style={{ backgroundColor: "#af52ad" }}
          >
            <thead>
              <tr>
                <th>Sno</th>
                <th>CourseId</th>
                <th>Course Name</th>
                <th>Course Category</th>
              </tr>
            </thead>
            <tbody>
              {courseListData.length > 0
                ? courseListData.map((course, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.courseId}</td>
                      <td>{course.courseName}</td>
                      <td>{course.courseCategory}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CourseList);
