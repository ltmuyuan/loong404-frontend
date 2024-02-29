import { getTotalMinted, getPrice, checkFreeMint } from "../utils/web3"

export const getInitMintInfo = async (walletProvider: any, isGreatL: boolean) => {
  const [minted, price, isFree] = await Promise.all([
    getTotalMinted(walletProvider, isGreatL),
    getPrice(walletProvider, isGreatL),
    checkFreeMint(walletProvider, isGreatL),
  ])
  return {
    minted,
    price,
    isFree,
  }
}

export const getPercent = (minted: number, total: number) => {
  return Number((minted / total).toFixed(2)) * 100;
}

export const addCommasToNumber =(number: number) =>{
  let numbB = Number(number)
  return numbB?.toLocaleString('en-US');
}