import React, { useState } from 'react';
import styled from 'styled-components';
import HyperModal from 'react-hyper-modal';
import { Button, input } from './style';

const ListingModal = ({isModalOpen, handleModal, priceListing, setPriceListing, listingMyNFT, date, listingNFTHandler}) => {


    
  return (
    <HyperModal isOpen={isModalOpen} requestClose={handleModal}>
    <ContainerModal>
      <p>Entre a price and date end of auction</p>

      <ContainerInput>
        <div>
          <h3>
            price <span>*</span> <small>ETHER</small>
          </h3>
          <input value={priceListing} required type="text" onChange={(e) => setPriceListing(e.target.value)} />
        </div>
        <div>
          <h3>
            Listing ID <span>*</span>
          </h3>
          <input style={{ color: 'black' }} required value={listingMyNFT} type="text" disabled="disabled" />
        </div>
      </ContainerInput>
{/*       <ContainerDate>
        <h3>
          date end of auction <small>optional</small>
        </h3>
        <input
          min={new Date().toISOString().split('T')[0]}
          format="yyyy-mm-dd"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          type="date"
        />
      </ContainerDate> */}
      <Button className="save-profil" onClick={(e) => listingNFTHandler(e)}>
        Listing my NFT
      </Button>
    </ContainerModal>
  </HyperModal>
  )
}




const ContainerModal = styled.section`
  padding: 2rem;
`;

const ContainerInput = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  ${input}
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  & > div {
    align-self: end;
  }

  small {
    font-size: var(--smaller-font-size);
    color: crimson;
  }

  i {
    font-size: var(--smaller-font-size);
    color: crimson;
  }
`;

const ContainerDate = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  ${input}

  i {
    font-size: var(--smaller-font-size);
    color: crimson;
  }

  textarea {
    height: 8rem;
    resize: vertical;
  }

  small {
    font-size: var(--smaller-font-size);
    color: var(--first-color);
  }
`;


export default ListingModal