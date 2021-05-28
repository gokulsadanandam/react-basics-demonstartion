import React from 'react';

import CryptoExchanges from './CryptoExchanges';
import CryptoNews from './Crypto.News';
import CryptoDetailed from './Crypto.Detailed';
import Dashboard from './Dashboard';

import { Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import Header from './App.Header';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/crypto-exchanges">
          <CryptoExchanges />
        </Route>
        <Route path="/news">
          <CryptoNews />
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
};

export default App;
