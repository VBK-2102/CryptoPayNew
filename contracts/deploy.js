const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 Starting deployment of your custom contracts...");
    
    // Your admin address
    const ADMIN_ADDRESS = "0x7B5af30A221A5c27b74cFe4A5397a84c8cdDc2D1";
    
    // Debug environment variables
    console.log("Environment variables:");
    console.log("SEPOLIA_RPC_URL:", process.env.SEPOLIA_RPC_URL);
    console.log("PRIVATE_KEY length:", process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.length : "undefined");
    console.log("ADMIN_ADDRESS:", process.env.ADMIN_ADDRESS);
    
    // Get the deployer account
    const signers = await ethers.getSigners();
    console.log("Number of signers found:", signers.length);
    
    if (signers.length === 0) {
        throw new Error("No signers found. Check your private key configuration.");
    }
    
    const deployer = signers[0];
    console.log("Deploying contracts with account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());
    
    // Get the contract factories
    const MyBXCToken = await ethers.getContractFactory("MyBXCToken");
    const MyUSDTToken = await ethers.getContractFactory("MyUSDTToken");
    const MyCryptoWallet = await ethers.getContractFactory("MyCryptoWallet");
    
    console.log("📝 Deploying MyBXCToken...");
    const bxcToken = await MyBXCToken.deploy();
    await bxcToken.waitForDeployment();
    const bxcTokenAddress = await bxcToken.getAddress();
    console.log("✅ MyBXCToken deployed to:", bxcTokenAddress);
    
    console.log("📝 Deploying MyUSDTToken...");
    const usdtToken = await MyUSDTToken.deploy();
    await usdtToken.waitForDeployment();
    const usdtTokenAddress = await usdtToken.getAddress();
    console.log("✅ MyUSDTToken deployed to:", usdtTokenAddress);
    
    console.log("📝 Deploying MyCryptoWallet...");
    const cryptoWallet = await MyCryptoWallet.deploy(usdtTokenAddress, bxcTokenAddress);
    await cryptoWallet.waitForDeployment();
    const cryptoWalletAddress = await cryptoWallet.getAddress();
    console.log("✅ MyCryptoWallet deployed to:", cryptoWalletAddress);
    
    // Transfer ownership to your admin address
    console.log("🔐 Transferring ownership to admin address...");
    
    await bxcToken.transferOwnership(ADMIN_ADDRESS);
    console.log("✅ BXC Token ownership transferred to:", ADMIN_ADDRESS);
    
    await usdtToken.transferOwnership(ADMIN_ADDRESS);
    console.log("✅ USDT Token ownership transferred to:", ADMIN_ADDRESS);
    
    await cryptoWallet.transferOwnership(ADMIN_ADDRESS);
    console.log("✅ CryptoWallet ownership transferred to:", ADMIN_ADDRESS);
    
    // Verify ownership
    console.log("🔍 Verifying ownership...");
    const bxcOwner = await bxcToken.owner();
    const usdtOwner = await usdtToken.owner();
    const walletOwner = await cryptoWallet.owner();
    
    console.log("BXC Token Owner:", bxcOwner);
    console.log("USDT Token Owner:", usdtOwner);
    console.log("CryptoWallet Owner:", walletOwner);
    
    // Save deployment info
    const deploymentInfo = {
        network: await ethers.provider.getNetwork(),
        adminAddress: ADMIN_ADDRESS,
        contracts: {
            bxcToken: {
                address: bxcTokenAddress,
                name: "My BXC Token",
                symbol: "BXC",
                owner: bxcOwner
            },
            usdtToken: {
                address: usdtTokenAddress,
                name: "My USDT Token", 
                symbol: "USDT",
                owner: usdtOwner
            },
            cryptoWallet: {
                address: cryptoWalletAddress,
                name: "MyCryptoWallet",
                version: "2.0.0",
                owner: walletOwner,
                supportedTokens: {
                    usdt: usdtTokenAddress,
                    bxc: bxcTokenAddress
                }
            }
        },
        deploymentTime: new Date().toISOString()
    };
    
    console.log("\n🎉 Deployment completed successfully!");
    console.log("📋 Contract Addresses:");
    console.log("BXC Token:", bxcTokenAddress);
    console.log("USDT Token:", usdtTokenAddress);
    console.log("CryptoWallet:", cryptoWalletAddress);
    console.log("Admin Address:", ADMIN_ADDRESS);
    
    // Save to file
    const fs = require('fs');
    fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("💾 Deployment info saved to deployment-info.json");
    
    return deploymentInfo;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
