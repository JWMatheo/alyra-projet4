import { useEffect } from 'react';
import styled from 'styled-components';
import { Filter, Heading, NFTCard, NFTsFavorite } from '../../components';
import { largeLayout, Section, smallLayout } from '../../components/style';
import { NFTCollection } from '../../lib/query';
import { client } from '../../lib/sanity';


import { viewsPage } from '../../utils/handlerFactory';

export async function getServerSideProps(pageContext) {
  const NFTCollection = await client.fetch(NFTCollection(pageContext.query.id));

  return {
    props: {
      NFTCollection,
      collectionId: pageContext.query.id
    },
  };
}

export default function Collection({ setSwitchLayout, switchLayout, NFTCollection, collectionId }) {
  useEffect(() => {
    // Add view page
    viewsPage(NFTId);
  }, []);

  return (
    <>
      <Heading
        title="Kuroko No Basket"
        image="https://www.japanfm.fr/wp-content/uploads/2020/12/Kurokos-Basketball-Saison-4-Pouvons-nous-nous-attendre-a-une-suite.jpg"
      />

      <Section>
        <h2 className="title">All items</h2>

        <Filter switchLayout={switchLayout} setSwitchLayout={setSwitchLayout} collection={true} collectionId={collectionId} />
        <NFTsFavorite featuresNFT={NFTCollection} />
      </Section>
    </>
  );
}

const Container = styled.div`
  display: grid;
  ${({ switchLayout, largeLayout, smallLayout }) => (switchLayout ? smallLayout : largeLayout)}
  gap: 1.3rem;
  margin-top: 1.5rem;
`;