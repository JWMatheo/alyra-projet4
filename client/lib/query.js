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

export const NFTsQuery = `*[ _type == "nft"]{
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
  return `*[_type == "nft" && slug.current == "${pageSlug}"][0]{
    ${NFTsDetails}
  }`;
};

export const recentlyCreated = `*[_type == "nft"] | order(_createdAt desc)`

export const oldestCreated = `*[_type == "nft"] | order(_createdAt desc)`

export const NFTListed = `*[_type == "nft"] &&  sellable == true`