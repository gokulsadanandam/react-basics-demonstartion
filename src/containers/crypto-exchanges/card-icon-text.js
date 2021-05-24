import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TooltipContainer from '../../components/ToolTip.Container';

import styled from 'styled-components';

const CardIconText = ({ icon, text, tooltip }) => {
  const StyledIcon = styled(icon)`
    width: 35px;
    height: 35px;
  `;

  return (
    <TooltipContainer tooltip={tooltip}>
      <Row className="text-center d-flex flex-column">
        <Col>
          <StyledIcon />
        </Col>
        <Col className="text-center mt-2">{text}</Col>
      </Row>
    </TooltipContainer>
  );
};

export default CardIconText;
