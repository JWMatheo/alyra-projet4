import styled from 'styled-components';
import { css } from 'styled-components';

export const container = () => {
  return `
    max-width: 1024px;
    margin-left: 1.5rem;
    margin-right: 1.5rem;

    @media screen and (max-width: 320px) {
         margin-left: 1rem;
          margin-right: 1rem;
    }

    @media screen and (min-width: 1040px) {
          margin-left: auto;
          margin-right: auto;
    }
`;
};

export const Section = styled.section`
  max-width: 1024px;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  padding: 4.5rem 0 2rem;

  .title {
    position: relative;
    font-size: var(--h1-font-size);
    padding-left: 1.25rem;
    margin-bottom: 2.5rem;
    text-transform: capitalize;

    &::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 0;
      width: 3px;
      height: 28px;
      background-color: var(--first-color);
    }
  }

  @media screen and (min-width: 1040px) {

    margin-left: auto;
    margin-right: auto;
  }
  
`;


export const containerCard = () => {
  return`
  user-select: none;
  width: 100%;
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: 300px;
    `}
  border: 1px solid #ffffff22;
  border-radius: 0.5rem;
  background-color: #282c34;
  background: linear-gradient(0deg, #282c34 0%, rgba(17, 0, 32, 0.5) 100%);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow: hidden;
  transition: 1s all;

  & ::before {
    content: '';
    position: fixed;
    box-shadow: 0 0 100px 40px #ffffff08;
    top: -10%;
    left: -250%;
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
  `
}



export const Button = styled.button`
  display: inline-block;
  background-color: var(--first-color);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: var(--font-bold);
  transition: 0.4s;
  color: var(--body-color);
  text-transform: uppercase;
  transition: 0.3s;

  &:hover {
    background-color: var(--first-color-alt);
    color: #142b4f;
    transition: 0.7s;
  }

  ${({ outline }) =>
    outline &&
    css`
      background: transparent;
      border: 1px solid var(--first-color);
      transition: 0.3s;
      &:hover {
        background-color: transparent;
        border-color: var(--first-color-alt);
        color: var(--body-color);
        transition: 0.7s;
      }
    `}
`;


export const input = () => {
  return`
  input,textarea {
    width: 100%;
    height: 4rem;
    display: block;
    border: none;
    font-family: inherit;
    font-weight: 400;
    font-size: 1rem;
    padding: 0 1.5rem;
    color: var(--dark-color);
    background-color: var(--white-40);
    border-radius: 0.5rem;
    transition: border-color 0.3s ease;
    border: 1px solid transparent;
    box-shadow: var(--shadow);
    margin-top: 0.5rem;
    &::placeholder {
      font-weight: 300;
      color: var(--text-color-light);
      opacity: 0.8;
    }

    &:focus,
    &:focus-visible {
      outline: 1px solid var(--dark-color-alt);
    }
  }

  `
}

export const SelectForm = styled.div`
  position: relative;

  button {
    width: max-content;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    font-family: inherit;
    user-select: none;
    position: relative;
    line-height: 1.5;
    background-color: var(--body-color);
    border: 1px solid var(--white-40);
    font-family: inherit;
    padding: 10px 18px;
    transition: color 0.6s ease;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    cursor: pointer;

    &:hover a {
      color: var(--white);
    }

    a {
      font-size: var(--normal-font-size);
      color: var(--dark-color);
    }
    i {
      font-size: var(--h2-font-size);
    }
  }

  button {
    ${({ open }) =>
      open &&
      css`
        box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
      `};
  }
  `


export const largeLayout = css`
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export const smallLayout = css`
grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;
