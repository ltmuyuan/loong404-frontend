import { getTotalMinted, getPrice, checkFreeMint, getNftIds } from "../utils/web3"

export const getInitMintInfo = async (walletProvider: any, isGreatL: boolean) => {
  const [minted, price, isFree, nftIds] = await Promise.all([
    getTotalMinted(walletProvider, isGreatL),
    getPrice(walletProvider, isGreatL),
    checkFreeMint(walletProvider, isGreatL),
    getNftIds(walletProvider, isGreatL),
  ])
  return {
    minted,
    price,
    isFree,
    nftIds,
  }
}

export const getPercent = (minted: number, total: number) => {
  return Number((minted / total) * 100).toFixed(2);
}

export const addCommasToNumber =(number: number) =>{
  let numbB = Number(number)
  return numbB?.toLocaleString('en-US');
}