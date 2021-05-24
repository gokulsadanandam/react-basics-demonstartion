import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const renderTooltip = props => (
  <Tooltip id="button-tooltip" {...props}>
    {props.tooltip}
  </Tooltip>
);

const TooltipContainer = ({ children, tooltip }) => (
  <OverlayTrigger
    delay={{ show: 250, hide: 400 }}
    overlay={<Tooltip>{tooltip}</Tooltip>}
  >
    {children}
  </OverlayTrigger>
);

export default TooltipContainer;
