import styled from "styled-components";
import DemoImg from "@/assets/demo.jpg";
import TwitterImg from "@/assets/demo/twitter.png";
import GlobalImg from "@/assets/demo/global.png";
import LftImg from "@/assets/demo/minus.png";
import RhtImg from "@/assets/demo/plus.png";
import BgImg from "@/assets/demo/bg.png";
import ConnectButton from "@/components/ConnectButton.jsx";
import {useWeb3Modal, useWeb3ModalAccount} from '@web3modal/ethers/react'
import {useWeb3ModalProvider} from "@web3modal/ethers/react";
// import {Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"
import {useEffect, useState} from "react";
import abi from '@/assets/abi/loong-abi.json'
import {BrowserProvider, Contract, ethers, JsonRpcProvider} from "ethers";
import {chain, contractAddress} from "@/common/config.js";
import Loading from "@/components/loading";
import {useSelector} from "react-redux";
import { Input, notification } from 'antd';
import store from "@/store/index.js";
import {saveLoading} from "@/store/reducer.js";
import BigNumber from "bignumber.js";
import LogoMint from "@/assets/logoMint.png";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

// #region Css
const Layout = styled.div`

    width: 100%;
    min-height: 100vh;
    background:#070404 url(${BgImg.src});
    background-size: cover;
`
const MainBox = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 60px;
    max-width: 1470px;
    box-sizing: border-box;
    @media (max-width: 1100px) {
        padding: 0 20px 40px;
    }
`

const FirstLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 126px;
    img{
        height: 23px;
        cursor: pointer;
    }
    @media (max-width: 1100px) {
          height: 80px;
    }
`

const BtmBox = styled.div`
    background: #111a22;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,.2);
    padding: 80px 60px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap:185px;
    @media (max-width: 1100px) {
        flex-direction: column;
        padding: 40px 30px;
        gap: 70px;
    }
    
`

const LftBox = styled.div`
    flex-grow: 1;
`

const TitleBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 30px;
`

interface TitleItemProps {
    $isActive: boolean;
}
const TitleItem = styled.div<TitleItemProps>`
    color: #fff;
    opacity: ${props => (props.$isActive ? 1 : 0.6)};
    cursor: pointer;
    font-size: ${props => props.$isActive ? '30px' : '24px'};
    font-weight: 700;
`

interface ProBoxProps {
    width: number;
}
const ProBox = styled.div<ProBoxProps>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-top: 50px;
    width: 100%;
    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .proOuter{
        width: 100%;
        background: rgba(255,255,255,0.2);
        height: 16px;
        border-radius: 8px;
        margin-top: 20px;
        overflow: hidden;
    }
    .proInner{
        height: 100%;
        width: ${props => props.width + "%" };
        background: #ece2cf!important;
        border-radius: 8px;
    }
`
const RhtBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`

const PhotoBox = styled.div`
    img{
        width: 490px;
        height: 490px;
        object-fit: cover;
        object-position: center;
        border-radius: 20px;
        display: block;
        background-color: #D9D9D9;
    }
    @media (max-width: 1100px) {
        img{
            width: 73vw;
            height: 73vw;

        }

    }
  
`
const ArticleBox = styled.div`
    margin-top: 40px;
    font-size: 16px;
    p,span{
        margin-bottom: 30px;
        line-height: 1.4;
        opacity: 0.8;
    }
    div{
        margin-bottom: 30px;
        line-height: 1.4;
    }
`

const SocialBox = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    img{
        width: 40px;
        height: 40px;
    }
`
const PublicBox = styled.div`
    margin-top: 30px;
    border: 1px solid #ece2cf;
    border-radius: 8px;
    padding: 20px;
    background: rgba(255,255,255,0.1);
    display: flex;
    flex-direction: column;
    gap:10px;
`

const RhtBtmBox = styled.div`
    margin-top: 40px;
`

const FlexLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const RhtInput = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
    width: 128px;
    height: 27px;
    padding: 8px 10px;
    img{
        width: 25px;
        height: 25px;
        border-radius: 25px;
        flex-shrink: 0;
        cursor: pointer;
    }
    input{
        background: transparent;
        border: 0;
        flex-grow: 1;
        text-align: center;
        width: 70px;
        color:rgba(255,255,255,0.8);
    }
`

const MintBtn = styled.button`
    width: 100%;
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ece2cf;
    color: #0a0a0b;
    border: 0;
    margin-top: 30px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
`

const LogoBox = styled.div`

    cursor: pointer;
    //background: #83271c;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    //height: 40px;
    font-size: 23px;
    border-radius: 10px;
    img{
        
        height: 50px;
    }
`
const FormBox = styled.div`
    .ant-input {
        margin-top: 15px;
        color: #000;
    }
    button {
        margin-top: 15px;
        width: 100%;
    }
`

const TipBox = styled.div`
    color: #ece2cf;
    background: rgba(255,255,255,0.2);
    border-radius: 8px;
    margin-top: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`
// #endregion


const MAX_COUNT = 5;
const MINT_TYPE_FREE = '2'
const MINT_TYPE_NORMAL = '1'
const  Unit = 600000;

export function MintLayout({ isBaby }: { isBaby: boolean }) {
    const { address, chainId,  isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()
    const [count, setCount] = useState(0)
    // const navigate = useNavigate()
    const navigate = useRouter().push
    const searchParams = useSearchParams();
    const [mintType, setMintType] = useState<null | '1' | '2'>(null)
    const [minted, setMinted] = useState('')
    const [total, setTotal] = useState('')
    const [price, setPrice] = useState('')
    const [limitMemberMint, setLimitMemberMint] = useState('0')
    const [limitMint, setLimitMint] = useState('0')
    const [normalMintRemain, setNormalMintRemain] = useState(0)
    const { open } = useWeb3Modal();
    const loading = useSelector<{ loading: boolean }, boolean>(store => store.loading);
    const [api, contextHolder] = notification.useNotification();
    const [pro,setPro] = useState(0);
    const [refresh, setRefresh] = useState(0)
    const [isModalOpenImport, setIsModalOpenImport] = useState(false);
    const [inviteCode, setInviteCode] = useState('');

    useEffect(() => {
        setIsModalOpenImport(Boolean(searchParams.get('inviteCode')));
        setInviteCode(searchParams.get('inviteCode') || '');
    }, [searchParams])

    useEffect(()=> {
        (async () => {
            try {
                const provider = new JsonRpcProvider(chain.rpcUrl);
                const contract = new Contract(contractAddress, abi, provider)
                const arr = [
                    contract.minted(),
                    contract.totalSupply(),
                ]
                const rests = await Promise.all(arr)
                console.log(rests)
                let mintedB = rests[0].toString();
                setMinted(mintedB);
                let totalB = ethers.formatEther(rests[1])
                let totalAfter = new BigNumber(totalB).div(Unit);
                console.log(totalAfter)
                setTotal(totalAfter.toString());
                let MintedBN = new BigNumber(mintedB)
                const result = MintedBN.dividedBy(totalAfter);
                const percentage = result.times(100).toString();
                const per = Number(percentage).toFixed(2)
                setPro(Number(per))

            } catch (e) {
                console.error(e)
                setMinted('')
                setPro(0)
            }

        })()
    }, [refresh])

    useEffect(() =>{
        if (!address || !walletProvider || chainId !== chain.chainId) {
            setMintType(null)
            return;
        }
        (async () => {
            const privider = new BrowserProvider(walletProvider);
            try {
                const signer = await privider.getSigner(address);
                const contract = new Contract(contractAddress, abi, signer)

                const arr = [
                    contract.checkFreeMint(address),
                    contract.price(),
                    contract.limitUserMintNum(),
                    contract.limitMint(address),
                ]
                const rests = await Promise.all(arr)
                setMintType(rests[0] ? MINT_TYPE_FREE : MINT_TYPE_NORMAL);

                setPrice( ethers.formatEther(rests[1]));
                setLimitMemberMint(rests[2].toString())
                setLimitMint(rests[3].toString())

                let remain = Number(rests[2].toString()) - Number(rests[3].toString())
                remain = remain < 0 ? 0 : remain;
                setNormalMintRemain(remain)
                setCount(remain)

                console.log(rests, 'normalMintRemain=' + remain)

            } catch (e) {
                console.error(e)
                setMintType(null);
                setPrice('')
                setLimitMemberMint('0')
                setLimitMint('0')
                setNormalMintRemain(0)
                setCount(0)
            }
        })()
    }, [address, walletProvider, chainId, refresh])

    const toGo = (url: string) =>{
        navigate(url)
    }

    const onCountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(normalMintRemain) <=0) {
            setCount(0)
            return;
        }
        let v = e.target.value;
        if (Number(v) <= 0) {
            setCount(1)
        } else if (Number(v) > Number(normalMintRemain)) {
            setCount(Number(normalMintRemain))
        } else {
            setCount(Number(v))
        }
    }

    const step = (type: string) => {
        // console.log("step", count, limitMemberMint)
        if (Number(normalMintRemain) <=0) {
            setCount(0)
            return;
        }
        if (type === 'add')  {
            Number(count) < Number(normalMintRemain) ? setCount(count+1) : setCount(Number(normalMintRemain))
        }
        if (type === 'plus') {
            Number(count) > 1 ? setCount(count-1) : setCount(1)
        }
    }

    const connect = () => {
        open()
    }

    const normalMint = async () => {
        if (!walletProvider) {
            return;
        }
        if (Number(count) <= 0) {
            api.error({
                message: 'You have exceeded the mint limit',
            });
            return;
        }
        store.dispatch(saveLoading(true))
        const privider = new BrowserProvider(walletProvider);
        try {
            const signer = await privider.getSigner(address);
            const contract = new Contract(contractAddress, abi, signer)
            const res = await contract.mint(count, {value: ethers.parseEther(BigNumber(price).times(count).toString())})
            await res.wait()
            console.log(res)
            setRefresh(Date.now())
            api.success({
                message: 'Mint Successfully',
            });
        } catch (e) {
            console.error(e)
            api.error({message: (e as Error).toString()})
        }
        store.dispatch(saveLoading(false))
    }

    const freeMint = async () => {
        if (!walletProvider) {
            return;
        }
        store.dispatch(saveLoading(true))
        const provider = new BrowserProvider(walletProvider);
        try {
            const signer = await provider.getSigner(address);
            const contract = new Contract(contractAddress, abi, signer)
            const res = await contract.freemint()
            await res.wait()
            console.log(res)
            setRefresh(Date.now())
            api.success({
                message: 'Mint Successfully',
            });
        } catch (e) {
            console.error(e)
            api.error({message: (e as Error).toString()})
        }
        store.dispatch(saveLoading(false))
    }

     const  addCommasToNumber =(number: string) =>{
        let numbB = Number(number)
         return numbB?.toLocaleString('en-US');

    }

    return <Layout>
        {
            loading && <Loading />
        }


        {contextHolder}
        <MainBox>
            <FirstLine>
                <LogoBox onClick={()=>toGo("/")}>
                    <img src={LogoMint.src} alt=""/>
                    {/*AILOONG*/}
                </LogoBox>
                {/*<img src={Logo} alt="" onClick={()=>toGo("/")}/>*/}
                <ConnectButton />
            </FirstLine>
            <BtmBox>
                <LftBox>
                    <TitleBox>
                        <TitleItem $isActive={!isBaby} onClick={() => toGo('/mint/great')}>Great Loong</TitleItem>
                        <TitleItem $isActive={isBaby} onClick={() => toGo('/mint/baby')}>Baby Loong</TitleItem>
                    </TitleBox>
                    {/* {
                        Number(pro) <= 25 && <TipBox>Less than 50%, let&apos;s work together!</TipBox>
                    }
                    {
                        Number(pro) > 25 &&  Number(pro) <=50 && <TipBox>Almost 50%, let&apos;s work together!</TipBox>
                    }
                    {
                        Number(pro) > 50 && <ProBox width={pro}>
                            <div className="top">
                                <div>TOTAL MINTED</div>
                                <div>{pro}% {addCommasToNumber(minted)}/{addCommasToNumber(total)}</div>
                            </div>
                            <div className="proOuter">
                                <div className="proInner" />
                            </div>
                        </ProBox>
                    } */}
                     <ProBox width={pro}>
                        <div className="top">
                            <div>TOTAL MINTED</div>
                            <div>{pro}% {addCommasToNumber(minted)}/{addCommasToNumber(total)}</div>
                        </div>
                        <div className="proOuter">
                            <div className="proInner" />
                        </div>
                    </ProBox>

                    <ArticleBox>
                        {
                            isBaby 
                            ? <div><strong>Baby Loong</strong>: Even though may just be a baby, but Baby Loong can still provide the holder with predictions and advice. Due to its limited power, it may not bring back abundant treasures from exploring in the cyberspace. Similar to the Great Loong, it can also periodically analyze the holder's fortune and help them ward off disasters, avoid misfortunes, and seek good fortune.</div>
                            : <div><strong>Great Loong</strong>:  An adult Loong spirit, rare in quantity, can provide the most comprehensive metaphysical predictions and advice for the holder. When exploring in the cyberspace, it can also grab more&better treasures. Periodically, the divine dragon spirit will automatically analyze the holder's fortune and help them ward off disasters, avoid misfortunes, and seek good fortune.</div>
                        }
                        <p>Discover the World of AILoong: A gnosis AI in the Digital Realm</p>
                        <div><strong>Step into the realm of Loong, an extraordinary ERC404 NFT will born based on the constellation, personality and feeling of the moment you pressed the button, bring lucky and fortune to the ethers of the blockchain. </strong><span>This collection presents 1,100 uniquely random AI NFTs, magical gnosis  AI especially for everyone the digital age.</span></div>
                        <p>In AILoong tradition meets innovation. As the vanguards of the ERC404 standard, these NFTs are not merely artistic renderings but are also imbued with the versatility of being both tradeable tokens and collectible gnosis AI art pieces. AILoong transcends the conventional, allowing each loong to live in two worlds: the fluidity of DEXs and the curated halls of NFT marketplaces.</p>
                        <p>Embrace the spirit of the mysterious gnosis AI, claim your AILoong, and make your mark in the new era of AI digital collectibles.</p>
                    </ArticleBox>
                    <SocialBox>
                        <Link href="/">
                            <img src={GlobalImg.src} alt=""/>
                        </Link>
                        <Link href="https://twitter.com/AIloongglobal" target="_blank" >
                            <img src={TwitterImg.src} alt=""/>
                        </Link>

                    </SocialBox>
                    <PublicBox>
                        <div>public</div>
                        <div>{limitMemberMint} per wallet * {price} ETH</div>
                    </PublicBox>
                </LftBox>
                <RhtBox>
                    <PhotoBox>
                        {isBaby ? <img src={''} alt="Baby Loong Picture"/> : <img src={DemoImg.src} alt="Great Loong Picture"/>}
                    </PhotoBox>
                    {mintType === MINT_TYPE_NORMAL && <RhtBtmBox>
                        <FlexLine>
                            <div>Price: {price} ETH</div>
                            <RhtInput>
                                <img src={LftImg.src} alt="" onClick={()=>step('plus')}/>
                                <input type="number" min={0} step={1} value={count} onChange={onCountChanged}/>
                                <img src={RhtImg.src} alt=""  onClick={()=>step('add')}/>
                            </RhtInput>
                        </FlexLine>
                    </RhtBtmBox>}


                    {mintType === MINT_TYPE_FREE && <MintBtn onClick={() => freeMint()}>Free Mint * {MINT_TYPE_FREE}</MintBtn>}
                    {mintType === MINT_TYPE_NORMAL && <MintBtn onClick={() => normalMint()}>Mint</MintBtn>}
                    {!mintType && <MintBtn onClick={() => connect()}>Connect Wallet</MintBtn>}

                </RhtBox>
            </BtmBox>
        </MainBox>
        <Modal isOpen={isModalOpenImport} onClose={() => setIsModalOpenImport(false)} title="Import code">
            <FormBox>
                <div>You need a code to participate. If you don’t have one, you can skip this step</div>
                <Input placeholder="Enter invite code" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)}></Input>
                <Button>Submit</Button>
            </FormBox>
        </Modal>
    </Layout>
}
