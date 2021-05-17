import React, { useState } from 'react';
import './style.css';

import CounterFunctionalComponent from './CounterFunctionalComponent';
import FormsComponent from './FormsComponent';
import TodoListComponent from './TodosListComponent';
import TableComponent from './Table';
import CryptoLivePrices from './Crypto-Live-Prices';
import CryptoExchanges from './CryptoExchanges';
import CryptoList from './CryptoList';
import CryptoGraph from './Crypto-Graph';
import CryptoNews from './Crypto.News';
import CryptoNewsCarousel from './News.Carousel';
import CryptoStats from './Crypto.Stats';
import CryptoDetailed from './Crypto.Detailed';

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
            {/* <Link to="/" className="custom-nav-link px-2">
              Counter
            </Link>
            <Link to="/forms" className="custom-nav-link px-2">
              Forms
            </Link>
            <Link to="/todos" className="custom-nav-link px-2">
              Todos
            </Link> */}
            {/* <Link to="/crypto-list" className="custom-nav-link px-2">
              Cryptos
            </Link> */}
            <Link to="/" className="custom-nav-link px-2">
              Home
            </Link>
            <Link to="/crypto-exchanges" className="custom-nav-link px-2">
              Exchanges
            </Link>
            <Link to="/news" className="custom-nav-link px-2">
              News
            </Link>
            {/* <Link to="/news-carousel" className="custom-nav-link px-2">
              News Carousel
            </Link> */}
            <Link to="/stats" className="custom-nav-link px-2">
              Market Stats
            </Link>
            <Link to="/crypto/bitcoisdfasn" className="custom-nav-link px-2">
              Detailed Info
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
        <Route path="/todos">
          <TodoListComponent />
        </Route>
        <Route path="/forms">
          <FormsComponent />
        </Route>
        <Route path="/table">
          <TableComponent />
        </Route>
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
          <CryptoList />
          {/* <CounterFunctionalComponent /> */}
        </Route>
      </Switch>
    </>
  );
});

export default App;
