var Deez = artifacts.require("Deez");
var DeezExchanger = artifacts.require("DeezExchanger")

module.exports = async function(deployer) {
  await deployer.deploy(Deez);
  const deez = await Deez.deployed()
  
  await deployer.deploy(DeezExchanger, deez.address)
  const exchanger = await DeezExchanger.deployed()

  await deez.transfer(exchanger.address, 1000000)
};
