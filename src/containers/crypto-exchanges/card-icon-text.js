import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TooltipContainer from '../../components/ToolTip.Container';

import styled from 'styled-components';

const StyledIcon = styled.div`
  svg {
    width: 35px;
    height: 35px;
  }
`;
const CardIconText = ({ icon, text, tooltip }) => {
  const Icon = icon;
  return (
    <TooltipContainer tooltip={tooltip}>
      <Row className="text-center d-flex flex-column">
        <Col>
          <StyledIcon>
            <Icon />
          </StyledIcon>
        </Col>
        <Col className="text-center mt-2">{text}</Col>
      </Row>
    </TooltipContainer>
  );
};

export default CardIconText;
