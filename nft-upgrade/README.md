# Smart Contract Security & Upgradeable NFT Platform

## Overview

This repository contains two main components:

1. Solutions to advanced Ethernaut security challenges
2. An upgradeable NFT platform implementing ERC721, ERC20, and staking mechanics with proxy contracts

## Ethernaut Solutions

### Implemented Solutions

- **Challenge 6: Delegation**

  - Demonstrates delegation patterns and function signature manipulation
  - Explores contract-to-contract interactions

- **Challenge 16: Preservation**

  - Focuses on storage layout understanding
  - Explores delegatecall mechanics and vulnerabilities

- **Challenge 24: Puzzle Wallet**

  - Investigates complex proxy patterns
  - Demonstrates multi-call functionality exploitation

- **Challenge 25: Motorbike**
  - Explores advanced proxy patterns (proxy of proxy)
  - Demonstrates implementation contract manipulation

Each solution includes:

- Detailed attack strategy
- Code implementation
- Security insights learned

## Upgradeable NFT Platform

### Architecture

Three main upgradeable contracts:

1. **ERC721 Token Contract**

   - Implements NFT standard
   - Upgradeable using OpenZeppelin's UUPS pattern
   - V2 implements "god mode" for admin token transfers

2. **ERC20 Token Contract**

   - Custom token for NFT operations
   - Upgradeable implementation
   - Standard ERC20 functionality

3. **Staking Contract**
   - Manages NFT deposits and rewards
   - Upgradeable staking mechanics
   - Secure reward distribution

### Upgrade Features

- UUPS proxy pattern implementation
- Transparent upgrade mechanism
- Storage gap protection
- Version tracking
- Admin-controlled upgrades

### V2 Enhancements

- God Mode functionality added to NFT contract
- Administrative transfer capabilities
- Preserved original functionality
- Backward compatibility maintained

## Deployment

### Hardhat Scripts Deployment

```bash
# Deploy initial version
npx hardhat run scripts/deploy.js --network sepolia

# Deploy upgrades
npx hardhat run scripts/upgrade.js --network sepolia
```

### Hardhat Ignition Deployment

```bash
# Deploy using Ignition
npx hardhat ignition deploy ignition/modules/ignition.js --network sepolia
```

## Technical Stack

- Solidity for smart contracts
- OpenZeppelin's upgradeable contracts
- Hardhat development environment
- Hardhat Ignition for deployment orchestration
- Ethers.js for contract interactions

## Security Considerations

- Proxy pattern security best practices
- Storage collision prevention
- Access control implementation
- Upgrade security measures

## Contract Addresses (Sepolia)

- NFT Proxy: `0x5bff7153224897319F1E83D80aEC8BafD27C0BD8`
- NFT Implementation V1: `0xF6c51DA52DE22C12c2400b5896B8955604e253b3`
- NFT Implementation V2: `0x2D5a2F9E094f89C00b4CF5DB663D1a01288598D3`
- ERC20 Proxy: `0xBE01210f91Ee0A76c516f5a76e3a9150d450cEFC`
- Staking Proxy: `0x2B7Fb2A329a421203e633FEBa2c556eB41942510`

## Local Development

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Deploy contracts
npx hardhat run scripts/deploy.js --network sepolia

# Deploy using Ignition
npx hardhat ignition deploy ignition/modules/ignition.js
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
