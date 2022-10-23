import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddFaculty() {
  const { jnbCode } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [qualificationImage, setQualificationImage] = useState(null);
  const [images, setImages] = useState({});
  const [facultyData, setFacultyData] = useState({
    jnbCode: jnbCode,
    facultyName: "",
    facultyDesignation: "",
    departmentName: "",

    courseId: "",
    courseName: "",
    medium:'English',
    highestDegree: "PG",
    facultyEmail: "",
    mobileNumber: "",
    accountNumber: "",
    ifcsCode: "",

    adharCardNumber: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const newFacultyData = {
      ...facultyData,
      courseName: courseName,
    };
    const filterData = courseData.filter(course => course.courseId ===facultyData.courseId && course.courseName === courseName && course.medium === facultyData.medium)
    console.log('my filter',filterData)
    if(filterData.length === 0) {
      alert(`failed due to not exits the combination of course id -${facultyData.courseId}, course name- ${courseName} and medium- ${facultyData.medium} in your college course list, please enter medium as per course table`)
      

    } else {
    if (facultyData.adharCardNumber.length === 12) {
      if (facultyData.mobileNumber.length === 10) {
        const formData = new FormData();
        formData.append("facultyName", facultyData.facultyName);
        formData.append("facultyEmail", facultyData.facultyEmail);
        formData.append("mobileNumber", facultyData.mobileNumber);
        formData.append("accountNumber", facultyData.accountNumber);
        formData.append("adharCardNumber", facultyData.adharCardNumber);
        formData.append("facultyDesignation", facultyData.facultyDesignation);
        formData.append("courseId", facultyData.courseId);
        formData.append("courseName", courseName);
        formData.append("ifcsCode", facultyData.ifcsCode);
        formData.append("highestDegree", facultyData.highestDegree);
        formData.append("jnbCode", facultyData.jnbCode);
        formData.append("departmentName", facultyData.departmentName);
        formData.append('medium', facultyData.medium);

        formData.append("profileImage", profileImage);
        formData.append("qualificationImage", qualificationImage);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        axios
          .post("http://127.0.0.1:5000/profileUpload", formData, config)
          .then((result) => {
            console.log(result);
            console.log(result.data);
            if (result.data.success) {
              alert("successfully register...!");
              navigate(`/viewCollege/${jnbCode}`);
            }
            if (result.data.success === false) {
              console.log('error checking',result.data)
              alert(`failed due to ${result.data.error}` );
            }
          })
          .catch((error) => console.log(error));
      } else {
        alert("please enter 10 digit mobile number");
      }
    } else {
      alert("please enter 12 digit adhar number");
    }
  }
  };
  const courseIdHandler = async (e) => {
    const promise = new Promise((success, failure) => {
      setFacultyData({
        ...facultyData,
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
        console.log("course data in faculty:", result.data);
        setCourseData(result.data);
      })
      .catch((error) => {
        console.log("fatching coure data in faculty falied");
      });
      
  }, []);
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
            <h5 className="text-primary m-2">Faculty Register Form</h5>
            <Form.Group className="mb-3">
              <Form.Label>Jnb Code</Form.Label>
              <Form.Control
                type="Number"
                placeholder="jnb code"
                value={facultyData.jnbCode}
                name="jnbCode"
                readOnly
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Faculty Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Faculty Name"
                value={facultyData.facultyName}
                name="facultyName"
                required
                onChange={(e) =>
                  setFacultyData({
                    ...facultyData,
                    [e.target.name]: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Faculty Designation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Faculty Designation"
                value={facultyData.facultyDesignation}
                name="facultyDesignation"
                required
                onChange={(e) =>
                  setFacultyData({
                    ...facultyData,
                    [e.target.name]: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Department Name"
                value={facultyData.departmentName}
                name="departmentName"
                required
                onChange={(e) =>
                  setFacultyData({
                    ...facultyData,
                    [e.target.name]: e.target.value.toUpperCase(),
                  })
                }
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
                      {course.courseId}- {course.courseName}
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
            <Form.Label>Select medium</Form.Label>
            <Form.Select
            name="medium"
            className="mb-4"
            required
            onChange={(e) =>
              setFacultyData({
                ...facultyData,
                [e.target.name]: e.target.value,
              })
            }
          >
            <option>Medium</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
            <option value="Urdu">Urdu</option>
          </Form.Select>
            <Form.Label>Select Highest Degree</Form.Label>
            <Form.Select
              name="highestDegree"
              className="mb-3"
              required
              onChange={(e) =>
                setFacultyData({
                  ...facultyData,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option> Highest Degree</option>
              <option value="Phd">Phd</option>
              <option value="PG">PG</option>
              <option value="Phd with NET">Phd with NET</option>
              <option value="Phd with SET">Phd with SET</option>
              <option value="Phd with NET and SET">
                Phd with NET and SET
              </option>
              <option value="PG with NET">PG with NET</option>
              <option value="PG with SET">PG with SET</option>
              <option value="PG with NET and SET">PG with NET and SET </option>
              <option value="other">Other</option>
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Faculty Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Faculty Email"
                value={facultyData.facultyEmail}
                name="facultyEmail"
                required
                onChange={(e) =>
                  setFacultyData({
                    ...facultyData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="mobile number-10 digits"
                value={facultyData.mobileNumber}
                name="mobileNumber"
                required
                onChange={(e) =>
                  setFacultyData({
                    ...facultyData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Account number"
                value={facultyData.accountNumber}
                name="accountNumber"
                required
                onChange={(e) =>
                  setFacultyData({
                    ...facultyData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ifcs Code </Form.Label>
              <Form.Control
                type="text"
                placeholder="ifcscode"
                value={facultyData.ifcsCode}
                name="ifcsCode"
                required
                onChange={(e) =>
                  setFacultyData({
                    ...facultyData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Adhar Card Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Adhar card number-12 digits"
                value={facultyData.adharCardNumber}
                name="adharCardNumber"
                required
                onChange={(e) =>
                  setFacultyData({
                    ...facultyData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Faculty Profile Image(only jpeg/jpg/png allowed)</Form.Label>
              <Form.Control
                type="file"
                name="profileImage"
                required
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>highestDegree convication certificate Image(only jpeg/jpg/png allowed)</Form.Label>
              <Form.Control
                type="file"
                name="qualificationImage"
                required
                onChange={(e) => setQualificationImage(e.target.files[0])}
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

export default AddFaculty;
