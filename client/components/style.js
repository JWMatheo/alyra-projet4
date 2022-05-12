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
