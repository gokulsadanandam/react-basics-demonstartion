import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { CandleChartOptions } from './ChartOptions';

export default function(props) {
  const { crypto, interval } = props;
  const [chartdata, SetChartData] = useState([]);
  const { options } = CandleChartOptions;
  const transformData = data => [
    {
      data: data.map(item => ({
        x: new Date(item[0]),
        y: [item[1], item[2], item[3], item[4]]
      }))
    }
  ];

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${crypto}/ohlc?vs_currency=usd&days=1`
    )
      .then(response => response.json())
      .then(data => {
        SetChartData(transformData(data));
      });
  }, []);

  return (
    <Container className="mt-3">
      <ReactApexChart
        options={options}
        series={chartdata}
        type="candlestick"
        height={350}
      />
    </Container>
  );
}
