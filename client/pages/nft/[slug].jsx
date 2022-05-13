import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Heading } from '../../components';
import { Button, Section } from '../../components/style';
import koruko from '../../public/assets/bestOf01.jpeg';

export default function Nft({ slug,  owner }) {

  return (
    <>
      <Heading
        title="Kuroko #1"
        image="https://www.japanfm.fr/wp-content/uploads/2020/12/Kurokos-Basketball-Saison-4-Pouvons-nous-nous-attendre-a-une-suite.jpg"
      />
      <Section>
        <Container>
          <RightSide>
            <NFT>
              <TopNFT>
                <Link href={`collection/${slug}`}>
                  <i>Kuroko No Basket</i>
                </Link>
                <ContainerLike>
                  <i className="bx bx-heart" />
                  <em>14</em>

                  <em>123 👀</em>
                </ContainerLike>
              </TopNFT>
              <ContainerImage>
                <Image src={koruko} alt="" />
              </ContainerImage>
              <BottomNFT>
                <p>
                  Owned by <Link href={`sensei/${owner}`}>NFT Set </Link>
                </p>
                <p>
                  Sensei by <Link href={`/sensei/1`}>Shonen Jump </Link>{' '}
                </p>
              </BottomNFT>
            </NFT>

            <ContainerAction>
              <Price>
                <i>Current price</i>
                <div>
                  <img src="https://cdn.iconscout.com/icon/free/png-256/ethereum-16-646072.png" alt="etheruem" />
                  <p>1.5</p>
                  <span>(450 USDT)</span>
                </div>
              </Price>
              <div>
                <Button>Place a bid </Button>
                <Button outline={true}>Buy now</Button>
              </div>
            </ContainerAction>
          </RightSide>

          <div>
            <h2>Detail</h2>

            <LeftSide>
              <details>
                <summary>Description</summary>
                <br /> <hr /> <br />
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut cupiditate harum consequuntur inventore
                sint! Et alias fugit maiores est doloribus odio! Delectus iure facilis maxime tenetur. Iusto, mollitia!
                Voluptatem, officia.
              </details>

              <details>
                <summary>Propreties</summary>
                <br /> <hr /> <br />
                <ul>
                  <li>hair: blue</li>
                  <li>team: Koruko</li>
                  <li>eyes: blue</li>
                  <li>post: fantom</li>
                </ul>
              </details>

              <details>
                <summary>Item activity</summary>
                <br /> <hr /> <br />
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut cupiditate harum consequuntur inventore
                sint! Et alias fugit maiores est doloribus odio! Delectus iure facilis maxime tenetur. Iusto, mollitia!
                Voluptatem, officia.
              </details>
            </LeftSide>
          </div>
        </Container>
      </Section>
    </>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: space-between;
  gap: 2rem;
`;

const RightSide = styled.div`
  display: grid;
  gap: 1.2rem;
  @media screen and (max-width: 580px) {
    align-items: center;
    justify-content: center;
  }
`;

const NFT = styled.div`
  max-width: 400px;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--body-color);
  box-shadow: var(--shadow);
  border-radius: 0.5rem;
`;

const TopNFT = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContainerLike = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  color: var(--dark-color);
  font-size: var(--normal-font-size);
  i {
    font-size: 1.2rem;
  }
  & > em::before {
    content: '';
    height: 10px;
    width: 2px;
    background-color: black;
  }
`;

const ContainerImage = styled.div`
  position: relative;
  height: 250px;
  border-radius: 0.5rem;
  overflow-y: hidden;
  box-shadow: var(--shadow);
  &:hover {
    border: 1px solid #ffffff44;
    transform: scale(1.015);
    filter: brightness(1.02);
    transition: all 0.5s;
  }
  img {
    object-fit: cover;
  }
`;

const BottomNFT = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    color: var(--first-color);
    margin-right: 0.5rem;
  }
`;

const ContainerAction = styled.div`
  display: grid;
  gap: 2rem;
  & > div:last-child {
    display: flex;
    gap: 1.5rem;
  }

  button:last-child {
    color: var(--text-color);
  }
`;

const Price = styled.div`
  i {
    font-size: var(--smaller-font-size);
  }

  div {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;

    img {
      width: 1.2rem;
    }

    p {
      font-size: var(--biggest-font-size);
    }
    span {
      font-size: var(--small-font-size);
    }
  }
`;

const LeftSide = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.8rem;
  margin-top: 2rem;

  details {
    width: 100%;
    padding: 1rem;
    box-shadow: var(--shadow);
    border-radius: 0.5rem;
    color: var(--dark-color);
    font-size: var(--normal-font-size);
  }
`;
