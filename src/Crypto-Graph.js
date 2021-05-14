import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container, Button, Row, Col, Form } from 'react-bootstrap';

import CryptoPriceAreaChart from './Crypto-Price.Area.Chart';
import CryptoPriceCandleChart from './Crypto-Price.Candle.Chart';

import { FcCandleSticks } from 'react-icons/fc';
import { FaChartArea, FaChartBar } from 'react-icons/fa';

import { withRouter } from 'react-router-dom';

const CryptoGraph = withRouter(props => {
  const { interval, crypto } = props;

  const titleWithIcon = ({ icon, title }) => (
    <>
      {icon}
      <span className="mx-2">{title}</span>
    </>
  );

  return (
    <Container className="mt-3 p-3">
      <Tabs defaultActiveKey="candle-chart" id="chart-tabs">
        <Tab
          eventKey="candle-chart"
          title={titleWithIcon({
            icon: <FaChartBar />,
            title: '24h Candle Chart'
          })}
        >
          <CryptoPriceCandleChart crypto={crypto} interval={interval} />
        </Tab>
        <Tab
          eventKey="area-chart"
          title={titleWithIcon({ title: '24h Price', icon: <FaChartArea /> })}
        >
          <CryptoPriceAreaChart crypto={crypto} interval={interval} />
        </Tab>
      </Tabs>
    </Container>
  );
});

export default CryptoGraph;
