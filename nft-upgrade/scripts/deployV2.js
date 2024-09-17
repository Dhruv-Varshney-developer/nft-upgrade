const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Upgrading contracts with the account:", deployer.address);

  // Get the address of the existing proxy
  const proxyAddress = "0x5bff7153224897319F1E83D80aEC8BafD27C0BD8";

  // Upgrade the NFT contract
  const TigerNFTUpgradeableV2 = await ethers.getContractFactory(
    "TigerNFTUpgradeableV2"
  );
  console.log("Upgrading TigerNFT...");

  const upgradedNFT = await upgrades.upgradeProxy(
    proxyAddress,
    TigerNFTUpgradeableV2
  );
  await upgradedNFT.waitForDeployment();

  console.log("TigerNFT upgraded");
  console.log("Proxy address:", proxyAddress);

  const newImplementationAddress =
    await upgrades.erc1967.getImplementationAddress(proxyAddress);
  console.log("New implementation address:", newImplementationAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
