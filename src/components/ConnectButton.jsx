import { useDisconnect, useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import styled from "styled-components";
import { Popover, message } from 'antd';
import { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import CopySvg from '../assets/copy.svg';
import { generateInviteCode, getInviteCode } from "../utils/web3";

const ConnectBtn = styled.button`
    background: #ebe0cc;
    color: #0a0a0b;
    border: 0;
    width: 145px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    border-radius: 8px;
`

const LineBox = styled.ul`
    li{
        width: 100px;
        height: 43px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #Fff;
        a{
            color: #Fff;
        }
    }
`
const InviteFriendsRow = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 40px;
    margin-bottom: 40px;
    img {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    .code {
        margin: 0 4px;
    }
`;

function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }

    const truncatedLength = maxLength - 3;
    const start = str.substring(0, truncatedLength / 2);
    const end = str.substring(str.length - truncatedLength / 2);

    return start + "..." + end;
}
export default function ConnectButton() {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const { open } = useWeb3Modal()
    const { address, chainId, isConnected } = useWeb3ModalAccount()
    const { disconnect } = useDisconnect()
    const { walletProvider } = useWeb3ModalProvider()
    const [isModalOpenInvite, setIsModalOpenInvite] = useState(false)
    const [isModalOpenReward, setIsModalOpenReward] = useState(false)
    const [inviteCode, setInviteCode] = useState('xxx')
    const [babyLoong, setBabyLoong] = useState(0)
    const [greatLoong, setGreatLoong] = useState(0)

    const onClick = () => {
        open()
    }

    const handleOpenChange = (newOpen) => {
        if (!address) return;
        setPopoverOpen(newOpen);
    };

    const disconnectWallet = () => {
        disconnect()
        setPopoverOpen(false)
    }

    const toAccount = () => {
        setPopoverOpen(false)
        window.open(`https://etherscan.io/address/${address}`, '_blank')
    }

    const onCopy = () => {
        navigator.clipboard.writeText(inviteCode)
        message.success('Copied')
    }

    const onClose = () => {
        setIsModalOpenInvite(false)
    }

    const inviteCodeInit = async () => {
        let code = await getInviteCode(walletProvider)
        if (!code) {
            code = await generateInviteCode(walletProvider)
        }
        setInviteCode(code)
    }

    const onInvite = () => {
        setIsModalOpenInvite(true)
        setPopoverOpen(false)
    }

    useEffect(() => {
        if (address && isModalOpenInvite && inviteCode === 'xxx') {
            inviteCodeInit()
        }
    }, [address, isModalOpenInvite])

    const content = (
        <>
            <LineBox>
                <li onClick={() => toAccount()}>Account</li>
                <li onClick={() => onInvite()}>Invite</li>
                <li onClick={()=>setIsModalOpenReward(true)}>Reward</li>
                <li onClick={() => disconnectWallet()}>Logout</li>
            </LineBox>
        </>
    );

    // return <ConnectBtn onClick={()=>onClick()}>{btnText}</ConnectBtn>
    return address ? (
        <>
            <Popover placement="bottom" onOpenChange={handleOpenChange} open={popoverOpen} content={content} trigger="click">
                <ConnectBtn>{truncateString(address, 15)}</ConnectBtn>
            </Popover>
            <Modal isOpen={isModalOpenInvite} onClose={() => setIsModalOpenInvite(false)} title="Invite friends">
                <div>Invite your friends to join our community with a custom referral code</div>
                <InviteFriendsRow onClick={onCopy}>
                    <div>Invite Code:</div>
                    <div className="code">{inviteCode}</div>
                    <img src={CopySvg} alt="copy" title="copy" />
                </InviteFriendsRow>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button style={{ margin: "0 auto", width: '300px', height: "60px" }} onClick={onClose}>Done</Button>
                </div>
            </Modal>
            <Modal isOpen={isModalOpenReward} onClose={() => setIsModalOpenReward(false)} title="Claim your reward">
                <div>Earn rewards through various activities like inviting friends to mint NFTs</div>
                <div><strong>Rewards available:</strong></div>
                <div><strong>{greatLoong}</strong>Great Loong Tokens</div>
                <div><strong>{babyLoong}</strong>Baby Loong Tokens</div>
                <Button>Claim</Button>
            </Modal>
        </>
    ) :
        <ConnectBtn onClick={onClick}>Connect Wallet</ConnectBtn>
}
