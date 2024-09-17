const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const IgnitionModules = buildModule("IgnitionModules", (m) => {
  const deployer = m.getAccount(0);

  // Deploy ERC20
  const erc20Implementation = m.contract("ERC20TokenUpgradeable", [], {
    id: "erc20Implementation",
  });
  const erc20Proxy = m.contract(
    "TransparentUpgradeableProxy",
    [erc20Implementation, deployer, "0x"],
    { id: "erc20Proxy" }
  );
  const erc20 = m.contractAt("ERC20TokenUpgradeable", erc20Proxy, {
    id: "erc20",
  });

  m.call(erc20, "initialize", [], { id: "erc20Initialize", from: deployer });

  // Deploy NFT
  const nftImplementation = m.contract("TigerNFTUpgradeable", [], {
    id: "nftImplementation",
  });
  const nftProxy = m.contract(
    "TransparentUpgradeableProxy",
    [nftImplementation, deployer, "0x"],
    { id: "nftProxy" }
  );
  const nft = m.contractAt("TigerNFTUpgradeable", nftProxy, { id: "nft" });

  m.call(nft, "initialize", [], { id: "nftInitialize", from: deployer });

  // Deploy Staking
  const stakingImplementation = m.contract("NFTStakingUpgradeable", [], {
    id: "stakingImplementation",
  });
  const stakingProxy = m.contract(
    "TransparentUpgradeableProxy",
    [stakingImplementation, deployer, "0x"],
    { id: "stakingProxy" }
  );
  const staking = m.contractAt("NFTStakingUpgradeable", stakingProxy, {
    id: "staking",
  });

  m.call(staking, "initialize", [erc20Proxy, nftProxy], {
    id: "stakingInitialize",
    from: deployer,
  });

  return {
    erc20: erc20Proxy,
    erc20Implementation,
    nft: nftProxy,
    nftImplementation,
    staking: stakingProxy,
    stakingImplementation,
  };
});

module.exports = IgnitionModules;
