const { ignition } = require("hardhat");
const IgnitionModules = require("../ignition/modules/ignition");

async function main() {
  console.log("Starting deployment...");
  const result = await ignition.deploy(IgnitionModules);
  console.log("Deployment completed. Results:");
  console.log("ERC20 proxy:", result.erc20);
  console.log("ERC20 implementation:", result.erc20Implementation);
  console.log("NFT proxy:", result.nft);
  console.log("NFT implementation:", result.nftImplementation);
  console.log("Staking proxy:", result.staking);
  console.log("Staking implementation:", result.stakingImplementation);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
