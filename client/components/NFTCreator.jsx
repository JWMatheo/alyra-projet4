import React from 'react';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import Slider from './Slider';
import { Button, Section } from './style';

const NFTCreator = () => {
  const settings = {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };

  return (
    <Container>
      <Section background={true}>
        <h2 className="title">Weekly popular Sensei </h2>

        <Slider settings={settings}>
          <SwiperSlide>
            <Card>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                />
                <span id="name">Name</span>
              </div>
              <ul>
                <li>Collection: 5</li>
                <li>NFT: 40</li>
                <li>Sold: 4</li>
              </ul>
              <Button>👀</Button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                />
                <span id="name">Name</span>
              </div>
              <ul>
                <li>Collection: 5</li>
                <li>NFT: 40</li>
                <li>Sold: 4</li>
              </ul>
              <Button>👀</Button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                />
                <span id="name">Name</span>
              </div>
              <ul>
                <li>Collection: 5</li>
                <li>NFT: 40</li>
                <li>Sold: 4</li>
              </ul>
              <Button>👀</Button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                />
                <span id="name">Name</span>
              </div>
              <ul>
                <li>Collection: 5</li>
                <li>NFT: 40</li>
                <li>Sold: 4</li>
              </ul>
              <Button>👀</Button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                />
                <span id="name">Name</span>
              </div>
              <ul>
                <li>Collection: 5</li>
                <li>NFT: 40</li>
                <li>Sold: 4</li>
              </ul>
              <Button>👀</Button>
            </Card>
          </SwiperSlide>
        </Slider>
      </Section>
    </Container>
  );
};

const Container = styled.section`
  background: linear-gradient(160deg, var(--dark-color) -4%, var(--dark-color-alt) 46%);

  h2 {
    color: var(--body-color);
  }

  .swiper {
    padding-bottom: 3rem;
  }

  .swiper-pagination-bullet {
    width: 1rem !important;
    height: 3px !important;
    border-radius: 0.5rem !important;
    background: var(--first-color-alt) !important;
    /*background-color: var(--purple)!important;*/
  }

  .swiper-pagination-bullet-active {
    width: 1.5rem !important;
    background: var(--first-color) !important;
  }
`;

const Card = styled.div`
  width: 100%;
  background-color: var(--body-color);
  padding: 1rem;
  border-radius: 0.25rem;
  border-top: 3px solid var(--first-color);
  cursor: pointer;
  font-size: var(--normal-font-size);

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  img {
    width: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 0.8rem;
  }
`;

export default NFTCreator;
