import {useDisconnect, useWeb3Modal, useWeb3ModalAccount} from '@web3modal/ethers/react'
import styled from "styled-components";
import {  Popover } from 'antd';
import {useState} from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

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
    const [isModalOpenInvite, setIsModalOpenInvite] = useState(false)
    const [inviteCode, setInviteCode] = useState('xxx')

    // console.log(address, chainId)

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

    const content = (
        <>
            <LineBox>
                <li onClick={()=>toAccount()}>Account</li>
                <li onClick={()=>setIsModalOpenInvite(true)}>Invite</li>
                <li onClick={()=>{}}>Reward</li>
                <li onClick={()=>disconnectWallet()}>Logout</li>
            </LineBox>
            <Modal isOpen={isModalOpenInvite} onClose={() => setIsModalOpenInvite(false)} title="Invite friends">
                <div>Invite your friends to join our community with a custom referral code</div>
                <InviteFriendsRow>
                    <div>Invite Code:</div>
                    <div>{inviteCode}</div>
                    <div>Copy</div>
                </InviteFriendsRow>
                <Button>Done</Button>
            </Modal>
        </>
    );

    // return <ConnectBtn onClick={()=>onClick()}>{btnText}</ConnectBtn>
    return address ?
        <Popover placement="bottom" onOpenChange={handleOpenChange} open={popoverOpen} content={content} trigger="click">
            <ConnectBtn>{truncateString(address, 15) }</ConnectBtn>
        </Popover> :
        <ConnectBtn onClick={onClick}>Connect Wallet</ConnectBtn>
}
