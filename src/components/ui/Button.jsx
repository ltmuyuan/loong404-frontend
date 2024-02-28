import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #792E22;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  &:hover {
    background-color: #792E22;
  }
`;

const Button = ({ children, onClick, style }) => {
  return <StyledButton onClick={onClick} style={style}>{children}</StyledButton>;
};

export default Button;