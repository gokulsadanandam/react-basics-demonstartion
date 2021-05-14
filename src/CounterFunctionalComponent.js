import React, { useState } from "react";
import Title from "./Title";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function CounterFunctionalComponent() {
  const [counter, setCounter] = useState(0);
  const increment = increment => {
    setCounter(counter + increment);
  };

  const reset = () => {
    setCounter(0);
  };

  const incrementBind = inc => {
    counterValue = counterValue + inc;
  };

  return (
    <Container fluid className="m-3">
      <Row className="align-items-center">
        <Col>
          <Title title="Counter Component" />
        </Col>
      </Row>
      <Row className="mt-3 text-center">
        <Col lg={1} md={1} sm={2} xs={2}>
          <Button variant="danger" onClick={increment.bind(this, -1)}>
            -
          </Button>
        </Col>
        <Col lg={2} md={2} sm={3} xs={3} className="my-auto">
          {counter}
        </Col>
        <Col lg={1} md={1} sm={2} xs={2}>
          <Button variant="success" onClick={increment.bind(this, 1)}>
            +
          </Button>
        </Col>
        <Col lg={2} md={3} sm={4} xs={5}>
          <Button variant="dark" onClick={reset}>
            Reset Counter
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
