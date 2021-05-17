import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style';
import CryptoGraph from './Crypto-Graph';
import { withRouter } from 'react-router-dom';

export default withRouter(function(props) {
  const [cryptoPrices, SetCryptoPrices] = useState({
    previousPrice: {},
    currentPrice: {}
  });
  const [cryptoAssests, setCryptoAssets] = useState([]);
  const [selectedCrypto, setselectedCrypto] = useState(null);

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

  const crypto_ids_coinpaprika_map = {
    bitcoin: 'btc-bitcoin',
    ethereum: 'eth-ethereum',
    ripple: 'xrp-xrp',
    'bitcoin-cash': 'bch-bitcoin-cash',
    eos: 'eos-eos',
    stellar: 'xlm-stellar',
    litecoin: 'lcc-litecoin-cash',
    iota: 'miota-iota',
    tether: 'usdt-tether',
    iota: 'miota-iota'
  };

  const keys = ['name', 'supply', 'marketCapUsd', 'volumeUsd24Hr', 'vwap24Hr'];

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
      console.log(err);
    };

    return () => pricesWs.close();
  }, []);

  const priceInThousandString = number => `$ ${parseInt(number) / 1000} K`;
  const priceInMillionString = number =>
    `$ ${parseInt(number / 1000) / 1000} M`;
  const priceInBillionString = number =>
    `$ ${parseInt(number / 1000000) / 1000} B`;

  const ListItem = ({
    name,
    supply,
    marketCapUsd,
    volumeUsd24Hr,
    priceUsd,
    livePrice,
    onItemSelection,
    id,
    isSelected
  }) => {
    const onClickHandler = () => onItemSelection(name);

    return (
      <ListGroup.Item action className="p-0" onClick={onClickHandler}>
        <Container style={{ position: 'relative' }}>
          <Row>
            <Col
              className={` ${
                livePrice.currentPrice > livePrice.previousPrice + 0.1
                  ? 'fade-out-animation-loss'
                  : livePrice.currentPrice == livePrice.previousPrice
                  ? ''
                  : 'fade-out-animation-gain '
              }`}
            />
          </Row>
          <Row className="px-1 py-2">
            <Col>{name}</Col>
            <Col className="d-none d-md-block d-lg-block">
              {priceInMillionString(supply)}
            </Col>
            <Col className="d-none d-md-block d-lg-block">
              {priceInBillionString(marketCapUsd)}
            </Col>
            <Col className="d-none d-md-block d-lg-block">
              {priceInBillionString(volumeUsd24Hr)}{' '}
            </Col>
            <Col>
              {!livePrice.currentPrice &&
                (priceUsd > 1000
                  ? priceInThousandString(priceUsd)
                  : `$ ${parseFloat(priceUsd).toFixed(2)} `)}
              {livePrice.currentPrice && `$ ${livePrice.currentPrice}`}
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    );
  };

  return (
    <Container className="mt-4 text-center">
      <Row>
        <ListGroup>
          <ListGroup.Item variant="primary">
            <Container>
              <Row>
                <Col>Name</Col>
                <Col className="d-none d-md-block d-lg-block">Supply</Col>
                <Col className="d-none d-md-block d-lg-block">Market Cap</Col>
                <Col className="d-none d-md-block d-lg-block">
                  Volume (24 Hr)
                </Col>
                <Col>Price</Col>
              </Row>
            </Container>
          </ListGroup.Item>
          {cryptoAssests &&
            cryptoAssests.map((exchange, index) => (
              <Accordion>
                <Accordion.Toggle as="div" eventKey={`crypto-list-${index}`}>
                  <ListItem
                    name={exchange.name}
                    priceUsd={exchange.priceUsd}
                    livePrice={{
                      lastPrice: cryptoPrices['previousPrice'][exchange.id],
                      currentPrice: cryptoPrices['currentPrice'][exchange.id]
                    }}
                    currentPrice={cryptoPrices['currentPrice'][exchange.id]}
                    supply={exchange.supply}
                    volumeUsd24Hr={exchange.volumeUsd24Hr}
                    marketCapUsd={exchange.marketCapUsd}
                    onItemSelection={setselectedCrypto}
                    id={exchange.id}
                    isSelected={
                      selectedCrypto && selectedCrypto == exchange.name
                        ? true
                        : false
                    }
                  />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={`crypto-list-${index}`}>
                  <Container className="mb-2">
                    <CryptoGraph interval={'m15'} crypto={exchange.id} />
                    <Button
                      variant="success"
                      className="mb-4 rounded"
                      onClick={() =>
                        props.history.push(`/crypto/${exchange.id}`)
                      }
                    >
                      View More Details
                    </Button>
                  </Container>
                </Accordion.Collapse>
              </Accordion>
            ))}
        </ListGroup>
      </Row>
    </Container>
  );
});
