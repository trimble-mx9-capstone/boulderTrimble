import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import {Link, NavLink, Route} from 'react-router-dom';

export default class AppNav extends Component {
  render() {
    return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Municipal Object Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link to="#home">Map</Nav.Link>
                <Nav.Link to="#link">Add new images</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>
    )
  }
}

