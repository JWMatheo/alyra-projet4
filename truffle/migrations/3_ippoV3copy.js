const NFTERC721 = artifacts.require("MonNft");

module.exports = function (deployer) {
  const _Collectionname = "zz";
  const _Collectionsymbol = "zz";
  const _CollectionBaseUri = "zz";
  const _marketplaceAddres = "0x8223878044514963014d2c303FE667eFF7A9684b";
  deployer.deploy(NFTERC721, _Collectionname, _Collectionsymbol, _CollectionBaseUri, _marketplaceAddres);
};
