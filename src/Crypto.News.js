import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Media, Image } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

export default function() {
  const [news, setnews] = useState([]);
  const classes = ['primary', 'secondary', 'success', 'danger', 'info'];
  useEffect(() => {
    fetch('https://api.coinstats.app/public/v1/news?skip=0&limit=10')
      .then(response => response.json())
      .then(({ news }) => setnews(news));
  }, []);

  const truncateText = (text, size) => text.slice(0, size);

  const Loader = () => (
    <Media className="d-flex border mt-2 p-2 ">
      <Skeleton width={100} height={100} />
      <Media.Body className="w-100 mx-4">
        <Container
          as="div"
          className="my-2 mx-0 p-0 d-flex align-items-start justify-content-between"
        >
          <h5 className="w-100 ">
            <Skeleton />
          </h5>
        </Container>

        <p>
          <Skeleton width={'90%'} />
          <Skeleton width={'75%'} />
          <Skeleton width={'50%'} />
        </p>
      </Media.Body>
    </Media>
  );

  return (
    <ul className="p-2 mx-2">
      {(news.length &&
        news.map(i => (
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
        ))) ||
        new Array(5).fill(0).map(() => <Loader />)}
    </ul>
  );
}
