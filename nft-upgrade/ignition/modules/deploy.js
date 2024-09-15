const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ERC20
  const ERC20 = await ethers.getContractFactory("ERC20TokenUpgradeable");
  const erc20 = await upgrades.deployProxy(ERC20, [], { initializer: 'initialize' });
  await erc20.waitForDeployment();
  console.log("ERC20 deployed to:", await erc20.getAddress());

  // Deploy NFT
  const TigerNFT = await ethers.getContractFactory("TigerNFTUpgradeable");
  const nft = await upgrades.deployProxy(TigerNFT, [], { initializer: 'initialize' });
  await nft.waitForDeployment();
  console.log("TigerNFT deployed to:", await nft.getAddress());

  // Deploy Staking
  const NFTStaking = await ethers.getContractFactory("NFTStakingUpgradeable");
  const staking = await upgrades.deployProxy(NFTStaking, [await erc20.getAddress(), await nft.getAddress()], { initializer: 'initialize' });
  await staking.waitForDeployment();
  console.log("NFTStaking deployed to:", await staking.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });