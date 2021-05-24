import React from 'react';
import { Card } from 'react-bootstrap';

const cryptosymbols = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png',
  'https://st4.depositphotos.com/1092019/23275/v/1600/depositphotos_232751738-stock-illustration-huobi-the-crypto-coins-or.jpg',
  'https://image.shutterstock.com/z/stock-vector-bit-z-coin-vector-logo-1349992586.jpg',
  'https://www.coinbase.com/assets/mobile/store_listing_icon-ffbf3ec7c91090dd1f403464fad41560dac96ce04b7d86e7a459ea09c6522c18.png'
];

const CustomCardImage = ({ index }) => (
  <Card.Img
    variant="top"
    className="mt-1 pt-3 pb-1 px-3"
    src={cryptosymbols[index % 4]}
    as="img"
    style={{
      width: '150px',
      height: '140px',
      borderRadius: 700,
      margin: 'auto'
    }}
  />
);

export default CustomCardImage;
