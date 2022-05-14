import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { css } from 'styled-components';

const Filter = ({ setSwitchLayout, switchLayout }) => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      window.addEventListener('click', (e) => {
        if (e.target !== document.querySelector('.button-sort')) {
          setOpen(false);
        }
      });
      return () => {
        window.removeEventListener('click', setOpen(false));
      };
    }
  }, [open]);

  const openHandler = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const ListItem = ({ value }) => {
    return (
      <li
        onClick={(e) => {
          setSelected(e.target.innerText);
        }}>
        {value}
      </li>
    );
  };

  return (
    <Container>
      <SortBy open={open}>
        <button id="button-sort" onClick={openHandler}>
          <a>{selected ? selected : 'Sort by'} </a>
          <i className={`bx bx-chevron-${open ? 'up' : 'down'}`} />
        </button>
        {open && (
          <ListOptions className="sort">
            <ListItem value="Recently listed" />
            <ListItem value="Recently created" />
            <ListItem value="Recently sold" />
            <ListItem value="Recently received" />
            <ListItem value="Ending soon" />
            <ListItem value="Price: Low to High" />
            <ListItem value="Highest last sale" />
            <ListItem value="Oldest" />
          </ListOptions>
        )}
      </SortBy>

      <ContainerGrid>
        <i
          onClick={() => setSwitchLayout(false)}
          className={`bx bxs-grid-alt ${!switchLayout ? 'active' : undefined}`}
        />
        <i onClick={() => setSwitchLayout(true)} className={`bx bxs-grid ${switchLayout ? 'active' : undefined}`} />
      </ContainerGrid>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SortBy = styled.div`
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
`;

const ListOptions = styled.ul`
  width: 11rem;
  position: absolute;
  bottom: -30.5rem;
  //width: 100%;
  background: white;
  border-radius: 0.5rem;
  z-index: var(--z-fixed);

  li {
    width: 100%;
    position: relative;
    padding: 1.3rem 1rem 1.3rem 0.5rem;
    font-weight: var(--font-bold);
    overflow: hidden;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border: 1px solid #e8e9ea;
    }

    &:hover {
      background-color: #e7eff5;
    }
  }

  li:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
    &::before {
      border: none;
    }
  }

  li:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

const ContainerGrid = styled.div`
  width: max-content;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  padding: 10px 10px;
  background-color: var(--body-color);
  border-radius: 0.5rem;
  box-shadow: var(--shadow);

  i {
    font-size: 1.3rem;
    cursor: pointer;

    &:hover {
      color: var(--dark-color);
      transform: scale(0.9);
      transition: 0.3s;
    }
  }

  .active {
    color: var(--first-color);
    transition: all 0.5s;

    &:hover{
      color: var(--first-color-alt);
    }
  }
`;

export default Filter;
