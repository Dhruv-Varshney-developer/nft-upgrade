const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ERC20
  const ERC20 = await ethers.getContractFactory("ERC20TokenUpgradeable");
  const erc20 = await upgrades.deployProxy(ERC20, [], {
    initializer: "initialize",
  });
  await erc20.waitForDeployment();
  const erc20Address = await erc20.getAddress();
  console.log("ERC20 proxy deployed to:", erc20Address);
  
  const erc20ImplAddress = await upgrades.erc1967.getImplementationAddress(erc20Address);
  console.log("ERC20 implementation address:", erc20ImplAddress);
  
  const erc20AdminAddress = await upgrades.erc1967.getAdminAddress(erc20Address);
  console.log("ERC20 proxy admin address:", erc20AdminAddress);

  // Deploy NFT
  const TigerNFT = await ethers.getContractFactory("TigerNFTUpgradeable");
  const nft = await upgrades.deployProxy(TigerNFT, [], {
    initializer: "initialize",
  });
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log("TigerNFT proxy deployed to:", nftAddress);
  
  const nftImplAddress = await upgrades.erc1967.getImplementationAddress(nftAddress);
  console.log("TigerNFT implementation address:", nftImplAddress);
  
  const nftAdminAddress = await upgrades.erc1967.getAdminAddress(nftAddress);
  console.log("TigerNFT proxy admin address:", nftAdminAddress);

  // Deploy Staking
  const NFTStaking = await ethers.getContractFactory("NFTStakingUpgradeable");
  const staking = await upgrades.deployProxy(
    NFTStaking,
    [erc20Address, nftAddress],
    { initializer: "initialize" }
  );
  await staking.waitForDeployment();
  const stakingAddress = await staking.getAddress();
  console.log("NFTStaking proxy deployed to:", stakingAddress);
  
  const stakingImplAddress = await upgrades.erc1967.getImplementationAddress(stakingAddress);
  console.log("NFTStaking implementation address:", stakingImplAddress);
  
  const stakingAdminAddress = await upgrades.erc1967.getAdminAddress(stakingAddress);
  console.log("NFTStaking proxy admin address:", stakingAdminAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });