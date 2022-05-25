import { useState } from 'react';
import styled from 'styled-components';
import { handlerClickOutSide, openHandler } from '../../utils/handlerFactory';
import { mintDefaultCollection } from '../../utils/web3/mintHandler';
import { Button, input, SelectForm } from '../style';

const SelectInput = ({ setSelected, userCollections, selected }) => {
  const [open, setOpen] = useState(false);

  const ListItem = ({ value, collectionAddress }) => (
    <li
      data-collection={collectionAddress}
      onClick={(e) => setSelected({ collection: e.target.dataset.collection, value: e.target.innerHTML })}>
      {value}
    </li>
  );

  if (open) {
    handlerClickOutSide(open, setOpen, '#collection');
  }

  let addDefaultCollection = true;

  return (
    <Container>
      <h3>
        Collection <span>*</span>
      </h3>
      <SelectForm style={{ marginTop: '0.5rem' }} open={open}>
        <button id="collection" onClick={(e) => openHandler(e, setOpen, open)}>
          <a>{selected ? selected.value : 'Choice a collection'} </a>
          <i className={`bx bx-chevron-${open ? 'up' : 'down'}`} />
        </button>

        {open && (
          <ListOptions className="Choice a collection">
            {userCollections.map((collection, index) => {
              if (collection.name === 'Default') addDefaultCollection = false;
              return <ListItem collectionAddress={JSON.stringify(collection)} key={index} value={collection.name} />;
            })}
            {addDefaultCollection && <li onClick={mintDefaultCollection} id="create-default">Create a default collection</li>}
          </ListOptions>
        )}
      </SelectForm>
    </Container>
  );
};

const Container = styled.div`
  ${input}
  display: grid;
  justify-content: end;

  textarea {
    height: 8rem;
    resize: vertical;
  }

  button {
    padding: 20px 30px;

    i {
      color: var(--dark-color);
    }
  }
`;

const ListOptions = styled.ul`
  width: 14rem;
  position: absolute;
  top: 4.8rem;
  height: max-content;
  bottom: -30.5rem;
  //width: 100%;
  background: white;
  border-radius: 0.5rem;
  z-index: var(--z-fixed);

  li {
    width: 100%;
    position: relative;
    padding: 1.3rem 1rem 1.8rem 0.5rem;
    font-weight: var(--font-bold);
    text-align: center;
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

  #create-default {
    background-color: var(--first-color);
    color: var(--body-color);

    &:hover {
      background-color: var(--first-color-alt);
    }
  }
`;

export default SelectInput;
