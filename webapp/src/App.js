import React, { Component } from 'react';
import MapView from './MapView';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'

export default class App extends Component {
  state = {
    lat: 40.016869,
    lng: -105.279617,
    zoom: 13,
    img: "sample_image.jpg"
  }

  //<button onClick=""></button>

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Municipal Object Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
        <div id='main_container'>
            <MapView/>
        </div>
      </div>
    )
  }
}

