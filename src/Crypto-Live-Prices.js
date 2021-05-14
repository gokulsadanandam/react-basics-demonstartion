import React, { useState, useEffect } from 'react';
import Title from './Title';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import './style';

export default function CryptoLivePrices() {
  const [cryptoPrices, SetCryptoPrices] = useState({
    previousPrice: {},
    currentPrice: {}
  });

  const [cryptoAssests, setCryptoAssets] = useState([]);
  const keys = ['name', 'supply', 'marketCapUsd', 'volumeUsd24Hr', 'vwap24Hr'];

  const fadeOutCss = {
    parentTh: {
      position: 'relative'
    },
    fixedOverLay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      background: 'red',
      opacity: 1,
      zIndex: -1,
      animation: 'fadeout 2s forwards'
    }
  };

  const cryptos = [
    'bitcoin',
    'ethereum',
    'ripple',
    'bitcoin-cash',
    'eos',
    'stellar',
    'litecoin',
    'cardano',
    'tether',
    'iota'
  ];
  const pricesWs = new WebSocket(
    `wss://ws.coincap.io/prices?assets=${cryptos.toString()}`
  );
  // https://api.coinpaprika.com/v1/coins?limit=10
  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets?ids=${cryptos.toString()}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(results => results.json())
      .then(results => {
        const { data } = results;
        setCryptoAssets(data);
      });
  }, []);

  useEffect(() => {
    pricesWs.onmessage = msg => {
      SetCryptoPrices(prevState => {
        return {
          previousPrice: prevState.currentPrice,
          currentPrice: { ...prevState.currentPrice, ...JSON.parse(msg.data) },
          animate: true
        };
      });
    };

    pricesWs.onerror = err => {
      console.log(err);
    };

    return () => pricesWs.close();
  }, []);

  const TableContainerItem = ({ rows, keys, currentPrice, previousPrice }) => (
    <Container className="text-center mt-4" fluid>
      <Table hover responsive>
        <thead className="bg-dark text-white">
          <tr>
            {keys.map(key => (
              <th key={key} className="p-3">
                {key[0].toUpperCase() + key.slice(1, key.length)}
              </th>
            ))}
            <th key="price" className="p-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} style={fadeOutCss.parentTh}>
              {keys.map(key => (
                <th key={key} style={fadeOutCss.parentTh}>
                  <div> {isNaN(row[key]) ? row[key] : parseInt(row[key])}</div>
                  <div
                    className={` ${
                      previousPrice[row['id']] > currentPrice[row['id']]
                        ? 'fade-out-animation-loss'
                        : previousPrice[row['id']] == currentPrice[row['id']]
                        ? ''
                        : 'fade-out-animation-gain'
                    }`}
                  />
                </th>
              ))}
              <th style={fadeOutCss.parentTh}>
                <div>{currentPrice[row['id']]}</div>
                <div
                  className={` ${
                    previousPrice[row['id']] > currentPrice[row['id']]
                      ? 'fade-out-animation-loss'
                      : previousPrice[row['id']] == currentPrice[row['id']]
                      ? ''
                      : 'fade-out-animation-gain'
                  }`}
                />
                <div>
                  {!currentPrice[row['id']] &&
                    parseFloat(row['priceUsd']).toFixed(2)}
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );

  const TableContainer = ({ keys, values, previousPrice, animate }) => {
    return (
      <Container className="text-center mt-4" fluid>
        <Table striped bordered hover responsive>
          <thead className="bg-dark text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key, index) => (
              <tr key={index}>
                <th key={`name-${key}`}>{key}</th>
                {values && values[key] && (
                  <th style={fadeOutCss.parentTh}>
                    <div>{values[key]}</div>
                    <div
                      className={` ${
                        previousPrice[key] > values[key]
                          ? 'fade-out-animation-loss'
                          : previousPrice[key] == values[key]
                          ? ''
                          : 'fade-out-animation-gain'
                      }`}
                    />
                  </th>
                )}
                {!values[key] && <th>...</th>}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  };

  return (
    <Container className="mt-3">
      <Row>
        <Title title="Crypto Live Prices" />
      </Row>
      <Row>
        {/* {JSON.stringify(cryptoPrices, 2)} */}
        <TableContainerItem
          rows={cryptoAssests}
          currentPrice={cryptoPrices.currentPrice}
          previousPrice={cryptoPrices.previousPrice}
          keys={keys}
        />
        {/* <TableContainer
          keys={cryptos}
          values={cryptoPrices.currentPrice}
          previousPrice={cryptoPrices.previousPrice}
          animate={cryptoPrices.animate}
        /> */}
      </Row>
    </Container>
  );
}

//
