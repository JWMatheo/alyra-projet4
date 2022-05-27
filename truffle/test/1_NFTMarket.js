const NFTMarket = artifacts.require("Marketplace");

module.exports = function (deployer) {
  deployer.deploy(NFTMarket, 0xAb471De3512A9C1715bee29B59Ba91a904B6B07A);
};
