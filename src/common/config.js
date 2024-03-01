
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
    rpcUrl: 'https://sepolia.optimism.io',
    contract: {
        GreatLoongAddress: "0xec8DF505661c0d5845Bd3D3F3a4180Eade2ACA32",
        greatLMintAddr: "0xc77dF1E6D4351f8aBa98722f66c481dd236F8885",
        BabyLoongAddress: "0x89426d1e7D8Cc62d89eA543E696ee589DA3722E0",
        babyLMintAddr: "0x799d5050fa3dd87ef31b4Baa918A631A2521CFF4",
        swapAddress: "0x7D15890177D88a38778702643CAb414cd387Bc40",
        dataAddress: "0x46096ca702716ea68e7fb1A30679fa1B263d7e77",
    }
}

export const chain = optest;
// export const contractAddress = '0x582a2124A6a47Db11B33f5ae67B12055655396d8'
// export const chain = mainnet;
export const contractAddress = '0xBc4B1e8caC87872AA6970f4d396C778CAE4F4C1F'
