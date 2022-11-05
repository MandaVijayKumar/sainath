import React from "react";
// import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import image from "../assets/images/th.jfif";
import { useSelector, useDispatch } from "react-redux";
import { officialLogin, collegeLogin, checkEnable } from "../Redux/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

function Navbars() {
  const isLogin = useSelector((state) => state.authentication.isCdcLogin);
  const isCheck = useSelector((state) => state.authentication.isCheck);
  const isCollegeLogin = useSelector(
    (state) => state.authentication.isCollegeLogin
  );
  console.log("navbar login is:", isLogin);
  console.log('ischeck', isCheck)
  console.log("navbar college login is:", isCollegeLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(officialLogin());
    isCheck && dispatch(checkEnable({value: false}));
   

    navigate("/");
  };
  const logoutCollegeHandler = () => {
    dispatch(collegeLogin());
    navigate("/");
  };
  return (
    <div>
      <Navbar
        expand="lg"
        className="p-0"
        style={{
          backgroundColor: "#d7e6fa",
          color: "cyan",
          position: "sticky",
          top: "0",
        }}
      >
        <img
          src={image}
          width="30"
          height="30"
          className=""
          alt=""
          style={{ borderRadius: "50%", margin: "0px 3px" }}
        />

        <Navbar.Brand href="/" style={{ fontSize: "20px", fontWeight: "bold" }}>
          RAYALASEEMA UNIVERSITY
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto  "
            style={{ fontSize: "16px", fontWeight: "500" }}
          >
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                marginRight: "10px",
                color: "green",
                padding: "0px 10px",
              }}
            >
              <HomeOutlinedIcon fontSize="small" />
              Home
            </NavLink>



            <NavLink
              to="/collegeLogin"
              style={{
                textDecoration: "none",
                marginRight: "10px",
                color: "green",
                padding: "0px 10px",
              }}
            >
              <LoginOutlinedIcon fontSize="small" />
              CollegeLogin
            </NavLink>
            <NavLink
                to="/officialLogin"
                style={{
                  textDecoration: "none",
                  marginRight: "10px",
                  color: "green",
                  padding: "0px 10px",
                }}
              >
                <LoginOutlinedIcon
                  fontSize="small"
                  sx={{ marginRight: "3px" }}
                />
                OfficialLogin
              </NavLink>



            {isLogin && (
              <NavLink
                onClick={logoutHandler}
                style={{
                  textDecoration: "none",
                  margin: "0px 5px",
                  color: "red",
                  paddingRight: "10px",
                }}
              >
                <LogoutOutlinedIcon fontSize="small" variant="danger" />
                Logout
              </NavLink>
            ) }

            {/* <Nav.Link href="/cdcRegister">CdcRegister</Nav.Link> */}
            {isCollegeLogin && (
              <NavLink
                onClick={logoutCollegeHandler}
                style={{
                  textDecoration: "none",
                  marginRight: "10px",
                  color: "red",
                  paddingRight: "10px",
                }}
              >
                <LogoutOutlinedIcon fontSize="small" variant="danger" />
                Logout
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navbars;
