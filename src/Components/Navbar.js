import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image from '../assets/images/th.jfif'

function Navbars() {
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

                    <Navbar.Brand href="#home">
                        RAYALASEEMA UNIVERSITY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/officialLogin">OfficialLogin</Nav.Link>
                            {/* <Nav.Link href="/cdcRegister">CdcRegister</Nav.Link> */}

                        </Nav>
                    </Navbar.Collapse>
                
            </Navbar>
        </div>
    )
}

export default Navbars