import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import BitCoinIcon from 'cryptocurrency-icons/svg/color/btc.svg';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsBarChartFill } from 'react-icons/bs';

import styled from 'styled-components';

// import { BitCoinIcon as Logo } from 'cryptocurrency-icons/svg/color/btc.svg';

export default function() {
  const [stats, setstats] = useState([]);

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/global')
      .then(response => response.json())
      .then(stats => setstats(stats));
  }, []);

  const StyledAiOutlineAreaChart = styled(AiOutlineAreaChart)`
    width: 50px;
    height: 50px;
  `;

  const StyledAiFillCaretDown = styled(AiFillCaretDown)`
    width: 50px;
    height: 50px;
    color: red;
  `;

  const StyledBsBarChartFill = styled(BsBarChartFill)`
    width: 50px;
    height: 50px;
  `;

  return (
    <Container fluid>
      <Row>
        <Col lg={2} md={4}>
          <Media className="d-flex align-items-start border rounded p-2 bg-dark text-white ">
            <Image
              rounded
              src={BitCoinIcon}
              width={60}
              style={{ height: '100%' }}
              className="mx-2 d-none d-md-block d-lg-block"
              alt="Alt Coin"
            />
            {/* {BitCoinIcon} */}
            <Media.Body className="w-100 text-center">
              <h6 className="fw-lighter text-muted">Cryptos</h6>
              <div className="fw-bold" style={{ letterSpacing: 2 }}>
                {stats.cryptocurrencies_number || '...'}
              </div>
            </Media.Body>
          </Media>
        </Col>
        <Col lg={2} md={4}>
          <Media className="d-flex align-items-start border rounded p-2 bg-dark text-white ">
            <StyledAiOutlineAreaChart />
            <Media.Body className="w-100 text-center">
              <h6 className="fw-lighter text-muted">MarketCap</h6>
              <div className="fw-bold" style={{ letterSpacing: 2 }}>
                ${' '}
                {`${parseFloat(stats.market_cap_usd / 1000000000000).toFixed(
                  3
                )} T` || '...'}
              </div>
            </Media.Body>
          </Media>
        </Col>
        <Col lg={2} md={4}>
          <Media className="d-flex align-items-start border rounded p-2 bg-dark text-white ">
            <StyledBsBarChartFill />
            <Media.Body className="w-100 text-center">
              <h6 className="fw-lighter text-muted">24Hr Volume </h6>
              <div className="fw-bold" style={{ letterSpacing: 2 }}>
                ${' '}
                {`${parseFloat(stats.volume_24h_usd / 1000000000).toFixed(
                  3
                )} B` || '...'}
              </div>
            </Media.Body>
          </Media>
        </Col>
      </Row>
    </Container>
  );
}
