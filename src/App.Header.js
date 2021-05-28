import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { withRouter, Link } from 'react-router-dom';

const Header = withRouter(props => (
  <Navbar bg="dark" expand="lg" sticky="top" variant="dark" className="px-3">
    <Navbar.Brand onClick={() => props.history.push('/')} href="#">
      Cryptonite
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="px-3">
      <Nav style={{ marginRight: 'auto' }}>
        <Link to="/" className="custom-nav-link px-2">
          Home
        </Link>
        <Link to="/crypto-exchanges" className="custom-nav-link px-2">
          Exchanges
        </Link>
        <Link to="/news" className="custom-nav-link px-2">
          News
        </Link>
      </Nav>
      <Form style={{ display: 'inline-flex' }}>
        <FormControl
          type="text"
          placeholder="Search"
          style={{ marginRight: 8 }}
          onFocus={() => props.history.push('/graphs')}
          onBlur={() => props.history.push('/')}
        />
        <Button variant="outline-light">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
));

export default Header;
