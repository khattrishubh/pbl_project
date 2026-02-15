export const NETWORK_CONFIG = {
    sepolia: {
        chainId: "0xaa36a7",
        chainName: "Sepolia Test Network",
        nativeCurrency: {
            name: "Sepolia Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://sepolia.infura.io/v3/"], // Example RPC
        blockExplorerUrls: ["https://sepolia.etherscan.io"],
    },
};

export const SUPPORTED_CHAIN_ID = 11155111; // Sepolia
