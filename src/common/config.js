
const mainnet = {
        chainId: 1,
        name: 'Ethereum',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'https://cloudflare-eth.com'
    };

const testnet = {
    chainId: 97,
    name: 'BNB Smart Chain Testnet',
    currency: 'tBNB',
    explorerUrl: 'https://testnet.bscscan.com',
    rpcUrl: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545'
}

const optest = {
    chainId: 11155420,
    name: 'Optimism Testnet',
    currency: 'ETH',
    explorerUrl: 'https://sepolia-optimism.etherscan.io/',
    rpcUrl: 'https://sepolia.optimism.io'
}

export const chain = optest;
// export const contractAddress = '0x582a2124A6a47Db11B33f5ae67B12055655396d8'
// export const chain = mainnetx;
export const contractAddress = '0xBc4B1e8caC87872AA6970f4d396C778CAE4F4C1F'
