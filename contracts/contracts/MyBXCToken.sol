// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyBXCToken
 * @dev Your custom BXC Token - A custom ERC20 token for your CryptoWallet platform
 * @dev Owner: 0xDA2D9bAf72B034cF466fDd5bB2F3cb24164a62FC
 */
contract MyBXCToken is ERC20, Ownable {
    
    constructor() ERC20("My BXC Token", "BXC") {
        // Mint initial supply to contract deployer (your admin address)
        _mint(msg.sender, 10000000 * 10**decimals()); // 10 million BXC tokens
    }
    
    /**
     * @dev Mint new tokens (owner only)
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Burn tokens from caller
     * @param amount Amount to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev Burn tokens from specific address (owner only)
     * @param from Address to burn from
     * @param amount Amount to burn
     */
    function burnFrom(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
    
    /**
     * @dev Transfer ownership to your admin address
     * @param newOwner Your admin address: 0xDA2D9bAf72B034cF466fDd5bB2F3cb24164a62FC
     */
    function transferOwnership(address newOwner) public override onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        _transferOwnership(newOwner);
    }
}
