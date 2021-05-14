import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { AreaChartOptions } from './ChartOptions';

export default function(props) {
  const { options } = AreaChartOptions;
  const { interval, crypto } = props;
  const [series, setSeries] = useState([]);
  const transformData = prices => [
    {
      data: prices.map(item => [item.time, parseFloat(item.priceUsd)])
    }
  ];

  useEffect(() => {
    fetch(
      `https://api.coincap.io/v2/assets/${crypto}/history?interval=${interval}&start=${new Date().getTime() -
        86400000}&end=${new Date().getTime()}`
    )
      .then(response => response.json())
      .then(({ data }) => transformData(data))
      .then(transformedData => {
        setSeries(transformedData);
      });
  }, []);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
}
