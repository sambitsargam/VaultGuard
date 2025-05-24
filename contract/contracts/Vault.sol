// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault {
    IERC20 public immutable collateralToken;
    uint256 private nextVaultId;

    struct VaultData {
        address owner;
        uint256 collateral;
        uint256 debt;
    }

    mapping(uint256 => VaultData) public vaults;

    event VaultCreated(uint256 indexed vaultId, address indexed owner);
    event CollateralDeposited(uint256 indexed vaultId, uint256 amount);

    constructor(address _collateralToken) {
        collateralToken = IERC20(_collateralToken);
    }

    function createVault() external returns (uint256 vaultId) {
        vaultId = nextVaultId++;
        vaults[vaultId] = VaultData(msg.sender, 0, 0);
        emit VaultCreated(vaultId, msg.sender);
    }

    function depositCollateral(uint256 vaultId, uint256 amount) external {
        VaultData storage v = vaults[vaultId];
        require(v.owner == msg.sender, "Vault: not owner");
        collateralToken.transferFrom(msg.sender, address(this), amount);
        v.collateral += amount;
        emit CollateralDeposited(vaultId, amount);
    }

    function getVault(uint256 vaultId) external view returns (uint256 collateral, uint256 debt) {
        VaultData storage v = vaults[vaultId];
        return (v.collateral, v.debt);
    }
}
