import React from 'react';
import { Image } from 'react-bootstrap';

import Col from 'react-bootstrap/Col';
import Skeleton from 'react-loading-skeleton';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const Loader = () => (
  <Container>
    <Row>
      <Col>
        <Skeleton width={100} height={100} />
      </Col>
    </Row>
  </Container>
);

const ImageWithLoader = ({ imageSrc }) => {
  console.log('imageSrc', imageSrc);
  return (
    (imageSrc && (
      <Image
        rounded
        src={`./node_modules/cryptocurrency-icons/svg/color/${imageSrc}.svg`}
        width={90}
        style={{ height: '100%' }}
        className="mx-3 my-2"
        alt="Alt Coin"
      />
    )) || <Loader />
  );
};

export default ImageWithLoader;
