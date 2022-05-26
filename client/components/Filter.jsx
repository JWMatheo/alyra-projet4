import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Button, SelectForm } from './style';
import { handlerClickOutSide, openHandler } from '../utils/handlerFactory';
import { client } from '../lib/sanity';
import { NFTListed, NFTsQuery, oldestCreated, recentlyCreated } from '../lib/query';
import { css } from 'styled-components';

const Filter = ({ setSwitchLayout, switchLayout, setAllNFTs, allNFTs }) => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handlerClickOutSide(open, setOpen, '.button-sort');
  }, [open]);

  const ListItem = ({ value, sortFunction }) => {
    return (
      <li
        onClick={(e) => {
          setSelected(e.target.innerText);
          sortFunction();
        }}>
        {value}
      </li>
    );
  };

  const sortRecentlyCreated = async () => {
    const sorting = await client.fetch(recentlyCreated);
    setAllNFTs(sorting);
  };

  const sortNFTListed = async () => {
    const sorting = await client.fetch(NFTListed);
    console.log(sorting);

    setAllNFTs(sorting);
  };

  const sortOldestCreated = async (e) => {
    e.preventDefault();
    const sorting = await client.fetch(oldestCreated);

    setAllNFTs(sorting);
  };


const reset = async() => {
  const NFTs = await client.fetch(NFTsQuery);
  setSelected()
  setAllNFTs(NFTs);
}

const sortLowToHigh = () => {
  const eitherSort = (arr = []) => {
    const sorter = (a, b) => {
       return +a.price - +b.price;
    };
    arr.sort(sorter);
 };

 eitherSort(allNFTs);
}

  return (
    <Container>
      <SelectForm open={open}>
        <button id="button-sort" onClick={(e) => openHandler(e, setOpen, open)}>
          <a>{selected ? selected : 'Sort by'} </a>
          <i className={`bx bx-chevron-${open ? 'up' : 'down'}`} />
        </button>
        {open && (
          <ListOptions selected={selected} className="sort">
            {selected && <ListItem value="Reset"sortFunction={reset} />}
            <ListItem value="NFT listed" onClick={(e) => sortNFTListed(e)} sortFunction={sortNFTListed} />
            <ListItem value="Recently created" sortFunction={sortRecentlyCreated} />
        {/*     <ListItem value="Recently sold" />
            <ListItem value="Recently received" />
            <ListItem value="Ending soon" /> */}
            <ListItem value="Price: Low to High" sortFunction={sortLowToHigh} />
            {/* <ListItem value="Highest last sale" /> */}
            <ListItem value="Oldest" sortFunction={sortOldestCreated} />
          </ListOptions>
        )}
      </SelectForm>

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

const ListOptions = styled.ul`
  width: 11rem;
  position: absolute;
  bottom: -15.8rem;
  //width: 100%;
  background: white;
  border-radius: 0.5rem;
  z-index: var(--z-fixed);
  ${({ selected }) =>
    selected &&
    css`
      bottom: -19.5rem;
    `}
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

    &:hover {
      color: var(--first-color-alt);
    }
  }
`;

export default Filter;
