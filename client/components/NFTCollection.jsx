/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { containerCard } from './style';

const NFTCollection = ({ image, link }) => {
  return (
    <Link href={`/collection/${link}`} passHref>
      <Container >
        <div>
          <img style={{ borderRadius: '0.5rem 0.5rem 0 0' }}  src={image} alt="" />
        </div>

        <ContainerInfo>
          <li>Items: 59</li>
          <li>Owner: 5</li>
          <li>Create at : 2nd Fevebary 2019</li>
          <li>View</li>
        </ContainerInfo>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  ${containerCard}
`;

const ContainerInfo = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, auto);
  row-gap: 0.5rem;
  padding: 1rem;
  margin-top: -0.2rem;
  background-color: var(--dark-color);
  background: linear-gradient(0deg, hsl(217, 60%, 19%) 0%, hsla(217, 89%, 15%, 0.8) 100%);
  border-top: 1px solid var(--body-color);
  border-radius: 0 0 0.5rem 0.5rem;
  color: var(--body-color);
`;

export default NFTCollection;
