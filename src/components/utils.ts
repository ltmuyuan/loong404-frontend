import { getTotalMinted, getPrice, checkFreeMint, getLimitMemberMint } from "../utils/web3"

export const getInitMintInfo = async (walletProvider: any, isGreatL: boolean) => {
  const [minted, price, isFree, limitMint] = await Promise.all([
    getTotalMinted(walletProvider, isGreatL),
    getPrice(walletProvider, isGreatL),
    checkFreeMint(walletProvider, isGreatL),
    getLimitMemberMint(walletProvider, isGreatL)
  ])
  return {
    minted,
    price,
    isFree,
    limitMint,
  }
}

export const getPercent = (minted: number, total: number) => {
  return Number((minted / total) * 100).toFixed(2);
}

export const addCommasToNumber =(number: number) =>{
  let numbB = Number(number)
  return numbB?.toLocaleString('en-US');
}