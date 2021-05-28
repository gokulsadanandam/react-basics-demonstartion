import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { BsBarChartFill } from 'react-icons/bs';
import { RiDonutChartFill } from 'react-icons/ri';
import { AiOutlineAreaChart } from 'react-icons/ai';

import CustomCardImage from './containers/crypto-exchanges/card-image';
import ExchangeTitle from './containers/crypto-exchanges/card-title';
import CardIconText from './containers/crypto-exchanges/card-icon-text';

import Skeleton from 'react-loading-skeleton';

export default function CryptoExchanges() {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    fetch('https://api.coincap.io/v2/exchanges', {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(({ data }) => setExchanges(data))
      .catch(error => console.log('error', error));
  }, []);

  const StyledCard = styled(Card)`
    max-width: 270px;
    margin-bottom: 16px;
    padding: 0px;
  `;

  const TimeDifferenceCalculator = time =>
    parseInt((new Date().getTime() - time) / (1000 * 60)) + 1;

  const SkeletonCards = () => (
    <StyledCard>
      <Container as="div" className="m-2 text-center">
        <Skeleton square={true} height={140} width={140} />
      </Container>
      <Card.Body>
        <Container fluid className="p-0">
          <Row>
            <Skeleton />
          </Row>
          <Row>
            <Col>
              <Skeleton width={100} />
            </Col>
            <Col>
              <Skeleton />
            </Col>
          </Row>
        </Container>
      </Card.Body>
      <Card.Footer>
        <Skeleton />
      </Card.Footer>
    </StyledCard>
  );

  return (
    <Container className="mt-3" fluid>
      <Row className="card-example d-flex flex-row align-items-center justify-content-evenly flex-wrap overflow-auto">
        {(exchanges &&
          exchanges.length &&
          exchanges.map(
            (
              {
                name,
                exchangeUrl,
                rank,
                percentTotalVolume,
                tradingPairs,
                volumeUsd,
                updated
              },
              index
            ) => {
              return (
                <StyledCard bg="dark" text="light" key={index}>
                  <CustomCardImage index={index} />
                  <Card.Body>
                    <ExchangeTitle
                      title={name}
                      exchangeLink={exchangeUrl}
                      rank={rank}
                    />
                    <Card.Text>
                      <Container className="d-flex align-items-center justify-content-between mt-4">
                        <CardIconText
                          tooltip="Trade Volume Percentage"
                          icon={RiDonutChartFill}
                          text={
                            (percentTotalVolume &&
                              `${parseFloat(percentTotalVolume).toFixed(
                                2
                              )} %`) ||
                            '-'
                          }
                        />
                        <CardIconText
                          tooltip="Total Trading Pairs"
                          icon={BsBarChartFill}
                          text={
                            (tradingPairs && `${parseInt(tradingPairs)}`) || '-'
                          }
                        />
                        <CardIconText
                          tooltip="Trading Volume in USD"
                          icon={AiOutlineAreaChart}
                          text={
                            (volumeUsd &&
                              `${parseFloat(volumeUsd / 1000000000).toFixed(
                                2
                              )} B`) ||
                            '-'
                          }
                        />
                      </Container>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <small className="text-muted">
                      {`Last Updated - ${new Date(updated).toDateString()} `}
                    </small>
                  </Card.Footer>
                </StyledCard>
              );
            }
          )) ||
          new Array(10).fill(0).map(() => <SkeletonCards />)}
      </Row>
    </Container>
  );
}
