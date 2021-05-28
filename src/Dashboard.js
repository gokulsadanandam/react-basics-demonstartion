import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CryptoList from './CryptoList';
import CryptoNewsCarousel from './News.Carousel';
import CryptoStats from './Crypto.Stats';
import { withRouter } from 'react-router-dom';

export default withRouter(function(props) {
  return (
    <Container fluid className="mt-3 mx-auto px-4">
      <Row>
        <Col lg={4} md={4} sm={6} xs={12}>
          <Row className="mb-2 text-muted">
            <Col>
              <Row>
                <Col>
                  <h5>Market Summary</h5>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex mt-2 flex-wrap align-items-center justify-content-evenly">
                  <CryptoStats />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className="mb-2 text-muted d-flex align-items-center">
                <Col>
                  <h5>Top Market News</h5>
                </Col>
                <Col>
                  <div
                    className="text-primary text-end pe-2"
                    onClick={() => props.history.push('/news')}
                  >
                    View All
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CryptoNewsCarousel />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={8} md={8} sm={6} xs={12}>
          <Row>
            <Col>
              <Row className="mb-2 text-muted">
                <Col>
                  <h5>Top Crypto Currencies</h5>
                </Col>
                <Col>
                  <div className="text-primary text-end pe-2">View All</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CryptoList />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
});
