import SwapABI from "./abi/ISwap.json";
import GreatLABI from "./abi/GreatL.json";
import BabyLABI from "./abi/BabyL.json";
import DataABI from "./abi/IDataStorage.json";
import { ethers } from "ethers";

const GreatLoongAddress = "0x512273384A35D749207Db806cF3E1ed89E5613a3"
const BabyLoongAddress = "0xafA0860737Fa278812e7374681bC83bc1b031F51"
const swapAddress = "0x936201bc8eecc9F062b938a9B40Ea25133513d99"
const dataAddress = "0x9514C7DB087458fE82F1f93cFe4229EB38d88F38"

export const swap = async (walletProvider, amount, isBig) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(swapAddress, SwapABI.abi, signer)
    const value = ethers.parseEther(amount.toString())
    if (isBig) {
        const tx = await contract.swap(GreatLoongAddress, BabyLoongAddress, value.toString())
        await tx.wait()
    } else {
        const tx = await contract.swap(BabyLoongAddress, GreatLoongAddress, value.toString())
        await tx.wait()
    }
}

export const getBalanceGreatLoong = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(GreatLoongAddress, GreatLABI.abi, signer)
    const balance = await contract.balanceOf(signer.getAddress())
    return balance.toString()
}

export const getBalanceBabyLoong = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(BabyLoongAddress, BabyLABI.abi, signer)
    const balance = await contract.balanceOf(signer.getAddress())
    return balance.toString()
}

export const getInviteCode = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(dataAddress, DataABI.abi, signer)
    const inviteCode = await contract.getInviteCode(signer.getAddress())
    return inviteCode
}

export const generateInviteCode = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(dataAddress, DataABI.abi, signer)
    const codes = await getInviteCodes(walletProvider)
    let code = createSixLetterNum()
    for (let i = 0; i < 20; i++) {
        if (!codes.includes(code)) {
            break
        }
        code = createSixLetterNum()
    }
    const tx = await contract.generateInviteCode(code)
    await tx.wait()
    return code
}

export const getInviteCodes = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(dataAddress, DataABI.abi, signer)
    const codes = await contract.getInviteCodes()
    return codes
}

export const createSixLetterNum = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}