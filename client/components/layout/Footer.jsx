import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <p>copyright © Team NFT Set</p>
    </Container>
  );
};

const Container = styled.footer`
  margin-top: 3rem;
  padding-block: 2rem;
  background: var(--dark-color);
  color: var(--body-color);
  text-align: center;
`;

export default Footer;
