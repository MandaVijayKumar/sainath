import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image from '../assets/images/th.jfif'

function Navbars() {
    return (
        <div>
            <Navbar bg="light" expand="lg" className='p-0'>
                <Container>

                    <img
                        src={image}
                        width="30"
                        height="30"
                        className=""
                        alt=""
                        style={{borderRadius: '50%'}}
                    />

                    <Navbar.Brand href="#home">
                        RAYALASEEMA UNIVERSITY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="">
                            <Nav.Link href="https://lucky-klepon-d4547b.netlify.app/">Home</Nav.Link>
                            <Nav.Link href="https://lucky-klepon-d4547b.netlify.app/login">Login</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navbars