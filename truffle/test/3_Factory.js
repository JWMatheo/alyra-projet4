const Factory = artifacts.require("NFTFactory");

module.exports = function (deployer) {
  deployer.deploy(Factory);
};
