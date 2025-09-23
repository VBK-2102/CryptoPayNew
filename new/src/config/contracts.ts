// Contract Configuration
export const CONTRACT_CONFIG = {
  networks: {
    sepolia: {
      chainId: '11155111', // 11155111 in hex
      chainName: 'Sepolia test network',
      nativeCurrency: {
        name: 'SepoliaETH',
        symbol: 'SepoliaETH',
        decimals: 18
      },
      rpcUrls: ['https://sepolia.infura.io/v3/'],
      blockExplorerUrls: ['https://sepolia.etherscan.io'],
      explorer: 'https://sepolia.etherscan.io'
    }
  },
  contracts: {
    cryptoWallet: '0x09E3B1187489F7681236E8882226529C0194Cf91', // CryptoWallet v2.0.0 deployed on Sepolia
    usdt: '0xee4f09627eB6776348352D200a6a54d491BdE7B1', // USDT on Sepolia
    bxc: '0x40a6927D7937D2Ed206f6De90A43c15e1f2a6351'  // BXC Token deployed on Sepolia
  }
}

// Contract ABIs
export const CRYPTO_WALLET_ABI = [
  // Add your CryptoWallet contract ABI here
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view" as const,
    "type": "function" as const
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "address", "name": "token", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "executeWithdrawalTo",
    "outputs": [],
    "stateMutability": "nonpayable" as const,
    "type": "function" as const
  }
]

export const BXC_TOKEN_ABI = [
  // Standard ERC20 ABI
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view" as const,
    "type": "function" as const
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable" as const,
    "type": "function" as const
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event" as const
  }
]

export const ERC20_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view" as const,
    "type": "function" as const
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view" as const,
    "type": "function" as const
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view" as const,
    "type": "function" as const
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view" as const,
    "type": "function" as const
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view" as const,
    "type": "function" as const
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable" as const,
    "type": "function" as const
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event" as const
  }
]