// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./TigerNFTUpgradeable.sol";

contract TigerNFTUpgradeableV2 is TigerNFTUpgradeable {
    // New function for god mode
    function godModeTransfer(
        address from,
        address to,
        uint256 tokenId
    ) external onlyOwner {
        _transfer(from, to, tokenId);
    }
}
