
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [uname, setUname] = useState('');
  const [file, setFile] = useState(null);
  const [studentsList, setStudentList] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('uname', uname);
    formData.append('profileimage', file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post('http://127.0.0.1:5001/register', formData, config).then(res => {
      if (res.data.success) {
        console.log('register successfully', res.data);
      }
      
     
     
    }).catch(err =>console.log(err));



  }

  const changeName = (e) => {
    setUname(e.target.value)


  }

  const uploadFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);

  }
  const getImages = async () => {
    const result = await axios.get('http://127.0.0.1:5001/images');
    console.log(result.data);
    setStudentList(result.data)
  }
  useEffect(  ()=> {
   getImages();

  },[])
  return (
    <div className="App" style={{width: '50%', margin: 'auto'}}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>username</Form.Label>
          <Form.Control type="text" value={uname} placeholder="Enter username" onChange={changeName} name="username" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>uload file</Form.Label>
          <Form.Control type="file"  onChange = {uploadFile} name="profileimage" />
         
        </Form.Group>
        <div>
          <Button variant='primary' type = 'submit' onClick={submitHandler}>submit</Button>
        </div>
      </Form>
      {/* <img src={`http://127.0.0.1:5001/uploads/${imageName}`} alt="not found" /> */}
      {
        studentsList.length> 0 ? studentsList.map(student =>( 
          <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`http://127.0.0.1:5001/uploads/${student.imageName}`}  />
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
       
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      </Card>
        )) :''
      }
    </div>
  );
}

export default App;
