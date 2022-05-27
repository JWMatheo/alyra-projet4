export const NFTsDetails = `
_id,
sellable,
name,
NFTUrl,
"image": image.asset->url,
price,
tokeId,
listingId,
"slug": slug.current,
metadata,
description,
endOfAuction,
collection->{
  _id,
  name,
  address
},
category -> {
  categories
},
"senseiRef": creator._ref,
"otakuRef": owner._ref,
creator-> {
  address,
  username,
  _id
},
owner->{
  address,
  username,
  _id
},
`;

export const NFTsQuery = `*[ _type == "nfts"]{
   ${NFTsDetails}
}`;

export const senseiQuery = `*[ _type == "otaku"]`;

export const bestNFTsQuery = `*[ _type == "best"]{
    nfts[]->{
      ${NFTsDetails}
    }
}`;

export const featuresQuery = `*[ _type == "features"]{
  nfts[]->{
    ${NFTsDetails}
  }
}`;

export const NFTQuery = (pageSlug) => {
  return `*[_type == "nfts" && slug.current == "${pageSlug}"][0]{
    ${NFTsDetails}
  }`;
};

export const NFTCollection = (collectionId) => {
  return `*[_type == "nfts" && references("${collectionId}")]{
    ${NFTsDetails}
  }`;
};

export const recentlyCreated = `*[_type == "nfts"] | order(_createdAt desc)`;

export const oldestCreated = `*[_type == "nfts"] | order(_createdAt desc)`;

export const NFTListed = `*[_type == "nfts" &&  sellable == true]`;
