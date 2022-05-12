import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

import { Button } from './style';

const NFTCard = ({ NFTimage, alt, NFTname, description, price, date, creator }) => {
  return (
    <Container>
      <Card>
        <ContainerImage>
          <Image src={NFTimage} alt={alt} layout="intrinsic" />
        </ContainerImage>

        <ContainerData>
          <div>
            <h2>{NFTname} </h2>
            <p>{description} </p>
          </div>
          <ContainerInfo>
            <Price>
              <img src="https://cdn.iconscout.com/icon/free/png-256/ethereum-16-646072.png" alt="etheruem" />
              <span>{price}</span>
            </Price>

            <Time>
              <i className="bx bxs-time" />
              <span>{date}</span>
            </Time>
          </ContainerInfo>

          <hr />
          <ContainerAction>
            <Link href="#">{creator}</Link>
            <Button>Place a bid</Button>
          </ContainerAction>
        </ContainerData>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  user-select: none;
  max-width: 300px;
  border: 1px solid #ffffff22;
  background-color: #282c34;
  background: linear-gradient(0deg, #282c34 0%, rgba(17, 0, 32, 0.5) 100%);
  border-radius: 0.7rem;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow: hidden;
  transition: 1s all;

  & ::before {
    content: '';
    position: fixed;
    box-shadow: 0 0 100px 40px #ffffff08;
    top: -10%;
    left: -100%;
    transform: rotate(-45deg);
    height: 60rem;
    transition: 1s all;
  }

  &:hover {
    border: 1px solid #ffffff44;
    transform: scale(1.015);
    filter: brightness(1.1);
  }

  &:hover ::before {
    filter: brightness(0.5);
    top: -100%;
    left: 200%;
  }
`;
const Card = styled.div`
  user-select: none;
  max-width: 300px;
  border: 1px solid #ffffff22;
  background-color: var(--dark-color);
  background: linear-gradient(0deg, hsl(217, 60%, 19%) 0%, hsla(217, 89%, 15%, 0.8) 100%);
  border-radius: 0.7rem;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow: hidden;
  transition: 0.5s all;
  padding: 1rem;
`;

const ContainerImage = styled.div`
  border-radius: 0.5rem;
  max-width: 100%;
  height: 250px;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const ContainerData = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  h2 {
    color: var(--body-color);
  }

  hr {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--text-color);
    margin-top: 0;
  }
`;

const ContainerInfo = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: var(--normal-font-size);
    color: var(--first-color);
  }
`;

const Price = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  img {
    width: 1.2rem;
  }

  span {
    color: var(--text-color);
    font-weight: var(--font-bold);
  }
`;

const Time = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ContainerAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default NFTCard;
