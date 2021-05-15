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

import { FaFacebookSquare } from 'react-icons/fa';
import {
  AiFillYoutube,
  AiFillRedditCircle,
  AiFillGithub
} from 'react-icons/ai';

export default function(props) {
  const [cryptodetails, setcryptodetails] = useState({
    id: 'btc-bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    rank: 1,
    is_new: false,
    is_active: true,
    type: 'coin',
    tags: [
      {
        id: 'segwit',
        name: 'Segwit',
        coin_counter: 11,
        ico_counter: 0
      },
      {
        id: 'cryptocurrency',
        name: 'Cryptocurrency',
        coin_counter: 862,
        ico_counter: 39
      },
      {
        id: 'proof-of-work',
        name: 'Proof Of Work',
        coin_counter: 461,
        ico_counter: 15
      },
      {
        id: 'payments',
        name: 'Payments',
        coin_counter: 224,
        ico_counter: 39
      },
      {
        id: 'sha256',
        name: 'Sha256',
        coin_counter: 56,
        ico_counter: 1
      },
      {
        id: 'mining',
        name: 'Mining',
        coin_counter: 344,
        ico_counter: 18
      },
      {
        id: 'lightning-network',
        name: 'Lightning Network',
        coin_counter: 7,
        ico_counter: 0
      }
    ],
    team: [
      {
        id: 'satoshi-nakamoto',
        name: 'Satoshi Nakamoto',
        position: 'Founder'
      },
      {
        id: 'wladimir-j-van-der-laan',
        name: 'Wladimir J. van der Laan',
        position: 'Blockchain Developer'
      },
      {
        id: 'jonas-schnelli',
        name: 'Jonas Schnelli',
        position: 'Blockchain Developer'
      },
      {
        id: 'marco-falke',
        name: 'Marco Falke',
        position: 'Blockchain Developer'
      }
    ],
    description:
      'Bitcoin is a cryptocurrency and worldwide payment system. It is the first decentralized digital currency, as the system works without a central bank or single administrator.',
    message: '',
    open_source: true,
    started_at: '2009-01-03T00:00:00Z',
    development_status: 'Working product',
    hardware_wallet: true,
    proof_type: 'Proof of Work',
    org_structure: 'Decentralized',
    hash_algorithm: 'SHA256',
    links: {
      explorer: [
        'http://blockchain.com/explorer',
        'https://blockstream.info/',
        'https://blockchair.com/bitcoin',
        'https://live.blockcypher.com/btc/',
        'https://btc.cryptoid.info/btc/'
      ],
      facebook: ['https://www.facebook.com/bitcoins/'],
      reddit: ['https://www.reddit.com/r/bitcoin'],
      source_code: ['https://github.com/bitcoin/bitcoin'],
      website: ['https://bitcoin.org/'],
      youtube: ['https://www.youtube.com/watch?v=Gc2en3nHxA4&']
    },
    links_extended: [
      {
        url: 'https://bitcoin.org/en/blog',
        type: 'blog'
      },
      {
        url: 'https://blockchair.com/bitcoin',
        type: 'explorer'
      },
      {
        url: 'http://blockchain.com/explorer',
        type: 'explorer'
      },
      {
        url: 'https://blockstream.info/',
        type: 'explorer'
      },
      {
        url: 'https://live.blockcypher.com/btc/',
        type: 'explorer'
      },
      {
        url: 'https://btc.cryptoid.info/btc/',
        type: 'explorer'
      },
      {
        url: 'https://www.facebook.com/bitcoins/',
        type: 'facebook'
      },
      {
        url: 'https://bitcointalk.org',
        type: 'message_board'
      },
      {
        url: 'https://www.reddit.com/r/bitcoin',
        type: 'reddit',
        stats: {
          subscribers: 2884323
        }
      },
      {
        url: 'https://github.com/bitcoin/bitcoin',
        type: 'source_code',
        stats: {
          contributors: 968,
          stars: 53465
        }
      },
      {
        url: 'https://twitter.com/bitcoincoreorg',
        type: 'twitter',
        stats: {
          followers: 116889
        }
      },
      {
        url: 'https://electrum.org/#download',
        type: 'wallet'
      },
      {
        url: 'https://bitcoin.org/',
        type: 'website'
      },
      {
        url: 'https://www.youtube.com/watch?v=Gc2en3nHxA4&',
        type: 'youtube'
      }
    ],
    whitepaper: {
      link: 'https://static.coinpaprika.com/storage/cdn/whitepapers/215.pdf',
      thumbnail:
        'https://static.coinpaprika.com/storage/cdn/whitepapers/217.jpg'
    },
    first_data_at: '2010-07-17T00:00:00Z',
    last_data_at: '2021-05-15T11:45:00Z'
  });
  const mappedId = mappings[props.id];
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
    <ListGroup variant="flush">
      {team.slice(0, 5).map(member => (
        <ListGroup.Item>
          {`${member.name} - ${member.position}`}{' '}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

  const WhitePaper = ({ previewImageSrc, sourceUrl }) => (
    <Container className="d-flex flex-column mt-3 align-items-center">
      <Card style={{ width: '18rem' }}>
        <Card.Img
          variant="top"
          src={previewImageSrc}
          thumbnail
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
          <Media className="d-flex align-items-start mt-3 p-2 ">
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
                  <Col lg={6} sm={12} md={7}>
                    <Tabs defaultActiveKey="whitepaper">
                      <Tab eventKey="market" title="Market">
                        <Stats />
                      </Tab>
                      <Tab eventKey="team" title="Team">
                        <Founders team={team} />
                      </Tab>
                      <Tab eventKey="whitepaper" title="White Paper">
                        <WhitePaper
                          previewImageSrc={cryptodetails.whitepaper.thumbnail}
                          sourceUrl={cryptodetails.whitepaper.link}
                        />
                      </Tab>
                    </Tabs>
                  </Col>
                  <Col lg={6} sm={12} md={5}>
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
