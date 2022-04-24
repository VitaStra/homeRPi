import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function NavComponent() {
    return (
        <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">HomeRPi</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#tempSection">Teplota</Nav.Link>
              <Nav.Link href="#humiditySection">Vlhkost</Nav.Link>
              <Nav.Link href="#plantsSection">Rostliny</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
export default NavComponent;