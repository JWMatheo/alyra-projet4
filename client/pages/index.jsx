import { Banner, BestCollection, HowIsWork, NFTCreator, NFTsFavorite } from '../components';
import { bestNFTsQuery, featuresQuery, NFTsQuery, senseiQuery } from '../lib/query';
import { client } from '../lib/sanity';

export default function Home({ NFTs, allSenseis, bestNFTs, featuresNFT }) {
console.log('====================================');
console.log(bestNFTs);
console.log('====================================');
  
  return (
    <>
      <Banner />
      <BestCollection bestNFTs={bestNFTs} />
      <NFTsFavorite featuresNFT={featuresNFT} />
      <NFTCreator />
      <HowIsWork />
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const NFTs = await client.fetch(NFTsQuery);
  const allSenseis = await client.fetch(senseiQuery);
  const result = await client.fetch(bestNFTsQuery);
  const resultFeature = await client.fetch(featuresQuery);
  const bestNFTs = result[0].nfts;
 const featuresNFT = resultFeature[0].nfts

  return {
    props: {
      NFTs,
      allSenseis,
      bestNFTs,
      featuresNFT,
    },
  };
}
