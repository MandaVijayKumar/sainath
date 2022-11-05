import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddClassroom() {
  const [courseData, setCourseData] = useState([]);
  const [courseName, setCourseName] = useState("");

  const { jnbCode } = useParams();
  const [classImage, setClassImage] = useState("");
  const [classData1, setClassData1] = useState([]);
  const [uploading, setUploading] = useState(null)
  const [classData, setClassData] = useState({
    jnbCode: jnbCode,
    courseId: "",
    courseName: "",
    medium: "",

    roomNo: "",
    measurements: "",

    capacity: "",
  });
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const newLabData = {
      ...classData,
      courseName: courseName,
    };
    console.log(newLabData);
    console.log(classImage);
    if (
      classImage.type.toLowerCase().includes("/jpeg") ||
      classImage.type.toLowerCase().includes("/jpg") ||
      classImage.type.toLowerCase().includes("/png") ||
      classImage.type.toLowerCase().includes("/gif")
    ) {
         console.log('yes')
         const filterData = courseData.filter(
          (course) =>
            course.courseId === classData.courseId &&
            course.courseName === courseName &&
            course.medium === classData.medium
        );
        
    if (filterData.length === 0) {
      alert(
        `failed due to not exits the combination of course id -${classData.courseId}, course name- ${courseName} and medium- ${classData.medium} in your college course list, please enter medium as per course table`
      );
    } else {
      const filterClass = classData1.filter(
        (class1) =>
          class1.courseId === classData.courseId &&
          class1.courseName === courseName &&
          class1.medium === classData.medium &&
          class1.roomNo === classData.roomNo
      );
      console.log("my filter ", filterClass);
      if (filterClass.length > 0) {
        alert(`alread exits, please enter new classroom details`);
      } else {
        const formData = new FormData();
        formData.append("courseId", classData.courseId);
        formData.append("courseName", courseName);
        formData.append("jnbCode", classData.jnbCode);
        formData.append("medium", classData.medium);

        formData.append("roomNo", classData.roomNo);

        formData.append("capacity", classData.capacity);
        formData.append("measurements", classData.measurements);

        formData.append("classImage", classImage);

        axios
          .post("http://127.0.0.1:5000/addClass", formData,{
            onUploadProgress: (dataUpload) => {
              console.log("upload loaded", dataUpload.loaded);
              console.log("upload total", dataUpload.total);
              console.log(typeof dataUpload.total)
              console.log('percentage',Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100));
              setUploading(
                Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100)
              );
            },
          })
          .then((result) => {
            if (result.data.success) {
              
              alert("successfully insert classroom details...!");
              setUploading(null)
              navigate(`/viewCollege/${jnbCode}`);
            } else {
              if (result.data.success === false) {
                setUploading(null)
                alert(`failed:${result.data.error.sqlMessage}`);
              }
            }
          })
          .catch((error) => console.log(error));
      }
    }

    } else {
      console.log('no');
      alert('please upload class image file extention must be jpeg or jpg or gip or png')
    }
   
    

  };
  const courseIdHandler = async (e) => {
    const promise = new Promise((success, failure) => {
      setClassData({
        ...classData,
        [e.target.name]: e.target.value,
      });
      success(e.target.value);
    });
    const result = await promise;
    const courseNameSelection = courseData.filter(
      (course) => course.courseId === result
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
      .get(`http://127.0.0.1:5000/getClasses/${jnbCode}`)
      .then((result) => {
        console.log("classes", result);
        if (result.data.success) {
          setClassData1(result.data.data);
        } else {
          alert("fetching classes data failed...!");
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
            <h5 className="text-primary m-2">
              {" "}
              Register ClassRoom Information
            </h5>
            <Form.Group className="mb-3">
              <Form.Label>Jnb Code</Form.Label>
              <Form.Control
                type="Number"
                placeholder="jnb code"
                value={classData.jnbCode}
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

            <Form.Group className="mb-5">
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
                setClassData({
                  ...classData,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value="English">Course medium</option>
              <option value="English">English</option>
              <option value="Telugu">Telugu</option>
              <option value="Urdu">Urdu</option>
            </Form.Select>
            {uploading !== null &&(<div className="contianer">
        <div className="progress m-2" style={{ height:'30px'}}>
          <div
            className="progress-bar progress-bar-striped bg-primary"
            role="progressbar"
            style={{width:`${uploading}%`}}
            aria-valuenow={uploading}
            aria-valuemin="0"
            aria-valuemax="100"
          >
           <h4 className="text-center text-white">{uploading} % uploading </h4> 
          </div>
        </div>
      </div>)}

            <Form.Group className="mb-3">
              <Form.Label>Room No</Form.Label>
              <Form.Control
                type="number"
                placeholder="Room No "
                value={classData.roomNo}
                name="roomNo"
                required
                onChange={(e) =>
                  setClassData({
                    ...classData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ClassRoom Capacity</Form.Label>
              <Form.Control
                type="number"
                placeholder="How many students can accomidate in classroom."
                value={classData.capacity}
                name="capacity"
                required
                onChange={(e) =>
                  setClassData({
                    ...classData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ClassRoom Measurements(square feets)</Form.Label>
              <Form.Control
                type="number"
                placeholder="ClassRoom Measurements( in square feets)"
                value={classData.measurements}
                name="measurements"
                required
                onChange={(e) =>
                  setClassData({
                    ...classData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Classroom Image</Form.Label>
              <Form.Control
                type="file"
                name="classImage"
                required
                onChange={(e) => setClassImage(e.target.files[0])}
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

export default AddClassroom;
