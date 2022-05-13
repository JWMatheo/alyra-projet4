import React from 'react';
import styled from 'styled-components';

const Heading = ({image, title }) => {
  return (
    <Container>
      <img src={image} alt="" />
      <div>
        <h1>{title} </h1>
      </div>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 250px;
  margin-top: 4.5rem;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--dark-color);
    background: linear-gradient(-10deg, hsl(175, 98%, 40%) 0%, hsla(175, 98%, 15%, 0.8) 100%);
    padding: 0.5rem 1rem;
    backdrop-filter: blur(65px);
    border-radius: .25rem;

    h1 {
      font-size: var(--biggest-font-size);
      color: var(--body-color);
      text-transform: uppercase;
    }
  }
`;

export default Heading;
