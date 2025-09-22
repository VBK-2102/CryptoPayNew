const fs = require('fs');
const path = require('path');

// Read deployment info
const deploymentInfo = JSON.parse(fs.readFileSync('deployment-info.json', 'utf8'));

console.log('🔄 Updating frontend configuration...');

// Update contracts.ts
const contractsPath = path.join('..', 'new', 'src', 'config', 'contracts.ts');
const contractsContent = `// Auto-generated from deployment
export const CONTRACT_CONFIG = {
  contracts: {
    cryptoWallet: '${deploymentInfo.contracts.cryptoWallet.address}',
    tokens: {
      BXC: '${deploymentInfo.contracts.bxcToken.address}',
      USDT: '${deploymentInfo.contracts.usdtToken.address}'
    }
  },
  network: {
    chainId: ${deploymentInfo.network.chainId},
    name: '${deploymentInfo.network.name}'
  },
  admin: {
    address: '${deploymentInfo.adminAddress}'
  }
}

// Contract ABIs (you'll need to add these manually)
export const CRYPTO_WALLET_ABI = [
  // Add your deployed contract ABI here
];

export const BXC_TOKEN_ABI = [
  // Add your BXC token ABI here
];

export const USDT_TOKEN_ABI = [
  // Add your USDT token ABI here
];
`;

fs.writeFileSync(contractsPath, contractsContent);
console.log('✅ Updated contracts.ts');

// Update AdminWithdrawals.tsx
const adminWithdrawalsPath = path.join('..', 'new', 'src', 'pages', 'AdminWithdrawals.tsx');
let adminWithdrawalsContent = fs.readFileSync(adminWithdrawalsPath, 'utf8');

// Replace admin addresses
adminWithdrawalsContent = adminWithdrawalsContent.replace(
  /const adminAddresses = \[\s*'0x76b16F59Cfab5DdaE5D149BE98E5d755F939572A'\s*\]/g,
  `const adminAddresses = [
    '${deploymentInfo.adminAddress}'
  ]`
);

fs.writeFileSync(adminWithdrawalsPath, adminWithdrawalsContent);
console.log('✅ Updated AdminWithdrawals.tsx');

// Update Navbar.tsx
const navbarPath = path.join('..', 'new', 'src', 'components', 'Navbar.tsx');
let navbarContent = fs.readFileSync(navbarPath, 'utf8');

// Replace admin addresses
navbarContent = navbarContent.replace(
  /const ADMIN_WALLET_ADDRESSES = \[\s*"0x76b16F59Cfab5DdaE5D149BE98E5d755F939572A"\s*\]/g,
  `const ADMIN_WALLET_ADDRESSES = [
    "${deploymentInfo.adminAddress}"
  ]`
);

fs.writeFileSync(navbarPath, navbarContent);
console.log('✅ Updated Navbar.tsx');

console.log('🎉 Frontend configuration updated successfully!');
console.log('📋 Next steps:');
console.log('1. Add the contract ABIs to contracts.ts');
console.log('2. Test the admin functionality');
console.log('3. Deploy your frontend with the new configuration');
