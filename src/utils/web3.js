import SwapABI from "../assets/abi/swap.json";
import { ethers } from "ethers";
const bigLoongAddress = "0x789244D520e75d6683cCcf82179E6e0E7dD0E6d7"
const littleLoongAddress = "0x5355b03aA830AC9D171B436C1f620A27C73A5B17"
const swapAddress = "0x56CC8Ce20606492eE4c96F396577d70A52db8518"

export const swap = async (walletProvider, amount, isBig) => {
    const ethersProvider = new ethers.BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(swapAddress, SwapABI.abi, signer)
    const value = ethers.parseEther(amount.toString())
    if (isBig) {
        const tx = await contract.swap(bigLoongAddress, littleLoongAddress, value)
        await tx.wait()
    } else {
        const tx = await contract.swap(littleLoongAddress, bigLoongAddress, value)
        await tx.wait()
    }
}