import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image from '../assets/images/th.jfif';
import {useSelector, useDispatch} from 'react-redux';
import {officialLogin, collegeLogin} from '../Redux/authSlice'
import {useNavigate, NavLink} from 'react-router-dom';

function Navbars() {
    const isLogin = useSelector((state) => state.authentication.isCdcLogin)
    const isCollegeLogin = useSelector((state) => state.authentication.isCollegeLogin)
    console.log('navbar login is:', isLogin);
    console.log('navbar college login is:', isCollegeLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(officialLogin());
        navigate('/')

    }
    const logoutCollegeHandler = () => {
        dispatch(collegeLogin());
        navigate('/')

    }
    return (
        <div>
            <Navbar  expand="lg" className='p-0' style={{backgroundColor:'#D2FBA4', color:'cyan'}}>
                

                    <img
                        src={image}
                        width="30"
                        height="30"
                        className=""
                        alt=""
                        style={{borderRadius: '50%', margin:'0px 3px'}}
                    />

                    <Navbar.Brand href="#home" style={{fontSize:'20px', fontWeight: 'bold'}}>
                        RAYALASEEMA UNIVERSITY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto " style={{fontSize:'18px',fontWeight:'bold'}}>
                            <NavLink to="/" style={{textDecoration:'none', margin:'0px 5px'}}>Home</NavLink>
                            {
                                isLogin? <NavLink onClick={logoutHandler} style={{textDecoration:'none', margin:'0px 5px'}}>Logout</NavLink> : <NavLink to="/officialLogin" style={{textDecoration:'none', margin:'0px 5px'}}>OfficialLogin</NavLink>
                            }
                           
                            {/* <Nav.Link href="/cdcRegister">CdcRegister</Nav.Link> */}
                            {isCollegeLogin && <NavLink onClick={logoutCollegeHandler}>Logout</NavLink>}
                        </Nav>
                    </Navbar.Collapse>
                
            </Navbar>
        </div>
    )
}

export default Navbars