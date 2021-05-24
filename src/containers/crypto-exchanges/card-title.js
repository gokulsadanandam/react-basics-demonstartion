import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

import RankText from './card-rank-text';

const ExchangeName = styled.div`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  &:hover {
    cursor: pointer;
    color: #dbb42c;
  }
`;

const ExchangeTitle = ({ title, exchangeLink, rank }) => (
  <Card.Title>
    <ExchangeName onClick={() => window.open(exchangeLink, '_blank')}>
      {title}
    </ExchangeName>
    <RankText rank={rank} />
  </Card.Title>
);

export default ExchangeTitle;
