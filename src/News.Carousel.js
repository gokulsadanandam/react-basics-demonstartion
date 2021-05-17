import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';

export default function() {
  const [news, setnews] = useState([]);
  const classes = ['primary', 'secondary', 'success', 'danger', 'info'];
  useEffect(() => {
    fetch('https://api.coinstats.app/public/v1/news?skip=0&limit=5')
      .then(response => response.json())
      .then(({ news }) => setnews(news));
  }, []);

  const settings = {
    dots: true,
    // infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 4000,
    cssEase: 'linear'
  };

  const truncateText = (text, size) => text.slice(0, size);

  return (
    <Slider {...settings}>
      {news.map(i => (
        <Media className="d-flex align-items-start border rounded p-2 ">
          <Image
            rounded
            src={i.imgURL}
            width={75}
            style={{ height: '100%' }}
            className="mx-3 my-1 d-none d-md-block d-lg-block"
            alt="Alt Coin"
          />
          <Media.Body className="w-100">
            <div className="line-clamp fs-6">
              <p>{truncateText(i.title, 100)}</p>
            </div>
            <Button
              variant="outline-primary text-center d-flex justify-content-center mx-auto"
              size="sm"
              href={i.link}
              target="_blank"
            >
              Click Here to Read More
            </Button>
          </Media.Body>
        </Media>
      ))}
    </Slider>
  );
}
