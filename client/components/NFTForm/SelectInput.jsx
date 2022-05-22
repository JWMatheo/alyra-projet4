import { useState } from 'react';
import styled from 'styled-components';
import { handlerClickOutSide, openHandler } from '../../utils/handlerFactory';
import { input, SelectForm } from '../style';

const SelectInput = ({ setSelected, userCollections, selected }) => {
  const [open, setOpen] = useState(false);

  const ListItem = ({ value }) => <li onClick={(e) => setSelected(e.target.innerText)}>{value}</li>;

  if (open) {
    handlerClickOutSide(open, setOpen, '#collection');
  }


  return (
    <Container>
      <h3>Collection</h3>
      <SelectForm style={{ marginTop: '0.5rem' }} open={open}>
        <button id="collection" onClick={(e) => openHandler(e, setOpen, open)}>
          <a>{selected ? selected : 'Choice a collection'} </a>
          <i className={`bx bx-chevron-${open ? 'up' : 'down'}`} />
        </button>
        {open && (
          <ListOptions className="Choice a collection">
            {userCollections.map((collection, index) => (
              <ListItem key={index} value={collection.name} />
            ))}
          </ListOptions>
        )}
      </SelectForm>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  ${input}

  textarea {
    height: 8rem;
    resize: vertical;
  }
`;

const ListOptions = styled.ul`
  width: 11rem;
  position: absolute;
  top: 3rem;
  height: max-content;
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



export default SelectInput;
