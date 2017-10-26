var ClientList = artifacts.require("./ClientList.sol");

module.exports = function(deployer) {
  deployer.deploy(ClientList);
};
