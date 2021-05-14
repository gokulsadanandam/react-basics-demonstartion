import React, { useState, useEffect } from 'react';
import Title from './Title';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { InputBoxElement } from './FormsComponent';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

export default function TableComponent() {
  const [cryptoAssests, setCryptoAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [scrollLoad, setScrollLoad] = useState(false);

  const keys = ['rank', 'name', 'supply', 'priceUsd'];

  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets?limit=${40 * page}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(results => results.json())
      .then(results => {
        const { data } = results;
        setCryptoAssets(data);
        setLoading(false);
        setScrollLoad(false);
      });
  }, [page]);

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = e => {
      if (
        e.target.documentElement.getBoundingClientRect().bottom <=
        window.innerHeight + 60
      ) {
        setPage(page + 1);
        setScrollLoad(true);
      }
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  const SpinnerContainer = () => (
    <Container className="text-center justify-content-center align-items-center my-4">
      <Spinner animation="border" />
    </Container>
  );

  const [SearchBox, ClearSearch, SearchBoxComponent] = InputBoxElement({
    type: 'text',
    // label: "Search",
    placeholder: 'Search Crypto Currency By Name Here.',
    id: 'user_search_input'
  });

  const filterResults = (input, query) => {
    if (!query) return input;
    return input.filter(i =>
      i.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const StyledTable = styled(Table)`
    .table {
      border: 1px solid;
      border-radius: 4px !important;
      background-color: red !important;
    }
  `;

  const TableContainer = ({ rows, keys }) => (
    <Container className="text-center mt-4 panel panel-default" fluid>
      <StyledTable striped bordered hover responsive>
        <thead className="bg-dark text-center text-white">
          {keys.map(key => (
            <th key={key} className="p-2">
              {key[0].toUpperCase() + key.slice(1, key.length)}
            </th>
          ))}
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {keys.map(key => (
                <th key={key}>{row[key]}</th>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center">
        <Col md={6} xs={6} lg={4} sm={6}>
          <Title title="CryptoCurrency" />
        </Col>
        <Col md={6} xs={6} lg={4} sm={6}>
          {SearchBoxComponent}
        </Col>
      </Row>
      <Row>{loading && <SpinnerContainer />}</Row>
      <Row>
        {!loading && cryptoAssests && (
          <TableContainer
            rows={filterResults(cryptoAssests, SearchBox)}
            keys={keys}
          />
        )}
      </Row>
      <Row>
        {scrollLoad && (
          <Container as="div">
            <SpinnerContainer />
          </Container>
        )}
      </Row>
      <Row>
        {!loading && !filterResults(cryptoAssests, SearchBox).length && (
          <Container as="h3" className="text-center">
            No Records Found
          </Container>
        )}
      </Row>
    </Container>
  );
}
