import React, { useState } from 'react';
import './style.css';

import CryptoLivePrices from './Crypto-Live-Prices';
import CryptoExchanges from './CryptoExchanges';
import CryptoList from './CryptoList';
import CryptoGraph from './Crypto-Graph';
import CryptoNews from './Crypto.News';
import CryptoNewsCarousel from './News.Carousel';
import CryptoStats from './Crypto.Stats';
import CryptoDetailed from './Crypto.Detailed';
import Dashboard from './Dashboard';

import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const App = withRouter(props => {
  return (
    <>
      <Navbar
        bg="dark"
        expand="lg"
        sticky="top"
        variant="dark"
        className="px-3"
      >
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
      <Switch>
        <Route path="/socket-table">
          <CryptoLivePrices />
        </Route>
        <Route path="/crypto-exchanges">
          <CryptoExchanges />
        </Route>
        <Route path="/crypto-list">
          <CryptoList />
        </Route>
        <Route path="/graphs">
          <CryptoGraph interval={'m15'} crypto={'bitcoin'} />
        </Route>
        <Route path="/news">
          <CryptoNews />
        </Route>
        <Route path="/news-carousel">
          <CryptoNewsCarousel />
        </Route>
        <Route path="/stats">
          <CryptoStats />
        </Route>
        <Route path="/crypto/:id">
          <CryptoDetailed />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </>
  );
});

export default App;
