import styled from "styled-components";
import DemoImg from "../assets/demo.jpg";
import TwitterImg from "../assets/demo/twitter.png";
import GlobalImg from "../assets/demo/global.png";
import LftImg from "../assets/demo/minus.png";
import RhtImg from "../assets/demo/plus.png";
import BgImg from "../assets/demo/bg.png";
import ConnectButton from "../components/ConnectButton.jsx";
import {useWeb3Modal, useWeb3ModalAccount} from '@web3modal/ethers/react'
import {useWeb3ModalProvider} from "@web3modal/ethers/react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import abi from '../assets/abi/loong-abi.json'
import {BrowserProvider, Contract} from "ethers";
import {chain, contractAddress} from "../common/config.js";
import Loading from "../components/loading.jsx";
import {useSelector} from "react-redux";
import {notification} from 'antd';

const Layout = styled.div`

    width: 100%;
    min-height: 100vh;
    background:#070404 url(${BgImg});
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
    font-size: 30px;
    color: #fff;
    font-weight: 700;
`

const ProBox = styled.div`
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
    p{
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
    width: 100px;
    background: #83271c;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    height: 40px;
    font-size: 23px;
    border-radius: 10px;
`


const MAX_COUNT = 5;
const MINT_TYPE_FREE = '2'
const MINT_TYPE_NORMAL = '1'

export default function Mint(){
    const { address, chainId,  isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()
    const [count, setCount] = useState(1)
    const navigate = useNavigate()
    const [mintType, setMintType] = useState(null)
    const { open } = useWeb3Modal();
    const loading = useSelector(store => store.loading);
    const [api, contextHolder] = notification.useNotification();

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
                const res = await contract.checkFreeMint(address)
                setMintType(res ? MINT_TYPE_FREE : MINT_TYPE_NORMAL);
                console.log(res)
            } catch (e) {
                console.error(e)
                setMintType(null);
            }
        })()
    }, [address, walletProvider, chainId])

    const toGo = (url) =>{
        navigate(url)
    }

    const onCountChanged = (e) => {
        let v = e.target.value;
        if (Number(v) <= 0) {
            setCount(1)
        } else if (Number(v) > MAX_COUNT) {
            setCount(MAX_COUNT)
        } else {
            setCount(v)
        }
    }

    const step = (type) => {
        if (type === 'add')  {
            Number(count) < MAX_COUNT ? setCount(count+1) : setCount(MAX_COUNT)
        }
        if (type === 'plus') {
            Number(count) > 1 ? setCount(count-1) : setCount(1)
        }
    }

    const connect = () => {
        open()
    }

    const normalMint = () => {


    }

    const test =() =>{
        api.success({
            message: 'Please install wallet',
        });
    }

    const freeMint = () => {

    }

    return <Layout>
        {
            loading && <Loading />
        }


        {contextHolder}
        <MainBox>
            <FirstLine>
                <LogoBox onClick={()=>toGo("/")}>
                    {/*<img src={LogoImg} alt=""/>*/}
                    LOONG
                </LogoBox>
                {/*<img src={Logo} alt="" onClick={()=>toGo("/")}/>*/}
                <ConnectButton />
            </FirstLine>
            <BtmBox>
                <LftBox>
                    <TitleBox>YUME</TitleBox>
                    <ProBox width="40">
                        <div className="top">
                            <div>TOTAL MINTED</div>
                            <div>27.00% 1800/6666</div>
                        </div>
                        <div className="proOuter">
                            <div className="proInner" />
                        </div>
                    </ProBox>
                    <ArticleBox>
                        <p>Discover the World of YUME: A Samurai Saga in the Digital Realm</p>
                        <p> Step into the realm of YUME, an extraordinary ERC404 NFT project where the legacy of samurai warriors is reborn within the ethers of the blockchain. This collection presents 10,000 uniquely crafted samurai NFTs, each bearing the soul of the ancient warrior class, now reimagined for the digital age. </p>
                        <p> In YUME, tradition meets innovation. As the vanguards of the ERC404 standard, these NFTs are not merely artistic renderings but are also imbued with the versatility of being both tradeable tokens and collectible art pieces. YUME transcends the conventional, allowing each samurai to live in two worlds: the fluidity of DEXs and the curated halls of NFT marketplaces. </p>
                        <p>Embrace the spirit of the samurai, claim your YUME, and make your mark in the new era of digital collectibles.</p>
                    </ArticleBox>
                    <SocialBox>
                        <img src={GlobalImg} alt=""/>
                        <img src={TwitterImg} alt=""/>
                    </SocialBox>
                    <PublicBox>
                        <div>public</div>
                        <div>5 Per Wallet • 0.03 ETH</div>
                    </PublicBox>
                </LftBox>
                <RhtBox>
                    <PhotoBox>
                        <img src={DemoImg} alt=""/>
                    </PhotoBox>
                    <RhtBtmBox>
                        <FlexLine>
                            <div>Price: 0.03 ETH</div>
                            <RhtInput>
                                <img src={LftImg} alt="" onClick={()=>step('plus')}/>
                                <input type="number" min={0} step={1} value={count} onChange={onCountChanged}/>
                                <img src={RhtImg} alt=""  onClick={()=>step('add')}/>
                            </RhtInput>
                        </FlexLine>
                    </RhtBtmBox>

                    {mintType === MINT_TYPE_FREE && <MintBtn onClick={() => freeMint()}>Free Mint</MintBtn>}
                    {mintType === MINT_TYPE_NORMAL && <MintBtn onClick={() => normalMint()}>Mint</MintBtn>}
                    {!mintType && <MintBtn onClick={() => connect()}>Connect Wallet</MintBtn>}

                </RhtBox>
            </BtmBox>
        </MainBox>

    </Layout>
}
