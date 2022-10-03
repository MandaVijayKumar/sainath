import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const OfficialLogin = () => {
  const [credential, setCredential ] = useState([])
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await axios.get('http://127.0.0.1:5000/credential');
    if( result.data) setCredential(result.data);
    const authentication = credential.filter((auth) => auth.email === data.email & auth.password === data.password)
    if( authentication.length !== 0) navigate('/collegeTable')
    if( authentication.length === 0) {
        alert('login failed');
        setData({email:'', password: ''})
    }
  };
  return (
    <>
      <div className="container m-5">
        <Form
          onSubmit={submitHandler}
          className=" w-75 m-auto text-center p-1 "
          style={{ borderRadius: "10px", backgroundColor:'#f210da' }}
        >
          <h4>Official Login</h4>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={data.email}
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={data.password}
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default OfficialLogin;
