// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TigerNFTUpgradeableV2 is
    Initializable,
    ERC721Upgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    using Strings for uint256;

    uint256 public constant MAX_SUPPLY = 10;
    uint256 public totalSupply;
    string private baseTokenURI;
    mapping(uint256 => address) private _tokenOwners;

    function initialize() public initializer {
        __ERC721_init("Tiger", "TGR");
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        baseTokenURI = "ipfs://bafybeihrklb222sgiowrjceg76rmqqpzqiyujmnufv3cq57ssemdxbbe4u/";
    }

    function mint(address to) external nonReentrant {
        require(totalSupply < MAX_SUPPLY, "All NFTs have been minted");
        uint256 tokenId = totalSupply + 1;
        totalSupply++;
        _safeMint(to, tokenId);
        _tokenOwners[tokenId] = to;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _tokenOwners[tokenId] != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return string(abi.encodePacked(baseTokenURI, tokenId.toString()));
    }

    // New function for god mode
    function godModeTransfer(
        address from,
        address to,
        uint256 tokenId
    ) external onlyOwner {
        _transfer(from, to, tokenId);
    }
}
