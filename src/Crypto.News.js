import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

export default function() {
  const [news, setnews] = useState([]);
  const classes = ['primary', 'secondary', 'success', 'danger', 'info'];
  useEffect(() => {
    fetch('https://api.coinstats.app/public/v1/news?skip=0&limit=10')
      .then(response => response.json())
      .then(({ news }) => setnews(news));
  }, []);

  const truncateText = (text, size) => text.slice(0, size);

  return (
    <ul className="p-2 mx-2">
      {news.map(i => (
        <Media className="d-flex align-items-start border mt-3 p-2 ">
          <Image
            rounded
            src={i.imgURL}
            width={90}
            style={{ height: '100%' }}
            className="mx-3 my-2 d-none d-md-block d-lg-block"
            alt="Alt Coin"
          />
          <Media.Body className="w-100">
            <Container
              as="div"
              className="my-2 mx-0 p-0 d-flex align-items-start justify-content-between"
            >
              <h5 className="fw-bold text-muted w-75 ">{i.title}</h5>
              <Button
                variant="outline-primary"
                className="ml-auto"
                size="sm"
                target="_blank"
                href={i.link}
              >
                Read More
              </Button>
            </Container>
            <div className="mb-3">
              {i.coins.map((tags, index) => (
                <span className={`badge mx-1 bg-${classes[index % 5]}`}>
                  {tags.coinIdKeyWords}
                </span>
              ))}
            </div>
            <p className="mx-1 text-break">
              {truncateText(i.description, 500)}..
            </p>
          </Media.Body>
        </Media>
      ))}
    </ul>
  );
}
