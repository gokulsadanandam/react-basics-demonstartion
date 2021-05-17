import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const WhitePaper = ({ previewImageSrc, sourceUrl }) => (
  <Container className="d-flex flex-column mt-3 align-items-center">
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={previewImageSrc}
        thumbnail={true}
        style={{ width: 175 }}
      />
      <Card.Footer className="p-0">
        <Button
          variant="primary"
          className="w-100 rounded-0"
          href={sourceUrl}
          target="_blank"
        >
          View Proof of Concept
        </Button>
      </Card.Footer>
    </Card>
  </Container>
);

export default WhitePaper;
