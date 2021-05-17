import Slider from 'react-slick';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const Founders = ({ team }) => (
  <Slider
    slidesToShow={2}
    dots={true}
    autoplay={false}
    adaptiveHeight={true}
    className="mt-3"
  >
    {team.slice(0, 5).map(member => (
      <Card className="p-2 h-100 d-flex align-items-center">
        <Card.Img
          variant="top"
          src="https://www.w3schools.com/howto/img_avatar.png"
          thumbnail={true}
          style={{ width: 75 }}
          className="mb-2 rounded-circle"
        />
        <Card.Body className="p-0 d-flex align-items-center justify-content-center">
          <Card.Text className="text-center">
            <h5 className="fw-bold"> {member.name} </h5>
            <p className="text-muted"> {member.position} </p>
          </Card.Text>
        </Card.Body>
      </Card>
    ))}
  </Slider>
);

export default Founders;
