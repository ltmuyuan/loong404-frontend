import { useDisconnect, useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import styled from "styled-components";
import { Popover, message } from 'antd';
import { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import CopySvg from '../assets/copy.svg';
import { generateInviteCode, getInviteCode, getInviteRewards, claimRewards } from "../utils/web3";
import store from "../store/index.js";
import { saveLoading } from "../store/reducer.js";

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
        a{
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

const RewardBox = styled.div`
    .des {
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .rewardTitle {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 18px;
    }
    .tokens {
        margin-bottom: 20px;
        strong {
            font-size: 32px;
            font-weight: 700;
            color: #792E22;
            margin-right: 8px;
        }
    }
`;

function truncateString(str: any, maxLength: any) {
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
    const [tokens, setTokens] = useState({ babyLoong: 0, greatLoong: 0 })

    const onClick = () => {
        open()
    }

    const handleOpenChange = (newOpen: any) => {
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
            try {
                message.info('Generating invite code first')
                store.dispatch(saveLoading(true))
                code = await generateInviteCode(walletProvider)
            } catch (e: any) {

            }
            store.dispatch(saveLoading(false))
        }
        setInviteCode(code)
    }

    const tokensInit = async () => {
        const greateAmount = await getInviteRewards(walletProvider, true)
        const babyAmount = await getInviteRewards(walletProvider, false)
        setTokens({ greatLoong: greateAmount, babyLoong: babyAmount })
    }

    const onInvite = () => {
        setIsModalOpenInvite(true)
        setPopoverOpen(false)
    }

    const onReward = () => {
        setIsModalOpenReward(true)
        setPopoverOpen(false)
    }

    const onClaim = async () => {
        store.dispatch(saveLoading(true))
        try {
            if (tokens.greatLoong > 0) {
                await claimRewards(walletProvider, true)
            }
            if (tokens.babyLoong > 0) {
                await claimRewards(walletProvider, false)
            }
            if (tokens.greatLoong > 0 || tokens.babyLoong > 0) {
                message.success('Claim successfully!')
                setIsModalOpenReward(false)
                tokensInit()
            } else {
                message.warning('No rewards to claim!')
            }
        } catch (e: any) {
            console.error(e)
            const msg = e.message ? `Claim failed: ${e.message.split('(')[0]}` : 'Claim failed'
            message.error(msg)
        }
        store.dispatch(saveLoading(false))
    }

    useEffect(() => {
        if (address && isModalOpenInvite) {
            inviteCodeInit()
        }
    }, [address, isModalOpenInvite])

    useEffect(() => {
        if (address && isModalOpenReward) {
            tokensInit()
        }
    }, [address, isModalOpenReward])

    const content = (
        <>
            <LineBox>
                <li onClick={() => toAccount()}>Account</li>
                <li onClick={() => onInvite()}>Invite</li>
                <li onClick={() => onReward()}>Reward</li>
                <li onClick={() => disconnectWallet()}>Logout</li>
            </LineBox>
        </>
    );

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
                    <img src={CopySvg.src} alt="copy" title="copy" />
                </InviteFriendsRow>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button style={{ margin: "0 auto", width: '300px', height: "60px" }} onClick={onClose}>Done</Button>
                </div>
            </Modal>
            <Modal isOpen={isModalOpenReward} onClose={() => setIsModalOpenReward(false)} title="Claim your reward">
                <RewardBox>
                    <div className="des">Earn rewards through various activities like inviting friends to mint NFTs</div>
                    <div className="rewardTitle">Rewards available:</div>
                    <div className="tokens"><strong>{tokens.greatLoong}</strong>Great Loong Tokens</div>
                    <div className="tokens"><strong>{tokens.babyLoong}</strong>Baby Loong Tokens</div>
                </RewardBox>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                    <Button style={{ margin: "0 auto", width: '300px', height: "60px" }} onClick={onClaim}>Claim</Button>
                </div>
            </Modal>
        </>
    ) :
        <ConnectBtn onClick={onClick}>Connect Wallet</ConnectBtn>
}