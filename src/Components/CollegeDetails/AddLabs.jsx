import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddLabs() {
  const [courseData, setCourseData] = useState([]);
  const [courseName, setCourseName] = useState("");

  const { jnbCode } = useParams();
  const [labImage, setLabImage] = useState("");
  const [labData1, setLabData1] = useState([]);
  const [labData, setLabData] = useState({
    jnbCode: jnbCode,
    courseId: "",
    courseName: "",
    medium: "English",
    title: "",
    roomNo: "",
    batches: "",
    instruments: "",
    capacity: "",
  });
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const newLabData = {
      ...labData,
      courseName: courseName,
    };
    console.log(newLabData);
    console.log(labImage);
    const filterData = courseData.filter(
      (course) =>
        course.courseId === labData.courseId &&
        course.courseName === courseName &&
        course.medium === labData.medium
    );
    console.log("my filter", filterData);

    if (filterData.length === 0) {
      alert(
        `failed due to not exits the combination of course id -${labData.courseId}, course name- ${courseName} and medium- ${labData.medium} in your college course list, please enter medium as per course table`
      );
    } else {
      const filterLab = labData1.filter(
        (lab1) =>
          lab1.courseId === labData.courseId &&
          lab1.courseName === courseName &&
          lab1.medium === labData.medium &&
          lab1.roomNo === labData.roomNo
      );
      if (filterLab.length > 0) {
        alert(
          `already exits courseId-${labData.courseId},courseName-${courseName}, medium-${labData.medium} and room no- ${labData.roomNo}`
        );
      } else {
        const formData = new FormData();
        formData.append("courseId", labData.courseId);
        formData.append("courseName", courseName);
        formData.append("jnbCode", labData.jnbCode);
        formData.append("medium", labData.medium);
        formData.append("title", labData.title);
        formData.append("roomNo", labData.roomNo);
        formData.append("batches", labData.batches);
        formData.append("instruments", labData.instruments);
        formData.append("capacity", labData.capacity);

        formData.append("labImage", labImage);
        if (labData.instruments.length <= 1000) {
          axios
            .post("http://127.0.0.1:5000/addLabs", formData)
            .then((result) => {
              if (result.data.success) {
                alert("successfully insert lab details...!");
                navigate(`/viewCollege/${jnbCode}`);
              } else {
                if (result.data.success === false) {
                  alert(`failed:${result.data.error.sqlMessage}`);
                }
              }
            })
            .catch((error) => console.log(error));
        } else {
          alert(
            `failed: pleae enter instruments text area characters less than 1000`
          );
        }
      }
    }
  };
  const courseIdHandler = async (e) => {
    const promise = new Promise((success, failure) => {
      setLabData({
        ...labData,
        [e.target.name]: e.target.value,
      });
      success(e.target.value);
    });
    const result = await promise;
    const courseNameSelection = courseData.filter(
      (course) => course.courseId == result
    );

    setCourseName(courseNameSelection[0].courseName);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/getCourse/${jnbCode}`)
      .then((result) => {
        console.log("course data in labs:", result.data);
        setCourseData(result.data);
      })
      .catch((error) => {
        console.log("fatching coure data in lab falied");
      });
    axios
      .get(`http://127.0.0.1:5000/getLabs/${jnbCode}`)
      .then((result) => {
        if (result.data.success) {
          setLabData1(result.data.data);
        } else {
          alert("fetching lab data failed...!");
        }
      })
      .catch((error) => console.log(error));
  }, [jnbCode]);
  return (
    <div className="container-fluid">
      {/* <img src={`http://127.0.0.1:5000/uploads/IMG_20220716_191727.jpg-1665168043931`} alt="not found" /> */}
      <div className="row ">
        <div
          className="col-sm-12   "
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            onSubmit={submitHandler}
            className="text-center"
            style={{
              width: "80%",
              borderRadius: "10px",
              backgroundColor: "#34eadd",
              padding: "12px",
              fontSize: "16px",
            }}
          >
            <h5 className="text-primary m-2"> Register Lab Information</h5>
            <Form.Group className="mb-3">
              <Form.Label>Jnb Code</Form.Label>
              <Form.Control
                type="Number"
                placeholder="jnb code"
                value={labData.jnbCode}
                name="jnbCode"
                readOnly
                required
              />
            </Form.Group>
            <Form.Label>Select Course Id</Form.Label>
            <Form.Select
              name="courseId"
              className="mb-3"
              required
              onChange={courseIdHandler}
            >
              <option>Course Id</option>
              {courseData.length > 0
                ? courseData.map((course, index) => (
                    <option key={index} value={course.courseId}>
                      {course.courseId}-{course.courseName}
                    </option>
                  ))
                : null}
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Coure Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="course name"
                value={courseName}
                name="courseName"
                readOnly
                required
              />
            </Form.Group>
            <Form.Label>Select Medium</Form.Label>
            <Form.Select
              name="medium"
              className="mb-3"
              required
              onChange={(e) =>
                setLabData({
                  ...labData,
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
              <Form.Label>Lab Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Lab Title"
                value={labData.title}
                name="title"
                required
                onChange={(e) =>
                  setLabData({
                    ...labData,
                    [e.target.name]: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Room No</Form.Label>
              <Form.Control
                type="number"
                placeholder="Room No"
                value={labData.roomNo}
                name="roomNo"
                required
                onChange={(e) =>
                  setLabData({
                    ...labData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lab Capacity (total number)</Form.Label>
              <Form.Control
                type="number"
                placeholder="How many student can do lab at a time"
                value={labData.capacity}
                name="capacity"
                required
                onChange={(e) =>
                  setLabData({
                    ...labData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Batches (number)</Form.Label>
              <Form.Control
                type="number"
                placeholder="How many students batches divided for this lab (optional) "
                value={labData.batches}
                name="batches"
                onChange={(e) =>
                  setLabData({
                    ...labData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group> */}
            <Form.Label>Select Batches</Form.Label>
            <Form.Select
              name="batches"
              className="mb-3"
              required
              onChange={(e) =>
                setLabData({
                  ...labData,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value="1">Select Batches</option>
              <option value="1">1 batches</option>
              <option value="2">2 batches</option>
              <option value="3">3 batches</option>
            </Form.Select>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Instruments Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="instruments"
                value={labData.instruments}
                required
                placeholder="Total number of instruments(physical devices/software/chemical/ etc... (lest than 1000 characters)"
                onChange={(e) =>
                  setLabData({
                    ...labData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
                Lab Image ( only jpeg / jpg / png file extention allowed )
              </Form.Label>
              <Form.Control
                type="file"
                name="labImage"
                required
                onChange={(e) => setLabImage(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddLabs;
