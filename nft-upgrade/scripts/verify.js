const { run, ethers, upgrades } = require("hardhat");

async function verifyContract(address, args = []) {
  console.log(`Verifying contract at ${address}`);
  try {
    await run("verify:verify", { address, constructorArguments: args });
  } catch (e) {
    console.log(
      e.message.includes("already verified") ? "Already verified" : e
    );
  }
}

async function verifyProxyAndImpl(name, proxyAddress, args = []) {
  const implAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  await verifyContract(proxyAddress);
  await verifyContract(implAddress, args);
  console.log(`${name} verified. Proxy: ${proxyAddress}, Impl: ${implAddress}`);
}

async function main() {
  const ERC20Proxy = "0xBE01210f91Ee0A76c516f5a76e3a9150d450cEFC";
  const NFTProxy = "0x5bff7153224897319F1E83D80aEC8BafD27C0BD8";
  const StakingProxy = "0x2B7Fb2A329a421203e633FEBa2c556eB41942510";

  await verifyProxyAndImpl("ERC20", ERC20Proxy);
  await verifyProxyAndImpl("NFT", NFTProxy);

  const staking = await ethers.getContractAt(
    "NFTStakingUpgradeable",
    StakingProxy
  );
  const erc20ImplAddress = await verifyProxyAndImpl("ERC20", ERC20Proxy);
  const nftImplAddress = await verifyProxyAndImpl("NFT", NFTProxy);
  await verifyProxyAndImpl("Staking", StakingProxy, [
    erc20ImplAddress,
    nftImplAddress,
  ]);

  const proxyAdmin = await upgrades.erc1967.getAdminAddress(ERC20Proxy);
  await verifyContract(proxyAdmin);
  console.log("ProxyAdmin verified:", proxyAdmin);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
