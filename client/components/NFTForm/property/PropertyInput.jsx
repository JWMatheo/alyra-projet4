import { useState } from 'react';
import styled from 'styled-components';
import { handleModal } from '../../../utils/handlerFactory';
import { Button } from '../../style';
import PropertyDisplay from './PropertyDisplay';
import PropertyModal from './PropertyModal';

const PropertyInput = ({ NFTImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [NFTPropertie, setNFTPropertie] = useState();
  return (
    <>
      <ContainerProperties>
        <div>
          <i className="bx bx-list-ul" />
          <div>
            <h3>Properties</h3>
            <i>Textual traits that show up as rectangles</i>
          </div>
        </div>

        <Button onClick={(e) => handleModal(e, setIsModalOpen, isModalOpen)} outline={true}>
          <i className="bx bxs-add-to-queue"></i>
        </Button>
      </ContainerProperties>
      <PropertyDisplay NFTPropertie={NFTPropertie} />
      <PropertyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        NFTPropertie={NFTPropertie}
        setNFTPropertie={setNFTPropertie}
        NFTImage={NFTImage}
      />
    </>
  );
};
const ContainerProperties = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  justify-content: space-between;

  & > div {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    i:first-child {
      font-size: 1.7rem;
    }
  }

  div i {
    font-size: var(--small-font-size);
  }

  button {
    color: var(--dark-color);
    font-size: 1.2rem;
    box-shadow: 0 4px 7px hsla(206, 4%, 4%, 0.2);

    &:hover {
      color: var(--dark-color);
    }
  }

  .hm_hyperModalWrapper .hm_hyperModalContentWrapper {
    width: 90% !important;
  }
`;
const GroupProperties = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`;
export default PropertyInput;
