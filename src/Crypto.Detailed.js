import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Media, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { mappings } from './crypto_mappings';

import ImageWithLoader from './components/Image.With.Loader';
import CryptoDetailedHeaderTray from './containers/crypto-detailed/crypto-detail-header';
import SocialLinksTray from './containers/crypto-detailed/sociallinkstray';
import CryptoDetailedTabs from './containers/crypto-detailed/crypto-detail-tabs';
import CryptoPriceAreaChart from './Crypto-Price.Area.Chart';

export default function(props) {
  const [cryptodetails, setcryptodetails] = useState({
    links: [],
    team: [],
    symbol: '',
    whitepaper: []
  });
  const { id } = useParams();
  const mappedId = mappings[id];
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

  useEffect(() => {
    fetch(`https://api.coinpaprika.com/v1/coins/${mappedId}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(results => results.json())
      .then(results => {
        setcryptodetails(results);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Media className="d-flex align-items-start mt-3 p-2">
            <Row className="d-inline d-none d-md-block d-lg-block">
              <Col>
                <ImageWithLoader
                  imageSrc={cryptodetails.symbol.toLowerCase()}
                />
                {/* <Image
                  rounded
                  src={`./node_modules/cryptocurrency-icons/svg/color/${cryptodetails.symbol.toLowerCase()}.svg`}
                  width={90}
                  style={{ height: '100%' }}
                  className="mx-3 my-2"
                  alt="Alt Coin"
                /> */}
              </Col>
              <Col className="d-flex flex-column mt-4 align-items-center justify-items-evenly">
                <SocialLinksTray
                  youtubelink={youtubelink}
                  githublink={githublink}
                  facebooklink={facebooklink}
                  redditlink={redditlink}
                />
              </Col>
            </Row>
            <Media.Body className="w-100">
              <Container as="div" fluid className="my-2 mx-0 p-0">
                <Row className="pb-3 align-items-center border-bottom mx-3">
                  <CryptoDetailedHeaderTray
                    {...cryptodetails}
                    websitelink={websitelink}
                  />
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
                    <CryptoDetailedTabs {...cryptodetails} />
                  </Col>
                  <Col lg={6} sm={12} md={6}>
                    <CryptoPriceAreaChart crypto={id} interval={'m15'} />
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
