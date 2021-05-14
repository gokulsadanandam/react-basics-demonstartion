import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Title from './Title';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns';

import styled from 'styled-components';
import { PieChart, Pie, Label, ResponsiveContainer } from 'recharts';
import { BsBarChartFill } from 'react-icons/bs';
import { RiDonutChartFill } from 'react-icons/ri';
import { AiOutlineAreaChart } from 'react-icons/ai';

export default function CryptoExchanges() {
  const [exchanges, setExchanges] = useState([]);
  const cryptosymbols = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png',
    'https://st4.depositphotos.com/1092019/23275/v/1600/depositphotos_232751738-stock-illustration-huobi-the-crypto-coins-or.jpg',
    'https://image.shutterstock.com/z/stock-vector-bit-z-coin-vector-logo-1349992586.jpg',
    'https://www.coinbase.com/assets/mobile/store_listing_icon-ffbf3ec7c91090dd1f403464fad41560dac96ce04b7d86e7a459ea09c6522c18.png'
  ];

  useEffect(() => {
    fetch('https://api.coincap.io/v2/exchanges', {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(({ data }) => setExchanges(data))
      .catch(error => console.log('error', error));
  }, []);

  const TextAvatar = styled.span`
    min-width: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    color: ${props => props.text || 'black'};
    background-color: ${props => props.background || '#dbb42c'};
    &:hover {
      cursor: pointer;
      border: 2px solid;
      border-color: ${props => props.hovertext || '#dbb42c'};
      color: ${props => props.hovertext || '#dbb42c'};
      background-color: ${props => props.hoverbackground || 'white'};
    }
  `;

  const ExchangeName = styled.div`
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: auto;
    &:hover {
      cursor: pointer;
      color: #dbb42c;
    }
  `;

  const StyledDonutIcon = styled(RiDonutChartFill)`
    width: 35px;
    height: 35px;
  `;

  const StyledBarIcon = styled(BsBarChartFill)`
    width: 35px;
    height: 35px;
  `;

  const StyledAiOutlineAreaChart = styled(AiOutlineAreaChart)`
    width: 35px;
    height: 35px;
  `;

  const TimeDifferenceCalculator = time =>
    parseInt((new Date().getTime() - time) / (1000 * 60)) + 1;

  return (
    <Container className="mt-3" fluid>
      <Row className="card-example d-flex flex-row align-items-center justify-content-evenly flex-wrap overflow-auto">
        {exchanges &&
          exchanges.map((exchange, index) => {
            return (
              <Card
                style={{
                  maxWidth: '270px',
                  marginBottom: 12,
                  padding: 0
                }}
                bg="dark"
                text="light"
                key={index}
              >
                <Card.Img
                  variant="top"
                  className="mt-1 pt-3 pb-1 px-3"
                  src={cryptosymbols[index % 4]}
                  as="img"
                  style={{
                    width: '150px',
                    height: '140px',
                    borderRadius: 700,
                    margin: 'auto'
                  }}
                />
                <Card.Body>
                  <Card.Title>
                    <ExchangeName
                      onClick={() =>
                        window.open(exchange.exchangeUrl, '_blank')
                      }
                    >
                      {exchange.name}
                    </ExchangeName>
                    <TextAvatar className="float-end">{`#${
                      exchange.rank
                    }`}</TextAvatar>
                  </Card.Title>
                  <Card.Text>
                    <Container className="d-flex align-items-center justify-content-between mt-4">
                      <Row className="text-center d-flex flex-column">
                        <Col>
                          <StyledDonutIcon />
                        </Col>
                        <Col className=" text-center mt-2">
                          {exchange.percentTotalVolume &&
                            parseInt(exchange.percentTotalVolume)}
                          {!exchange.percentTotalVolume && '-'}
                        </Col>
                      </Row>
                      <Row className="text-center d-flex flex-column">
                        <Col>
                          <StyledBarIcon />
                        </Col>
                        <Col className="text-center mt-2">
                          {exchange.percentTotalVolume &&
                            parseFloat(exchange.percentTotalVolume).toFixed(2)}
                          {!exchange.percentTotalVolume && '-'}
                        </Col>
                      </Row>
                      <Row className="text-center d-flex flex-column">
                        <Col>
                          <StyledAiOutlineAreaChart />
                        </Col>
                        <Col className="text-center mt-2">
                          {exchange.volumeUsd &&
                            `${parseFloat(
                              exchange.volumeUsd / 1000000000
                            ).toFixed(2)}`}
                          {!exchange.volumeUsd && '-'}
                        </Col>
                      </Row>
                    </Container>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small className="text-muted">{`Last Updated - ${TimeDifferenceCalculator(
                    exchange.updated
                  )} mins ago `}</small>
                </Card.Footer>
              </Card>
            );
          })}
      </Row>
    </Container>
  );
}
