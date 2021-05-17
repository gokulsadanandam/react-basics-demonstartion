import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Skeleton from 'react-loading-skeleton';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const Loader = () => (
  <Container>
    <Row>
      <Col>
        <Skeleton width={350} />
      </Col>
      <Col className="text-end">
        <Skeleton width={200} />
      </Col>
    </Row>
    <Row>
      <Col>
        <Skeleton width={200} />
      </Col>
      <Col className="text-end">
        <Skeleton width={150} />
      </Col>
    </Row>
    <Row>
      <Col>
        <Skeleton width={150} />
      </Col>
    </Row>
  </Container>
);

const CryptoDetailedHeaderTray = ({
  symbol,
  name,
  rank,
  org_structure,
  open_source,
  type,
  websitelink
}) => {
  return (
    (symbol && rank && org_structure && type && websitelink && (
      <>
        <Col
          sm={12}
          lg={8}
          md={9}
          className="d-flex flex-wrap my-4 p-0 align-items-baseline"
        >
          <h5 className="fw-bold text-muted me-2">
            {`#${rank} ${name} (${symbol}) `}
          </h5>
          <span className={`badge mx-1 bg-primary`}>{org_structure}</span>
          <span className={`badge mx-1 bg-success`}>
            {open_source ? 'Open Sourced' : 'Close Sourced'}
          </span>
          <span className={`badge mx-1 bg-danger`}>{type} </span>
        </Col>
        <Col sm={12} lg={2} md={3} className="ms-auto">
          <Button
            variant="outline-primary"
            className="ml-auto w-100"
            size="sm"
            target="_blank"
            href={websitelink}
          >
            Open Website
          </Button>
        </Col>
      </>
    )) || <Loader />
  );
};

export default CryptoDetailedHeaderTray;
