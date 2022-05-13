import { useState } from 'react';
import styled from 'styled-components';

const SearchBar = () => {
  const [addressEntered, setaddressEntered] = useState('');

  // On change address input
  const onChangeHandler = (e) => setaddressEntered(e.target.value);
  const resetInput = () => setaddressEntered('');

  return (
    <Form>
      <input
        id="text"
        onChange={onChangeHandler}
        type="text"
        placeholder="Search items, collections and accounts"
        value={addressEntered}
      />
      <BoxIcons>
        <i onClick={resetInput} className="bx bx-reset" />
        <i className="bx bx-search-alt" />
      </BoxIcons>
    </Form>
  );
};

const Form = styled.form`
  position: relative;
  max-width: 750px;
  width: 100%;
  margin: auto;
  height: max-content;

  input {
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
`;

const BoxIcons = styled.div`
  position: absolute;
  height: 100%;
  top: 50%;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transform: translateY(-50%);
  background-color: var(--first-color);
  border-radius: 0 0.5rem 0.5rem 0;
  padding-inline: 0.5rem;
  z-index: 100;

  i {
    font-size: 1.5rem;
    color: var(--body-color);
    cursor: pointer;
    padding-inline: 0.5rem;

    &:hover {
      color: whitesmoke;
      transform: scale(0.9);
      transition: 0.3s;
    }
  }
`;

export default SearchBar;
