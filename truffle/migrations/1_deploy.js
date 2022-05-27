const Factory = artifacts.require('NFTFactory');
const Marketplace = artifacts.require('Marketplace');

// Deploy Factory, then deploy Marketplace, passing in A's newly deployed address
module.exports = function (deployer) {
  deployer.deploy(Factory).then(function () {
   return  deployer.deploy(Marketplace, Factory.address)
  });
};
