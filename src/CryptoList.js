import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import Numeral from 'numeral';

import './style';

export default withRouter(function(props) {
  const [cryptoPrices, SetCryptoPrices] = useState({
    previousPrice: {},
    currentPrice: {}
  });
  const [cryptoAssests, setCryptoAssets] = useState([]);

  const cryptos = [
    'bitcoin',
    'ethereum',
    'ripple',
    'bitcoin-cash',
    'stellar',
    'litecoin',
    'cardano',
    'eos',
    'iota',
    'dogecoin'
  ];

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

  const pricesWs = new WebSocket(
    `wss://ws.coincap.io/prices?assets=${cryptos.toString()}`
  );

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
      return () => pricesWs.close();
    };

    return () => pricesWs.close();
  }, []);

  const ListItem = ({
    name,
    supply,
    marketCapUsd,
    volumeUsd24Hr,
    priceUsd,
    livePrice,
    id
  }) => {
    const { currentPrice, lastPrice } = livePrice;
    const currentPriceInFloat = parseFloat(currentPrice);
    const lastPriceInFloat = parseFloat(lastPrice);

    return (
      <ListGroup.Item
        action
        onClick={() => props.history.push(`/crypto/${id}`)}
        className="p-0"
      >
        <Container style={{ position: 'relative' }}>
          <Row>
            <Col
              className={` ${
                currentPriceInFloat > lastPriceInFloat
                  ? 'fade-out-animation-gain'
                  : currentPriceInFloat == lastPriceInFloat
                  ? ''
                  : 'fade-out-animation-loss'
              }`}
            />
          </Row>
          <Row className="px-1 py-2">
            <Col>{name}</Col>
            <Col className="d-none d-md-block d-lg-block">
              {Numeral(supply).format('(0.00 a)')}{' '}
            </Col>
            <Col className="d-none d-md-block d-lg-block">
              {Numeral(marketCapUsd).format('($ 0.00 a)')}{' '}
            </Col>
            <Col className="d-none d-md-block d-lg-block">
              {Numeral(volumeUsd24Hr).format('(0.00 a)')}{' '}
            </Col>
            <Col>
              {!livePrice.currentPrice &&
                Numeral(priceUsd).format('($ 0.000000 a)')}
              {livePrice.currentPrice &&
                Numeral(livePrice.currentPrice).format('($ 0.000000 a)')}
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    );
  };

  return (
    <ListGroup className="text-center">
      <ListGroup.Item variant="primary">
        <Container>
          <Row>
            <Col>Name</Col>
            <Col className="d-none d-md-block d-lg-block">Supply</Col>
            <Col className="d-none d-md-block d-lg-block">Market Cap</Col>
            <Col className="d-none d-md-block d-lg-block">Volume (24 Hr)</Col>
            <Col>Price</Col>
          </Row>
        </Container>
      </ListGroup.Item>
      {cryptoAssests &&
        cryptoAssests.map((exchange, index) => (
          <>
            <ListItem
              {...exchange}
              livePrice={{
                lastPrice: cryptoPrices['previousPrice'][exchange.id],
                currentPrice: cryptoPrices['currentPrice'][exchange.id]
              }}
            />
          </>
        ))}
    </ListGroup>
  );
});
