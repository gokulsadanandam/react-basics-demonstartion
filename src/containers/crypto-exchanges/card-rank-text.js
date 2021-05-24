import React from 'react';
import styled from 'styled-components';

const CustomText = styled.span`
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  color: ${props => props.text || 'black'};
  background-color: ${props => props.background || '#dbb42c'};
  &:hover {
    cursor: pointer;
    border: 2px solid;
    border-color: ${props => props.hovertext || '#dbb42c'};
    color: ${props => props.hovertext || '#dbb42c'};
    background-color: ${props => props.hoverbackground || 'white'};
  }
  float: right !important;
`;

const RankText = ({ rank }) => <CustomText>{`#${rank}`}</CustomText>;

export default RankText;
