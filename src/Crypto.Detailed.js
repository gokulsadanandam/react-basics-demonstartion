import React, { useState, useEffect } from 'react';
import Title from './Title';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { mappings } from './crypto_mappings';
import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

import CryptoPriceAreaChart from './Crypto-Price.Area.Chart';

import CryptoStats from './Crypto.Stats';

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
  const { website } = links;
  const [websitelink] = website;
  // const {  }

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

  return (
    <Container fluid>
      {console.log(cryptodetails)}
      <Row>
        <Col>
          <Media className="d-flex align-items-start mt-3 p-2 ">
            <Image
              rounded
              src={`./node_modules/cryptocurrency-icons/svg/color/${cryptodetails.symbol.toLowerCase()}.svg`}
              width={90}
              style={{ height: '100%' }}
              className="mx-3 my-2 d-none d-md-block d-lg-block"
              alt="Alt Coin"
            />
            <Media.Body className="w-100">
              <Container as="div" fluid className="my-2 mx-0 p-0">
                <Row className="pb-3 border-bottom mx-3">
                  <Col className="d-flex p-0 align-items-baseline">
                    <h5 className="fw-bold text-muted w-75 ">{`#${
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
                  <Col className="text-end mx-2">
                    <Button
                      variant="outline-primary"
                      className="ml-auto"
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
                  <Col>Other Info Goes Here</Col>
                  <Col>
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
