/* eslint-disable react/no-unescaped-entities */
import HyperModal from 'react-hyper-modal';
import PropertyForm from './PropertyForm';
import { Section } from '../../style';
import { handleModal } from '../../../utils/handlerFactory';

const PropertyModal = ({ setIsModalOpen, isModalOpen, NFTPropertie, setNFTPropertie, NFTImage, index, setIndex }) => {
  return (
    <HyperModal
      isFullscreen={true}
      isOpen={isModalOpen}
      requestClose={(e) => handleModal(e, setIsModalOpen, isModalOpen)}>
      <Section style={{ padding: '1rem', paddingBottom: '2rem' }}>
        <h2 className="title">Add properties</h2>
        <p>
          Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
          {NFTPropertie}
        </p>
        <PropertyForm setIsModalOpen={setIsModalOpen} NFTPropertie={NFTPropertie} setNFTPropertie={setNFTPropertie} NFTImage={NFTImage} setIndex={setIndex} index={index} />
      </Section>
    </HyperModal>
  );
};

export default PropertyModal;
