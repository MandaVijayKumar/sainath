import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { officialLogin, checkEnable } from "../Redux/authSlice";

const OfficialLogin = () => {
  const [credential, setCredential] = useState([]);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    var authentication = [];

    if (credential.length > 0) {
      authentication = credential.filter(
        (auth) => auth.email === data.email && auth.password === data.password
      );
    }

    if (authentication.length > 0) {
      dispatch(officialLogin());
      if((authentication[0].email ==='vicechancellor@ruk.com' ) ||(authentication[0].email === 'cdcdean@ruk.com' )) {
         dispatch(checkEnable({value: true}));
      }
      navigate("/collegeTable");
    }
    if (authentication.length === 0) {
      alert("login failed");
      setData({ email: "", password: "" });
    }
  };
  const getData = () => {
    axios
      .get("http://127.0.0.1:5000/credential")
      .then((result) => {
        setCredential(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#388e8e",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          onSubmit={submitHandler}
          className="  m-1 text-center p-1 "
          style={{
            borderRadius: "10px",
            backgroundColor: "#2f2f4f",
            width: "80%",
          }}
        >
          <h4 className="text-white">Official Login</h4>
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
          <Button variant="success" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default OfficialLogin;
