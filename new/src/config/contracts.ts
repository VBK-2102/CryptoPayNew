// Contract Configuration
export const CONTRACT_CONFIG = {
  networks: {
    sepolia: {
      chainId: '0xaa36a7', // 11155111 in hex
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
    cryptoWallet: '0x38fFcD11C6c7e692BE466392D661750E7475AD80', // CryptoWallet v2.0.0 deployed on Sepolia
    usdt: '0x33753b11A5a1096b6fEE2c1cf434c53eAc537BCC', // USDT on Sepolia
    bxc: '0x30DaD39B38efEAb83bb3CBb87A75f70F95a8aD06'  // BXC Token deployed on Sepolia
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