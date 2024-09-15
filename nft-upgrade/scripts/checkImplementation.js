const { ethers, upgrades } = require("hardhat");

async function main() {
  // NFT Proxy address
  const proxyAddress = "0x5bff7153224897319F1E83D80aEC8BafD27C0BD8";

  console.log(
    "Checking implementation address for NFT proxy at:",
    proxyAddress
  );

  // Get the implementation address using OpenZeppelin's upgrades plugin
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  console.log(
    "Implementation address (using upgrades plugin):",
    implementationAddress
  );

  // Get the admin address
  const adminAddress = await upgrades.erc1967.getAdminAddress(proxyAddress);
  console.log("Proxy admin address:", adminAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
