import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { useDispatch } from "react-redux";
import { collegeDumy } from "../Redux/authSlice";
import {useSelector} from 'react-redux';

function LabTable({ jnbCode, statusHandler , stat}) {
  const [labData, setLabData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const dumy = useSelector((state) => state.authentication.dumy)

  console.log(labData);
  const deleteHandler = (courseId, courseName, medium, roomNo) => {
    axios.post(`http://127.0.0.1:5000/deleteLab` , {jnbCode,courseId,courseName,medium, roomNo}).then((result) => {
      if(result.data.success) {
        alert('delete lab details successfully...!');
        dispatch(collegeDumy());
        

      } else {
        alert('delete lab details failed...!');
      }
    }).catch(error => console.log(error))

  }
  useEffect(() => {
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
  }, [dumy]);
  return (
    <div className="container-fluid">
      <h4 className="text-center text-primary mt-2 ">Lab Information </h4>
      <div className="row" style={{ backgroundColor: "#a6e3" }}>
        {labData.length > 0
          ? labData.map((lab, index) => (
              <div key={index} className="col-sm-4 mx-auto my-2">
                <Card style={{ width: "26rem" }}>
                  <Card.Img
                    variant="top"
                    src={`http://127.0.0.1:5000/uploads/${lab.labImage}`}
                  />
                  <Card.Body>
                    <Card.Title>
                      {lab.title} ( Room No-{lab.roomNo})
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Course-{lab.courseName}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      Capacity-{lab.capacity} students
                    </Card.Subtitle>

                    <Card.Subtitle className="mb-2 text-muted">
                      Batches:{lab.batches}
                    </Card.Subtitle>
                    <Card.Text>{lab.instruments}</Card.Text>
                    <Button variant="primary" size="sm" onClick={() =>deleteHandler(lab.courseId, lab.courseName, lab.medium, lab.roomNo)}>
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

export default LabTable;
