# 🚀 Smart Contract Deployment Guide

## Overview
This guide will help you deploy your own custom smart contracts with your admin address `0xDA2D9bAf72B034cF466fDd5bB2F3cb24164a62FC`.

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **MetaMask** or similar wallet
3. **Private Key** of your admin wallet
4. **Testnet/Mainnet RPC URL** (depending on where you want to deploy)

## 🛠️ Setup Instructions

### Step 1: Install Dependencies
```bash
cd contracts
npm install
```

### Step 2: Configure Hardhat
Edit `hardhat.config.js` and replace:
- `YOUR_TESTNET_RPC_URL` with your testnet RPC URL
- `YOUR_PRIVATE_KEY` with your private key (keep it secure!)

### Step 3: Compile Contracts
```bash
npm run compile
```

### Step 4: Deploy Contracts

#### For Local Development:
```bash
npm run deploy
```

#### For Testnet:
```bash
npm run deploy-testnet
```

#### For Mainnet:
```bash
npm run deploy-mainnet
```

## 📝 Contract Details

### MyBXCToken.sol
- **Name**: My BXC Token
- **Symbol**: BXC
- **Initial Supply**: 10,000,000 BXC
- **Owner**: Your admin address

### MyUSDTToken.sol
- **Name**: My USDT Token
- **Symbol**: USDT
- **Initial Supply**: 1,000,000 USDT
- **Owner**: Your admin address

### MyCryptoWallet.sol
- **Version**: 2.0.0
- **Owner**: Your admin address
- **Supported Tokens**: Your BXC and USDT tokens
- **Features**: Pausable, ReentrancyGuard, SafeERC20

## 🔧 After Deployment

### 1. Update Frontend Configuration
After deployment, update your frontend configuration:

```typescript
// In new/src/config/contracts.ts
export const CONTRACT_CONFIG = {
  contracts: {
    cryptoWallet: 'YOUR_DEPLOYED_CRYPTO_WALLET_ADDRESS',
    tokens: {
      BXC: 'YOUR_DEPLOYED_BXC_TOKEN_ADDRESS',
      USDT: 'YOUR_DEPLOYED_USDT_TOKEN_ADDRESS'
    }
  }
}
```

### 2. Update Admin Address
Update the admin address in your frontend:

```typescript
// In new/src/pages/AdminWithdrawals.tsx and new/src/components/Navbar.tsx
const ADMIN_WALLET_ADDRESSES = [
  "0xDA2D9bAf72B034cF466fDd5bB2F3cb24164a62FC"
]
```

## 🔐 Security Features

### Admin Controls
- **Pause/Unpause**: Emergency stop functionality
- **Execute Withdrawals**: Process user withdrawal requests
- **Emergency Recovery**: Recover stuck tokens
- **Mint Tokens**: Create new tokens when needed

### User Safety
- **Reentrancy Protection**: Prevents reentrancy attacks
- **Safe Token Transfers**: Uses OpenZeppelin's SafeERC20
- **Input Validation**: Comprehensive input validation
- **Custom Errors**: Gas-efficient error handling

## 📊 Contract Functions

### For Users:
- `depositCrypto()` - Deposit tokens
- `withdrawCrypto()` - Withdraw tokens
- `transferCrypto()` - Transfer between users
- `depositInr()` - Deposit INR (off-chain)
- `withdrawInr()` - Withdraw INR (off-chain)

### For Admin:
- `executeWithdrawalTo()` - Execute admin withdrawals
- `pause()` - Pause contract
- `unpause()` - Unpause contract
- `emergencyRecover()` - Emergency token recovery
- `mint()` - Mint new tokens (on token contracts)

## 🚨 Important Notes

1. **Keep Private Keys Secure**: Never commit private keys to version control
2. **Test on Testnet First**: Always test on testnet before mainnet deployment
3. **Verify Contracts**: Use Hardhat's verify plugin to verify contracts on block explorer
4. **Backup Deployment Info**: Save the `deployment-info.json` file securely
5. **Monitor Gas Costs**: Be aware of gas costs for different operations

## 🔍 Verification

After deployment, verify your contracts on the block explorer:

```bash
npx hardhat verify --network testnet YOUR_CONTRACT_ADDRESS "constructor_arg1" "constructor_arg2"
```

## 📞 Support

If you encounter any issues:
1. Check the Hardhat documentation
2. Verify your network configuration
3. Ensure you have sufficient funds for gas
4. Check that your private key is correct

## 🎉 Success!

Once deployed successfully, you'll have:
- ✅ Your own BXC token contract
- ✅ Your own USDT token contract  
- ✅ Your own CryptoWallet contract
- ✅ Full admin control with your address
- ✅ All security features enabled

Your contracts are now ready to be integrated with your frontend application!
