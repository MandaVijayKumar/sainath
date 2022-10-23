import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { collegeDumy } from "../../Redux/authSlice";
import {useSelector} from 'react-redux';


function ClassRoomTable({ jnbCode, statusHandler,stat }) {
  const [classData, setClassData] = useState([]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const dumy = useSelector((state) => state.authentication.dumy)

  console.log(classData);
  const deleteHandler = (courseId, courseName, medium, roomNo) => {
    axios.post(`http://127.0.0.1:5000/deleteClass`,{jnbCode:jnbCode, courseId: courseId, courseName: courseName, medium: medium,roomNo: roomNo}).then((result) => {
       if(result.data.success) {
        alert('delete class is successfull...!')
        setStatus(!status);
        statusHandler();
       dispatch(collegeDumy());
       } else {
        alert('delete class is failed...!')
       }
    }).catch(error => alert('delete failed...!'))
  }
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/getClasses/${jnbCode}`)
      .then((result) => {
        console.log('classes', result)
        if (result.data.success) {
          setClassData(result.data.data);
          
        } else {
          alert("fetching classes data failed...!");
        }
      })
      .catch((error) => console.log(error));
  }, [status,dumy]);
  return (
    <div className="container-fluid">
      <h4 className="text-center text-primary mt-2 ">Classroom Information </h4>
      <div className="row" style={{ backgroundColor: "#a6e3" }}>
      {classData.length > 0
          ? classData.map((classes, index) => (
              <div key={index} className="col-sm-4 mx-auto my-2">
                <Card style={{ width: "26rem" }}>
                  <Card.Img
                    variant="top"
                    src={`http://127.0.0.1:5000/uploads/${classes.classImage}`}
                  />
                  <Card.Body>
                    <Card.Title>
                       Class Room No-{classes.roomNo}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Course-{classes.courseName}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      Capacity-{classes.capacity} students
                    </Card.Subtitle>

                    
                    <Card.Text>Square feets-{classes.measurements}</Card.Text>
                    <Button variant="primary" size="sm" onClick = {() => deleteHandler(classes.courseId, classes.courseName,classes.medium, classes.roomNo)}>
                      delete
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          : null}
      </div>
      </div>
  );
}

export default ClassRoomTable;
