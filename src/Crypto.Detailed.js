import React, { useState, useEffect } from 'react';
import Title from './Title';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { mappings } from './crypto_mappings';
import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CryptoPriceAreaChart from './Crypto-Price.Area.Chart';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CryptoStats from './Crypto.Stats';

import { useParams } from 'react-router-dom';

import Slider from 'react-slick';

import { FaFacebookSquare, FaUserCircle } from 'react-icons/fa';
import {
  AiFillYoutube,
  AiFillRedditCircle,
  AiFillGithub
} from 'react-icons/ai';

export default function(props) {
  const [cryptodetails, setcryptodetails] = useState({
    links: [],
    team: [],
    symbol: '',
    whitepaper: []
  });
  const { id } = useParams();
  const mappedId = mappings[id];
  const classes = ['primary', 'secondary', 'success', 'danger', 'info'];
  const { links } = cryptodetails;
  const {
    website = [],
    reddit = [],
    facebook = [],
    youtube = [],
    source_code = []
  } = links;
  const [websitelink] = website;
  const [redditlink] = reddit;
  const [facebooklink] = facebook;
  const [youtubelink] = youtube;
  const [githublink] = source_code;
  const { team } = cryptodetails;

  useEffect(() => {
    fetch(`https://api.coinpaprika.com/v1/coins/${mappedId}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(results => results.json())
      .then(results => {
        console.log(results);
        setcryptodetails(results);
      });
  }, []);

  const Stats = () => (
    <ListGroup variant="flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
    </ListGroup>
  );

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

  return (
    <Container fluid>
      {console.log(cryptodetails)}
      <Row>
        <Col>
          <Media
            className="d-flex align-items-start mt-3 p-2"
            // style={{ width: 'calc( 100% - 146px )' }}
          >
            <Row className="d-inline  d-none d-md-block d-lg-block">
              <Col>
                <Image
                  rounded
                  src={`./node_modules/cryptocurrency-icons/svg/color/${cryptodetails.symbol.toLowerCase()}.svg`}
                  width={90}
                  style={{ height: '100%' }}
                  className="mx-3 my-2"
                  alt="Alt Coin"
                />
              </Col>
              <Col className="d-flex flex-column mt-4 align-items-center justify-items-evenly">
                <Button
                  size="lg"
                  variant="outline-primary"
                  className="rounded-circle m-2 d-flex align-items-center justify-content-center"
                  style={{ width: 50, height: 50 }}
                  href={facebooklink}
                  target="_blank"
                >
                  <FaFacebookSquare />
                </Button>
                <Button
                  size="lg"
                  variant="outline-danger"
                  className="rounded-circle m-2 d-flex align-items-center justify-content-center"
                  style={{ width: 50, height: 50 }}
                  href={youtubelink}
                  target="_blank"
                >
                  <AiFillYoutube />
                </Button>
                <Button
                  size="lg"
                  variant="outline-secondary"
                  className="rounded-circle m-2 d-flex align-items-center justify-content-center"
                  style={{ width: 50, height: 50 }}
                  href={redditlink}
                  target="_blank"
                >
                  <AiFillRedditCircle />
                </Button>
                {githublink && (
                  <Button
                    size="lg"
                    variant="outline-dark"
                    className="rounded-circle m-2 d-flex align-items-center justify-content-center"
                    style={{ width: 50, height: 50 }}
                    href={githublink}
                    target="_blank"
                  >
                    <AiFillGithub />
                  </Button>
                )}
              </Col>
            </Row>
            <Media.Body className="w-100">
              <Container as="div" fluid className="my-2 mx-0 p-0">
                <Row className="pb-3 align-items-center border-bottom mx-3">
                  <Col
                    sm={12}
                    lg={8}
                    md={9}
                    className="d-flex flex-wrap my-4 p-0 align-items-baseline"
                  >
                    <h5 className="fw-bold text-muted me-2">{`#${
                      cryptodetails.rank
                    } ${cryptodetails.name} (${cryptodetails.symbol}) `}</h5>
                    <span className={`badge mx-1 bg-primary`}>
                      {cryptodetails.org_structure}{' '}
                    </span>
                    <span className={`badge mx-1 bg-success`}>
                      {' '}
                      {cryptodetails.open_source
                        ? 'Open Sourced'
                        : 'Close Sourced'}
                    </span>
                    <span className={`badge mx-1 bg-danger`}>
                      {cryptodetails.type}{' '}
                    </span>
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
                </Row>
                <Row>
                  <Col>
                    <p className="my-3 mx-1 text-break">
                      {cryptodetails.description}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} sm={12} md={6}>
                    <Tabs defaultActiveKey="market">
                      <Tab eventKey="market" title="Market">
                        <Stats />
                      </Tab>
                      <Tab eventKey="team" title="Team">
                        <Founders style={{ maxWidth: 1050 }} team={team} />
                      </Tab>
                      <Tab eventKey="whitepaper" title="White Paper">
                        <WhitePaper
                          previewImageSrc={cryptodetails.whitepaper.thumbnail}
                          sourceUrl={cryptodetails.whitepaper.link}
                        />
                      </Tab>
                    </Tabs>
                  </Col>
                  <Col lg={6} sm={12} md={6}>
                    <CryptoPriceAreaChart crypto={props.id} interval={'m15'} />
                  </Col>
                </Row>
              </Container>
            </Media.Body>
          </Media>
        </Col>
      </Row>
    </Container>
  );
}
