import SwapABI from "./abi/ISwap.json";
import GreatLABI from "./abi/GreatL.json";
import BabyLABI from "./abi/BabyL.json";
import DataABI from "./abi/IDataStorage.json";
import MintABI from "./abi/IMint.json";
import { ethers } from "ethers";

/** 
 * those data only use in test environment
 */
const GreatLoongAddress = "0x512273384A35D749207Db806cF3E1ed89E5613a3"
const BabyLoongAddress = "0xafA0860737Fa278812e7374681bC83bc1b031F51"
const swapAddress = "0x936201bc8eecc9F062b938a9B40Ea25133513d99"
const dataAddress = "0x9514C7DB087458fE82F1f93cFe4229EB38d88F38"
const greatLMintAddr = "0xE20e2EdBb15635c9913ac10D91c717018a82fc71"
const babyLMintAddr = "0x376fB81695D3CA27F0A4324f7EbEE2980Fabd785"

/**
 * Swap tokens
 * @param {* this is a browser provider ethers can use} walletProvider 
 * @param {* this is a number or string you need to swap} amount 
 * @param {* boolean check is or not Great to Baby} isGreat 
 */
export const swap = async (walletProvider, amount, isGreat) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(swapAddress, SwapABI.abi, signer)
    const value = ethers.parseEther(amount.toString())
    if (amount == 0) {
        throw new Error('Amount must be greater than 0')
    }
    let balance = 0
    if (isGreat) {
        balance = await getBalanceGreatLoong(walletProvider)
    } else {
        balance = await getBalanceBabyLoong(walletProvider)
    }
    if (balance < amount) {
        throw new Error('Insufficient balance')
    }
    if (isGreat) {
        const tx = await contract.swap(GreatLoongAddress, BabyLoongAddress, value.toString())
        await tx.wait()
    } else {
        const tx = await contract.swap(BabyLoongAddress, GreatLoongAddress, value.toString())
        await tx.wait()
    }
}

/**
 * Get GreatLoong balance
 * @param {* this is a browser provider ethers can use} walletProvider 
 * @returns amount of GreatLoong
 */
export const getBalanceGreatLoong = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(GreatLoongAddress, GreatLABI.abi, signer)
    const balance = await contract.balanceOf(signer.getAddress())
    return balance.toString()
}

/**
 * Get BabyLoong balance
 * @param {* this is a browser provider ethers can use} walletProvider
 * @returns amount of BabyLoong
 */
export const getBalanceBabyLoong = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(BabyLoongAddress, BabyLABI.abi, signer)
    const balance = await contract.balanceOf(signer.getAddress())
    return balance.toString()
}

/**
 * Get invite code
 * @param {* this is a browser provider ethers can use} walletProvider
 * @returns invite code
 */
export const getInviteCode = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(dataAddress, DataABI.abi, signer)
    const inviteCode = await contract.getInviteCode(signer.getAddress())
    return inviteCode
}

/**
 * Generate invite code
 * @param {* this is a browser provider ethers can use} walletProvider
 * @returns invite code
 */
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

/**
 * Get invite codes
 * @param {* this is a browser provider ethers can use} walletProvider
 * @returns invite codes
 */
export const getInviteCodes = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(dataAddress, DataABI.abi, signer)
    const codes = await contract.getInviteCodes()
    return codes
}

/**
 * Create a 6-letter invite code
 * @returns 6-letter invite code
 */
export const createSixLetterNum = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Get discount list
 * @param {* this is a browser provider ethers can use} walletProvider
 * @returns {* boolean is or not white list} isWhiteList
 */
export const getDiscountList = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(dataAddress, DataABI.abi, signer)
    const num = await contract.getDiscountList(signer.getAddress())
    return num > 0
}

/**
 * get free greatL amount
 * @param {* this is a browser provider ethers can use} walletProvider
 * @returns amount of adult L
 */
export const buyListAdultL = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(dataAddress, DataABI.abi, signer)
    const num = await contract.buyListAdultL(signer.getAddress())
    return num
}

/**
 * get free babyL amount
 * @param {* this is a browser provider ethers can use} walletProvider
 * @returns amount of baby L
 */
export const buyListBabyL = async (walletProvider) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(dataAddress, DataABI.abi, signer)
    const num = await contract.buyListBabyL(signer.getAddress())
    return num
}

/**
 * get invite rewards
 * @param {* this is a browser provider ethers can use} walletProvider
 * @param {* boolean check is or not GreatL} isGreateL
 * @returns amount of greatL or babyL
 */
export const getInviteRewards = async (walletProvider, isGreateL) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(isGreateL ? greatLMintAddr : babyLMintAddr, MintABI.abi, signer)
    const num = await contract.getInviteRewards(signer.getAddress())
    return num.toString()
}

/**
 * get claim amount
 * @param {* this is a browser provider ethers can use} walletProvider
 * @param {* boolean check is or not GreatL} isGreateL
 * @returns amount of claim current day
 */
export const getClaimAmount = async (walletProvider, isGreateL) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(isGreateL ? greatLMintAddr : babyLMintAddr, MintABI.abi, signer)
    const num = await contract.getClaimAmount(signer.getAddress())
    return num.toString()
}

/**
 * claim rewards
 * @param {* this is a browser provider ethers can use} walletProvider
 * @param {* boolean check is or not GreatL} isGreateL
 */
export const claimRewards = async (walletProvider, isGreateL) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(isGreateL ? greatLMintAddr : babyLMintAddr, MintABI.abi, signer)
    const tx = await contract.claim()
    await tx.wait()
}