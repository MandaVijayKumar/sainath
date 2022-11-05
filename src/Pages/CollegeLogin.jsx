import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { collegeLogin } from "../Redux/authSlice";
import { motion } from "framer-motion";

const CollegeLogin = () => {
  const [data, setData] = useState({ jnbCode: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isChecked = useSelector((state) => state.authentication.isCdcLogin)

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/collegeLogin", data)
      .then((result) => {
        if (result.data.success) {
          dispatch(collegeLogin());
          navigate(`/viewCollege/${data.jnbCode}`);
        } else {
          alert("login failed");
          setData({ jnbCode: "", password: "" });
        }
      })
      .catch((error) => {
        alert("login failed");
        setData({ jnbCode: "", password: "" });
        console.log("error", error);
      });
  };

  useEffect(() => {}, []);
  return (
    <>
      <motion.div
        initial={{ y: -300, opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 2, type: "spring", stiffness: 300 }}
        className="container-fluid text-center"
        style={{
          margin: "auto",
          //   backgroundColor: "#696969",
          //   height: "100vh",
          display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <Form
          onSubmit={submitHandler}
          className="  m-1 text-center p-1 "
          style={{
            borderRadius: "10px",
            // backgroundColor: "#8da2bc",
            backgroundColor: "#708196",
            width: "80%",
          }}
        >
          <h4 className="pb-2">College Login</h4>
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="JnbCode"
              value={data.jnbCode}
              name="jnbCode"
              onChange={(e) => setData({ ...data, jnbCode: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={data.password}
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            style={{ backgroundColor: "#3a5894", fontSize: "16px" }}
          >
            Login
          </Button>
        </Form>
      </motion.div>
    </>
  );
};

export default CollegeLogin;
