// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @notice A simple 6-decimal ERC20 to mimic USDC.e on testnet
contract USDCeMock is ERC20 {
    constructor(uint256 initialMint) ERC20("Test USDC.e", "USDC.e") {
        _mint(msg.sender, initialMint);
    }

    /// @dev Override to use 6 decimals like real USDC
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
