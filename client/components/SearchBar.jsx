import { useState } from 'react';
import styled from 'styled-components';
import { input } from './style';

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

  ${input}
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
