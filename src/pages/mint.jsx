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
import {BrowserProvider, Contract, ethers} from "ethers";
import {chain, contractAddress} from "../common/config.js";
import Loading from "../components/loading.jsx";
import {useSelector} from "react-redux";
import {notification} from 'antd';
import store from "../store/index.js";
import {saveLoading} from "../store/reducer.js";
import BigNumber from "bignumber.js";

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
    width: 130px;
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
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const [mintType, setMintType] = useState(null)
    const [minted, setMinted] = useState('')
    const [total, setTotal] = useState('')
    const [price, setPrice] = useState('')
    const [limitMemberMint, setLimitMemberMint] = useState('0')
    const [limitMint, setLimitMint] = useState('0')
    const [normalMintRemain, setNormalMintRemain] = useState(0)
    const { open } = useWeb3Modal();
    const loading = useSelector(store => store.loading);
    const [api, contextHolder] = notification.useNotification();
    const [pro,setPro] = useState(0);
    const [refresh, setRefresh] = useState(0)

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
                    contract.minted(),
                    contract.totalSupply(),
                    contract.price(),
                    contract.limitUserMintNum(),
                    contract.limitMint(address),
                ]
                const rests = await Promise.all(arr)
                setMintType(rests[0] ? MINT_TYPE_FREE : MINT_TYPE_NORMAL);
                let mintedB = rests[1].toString();
                setMinted(mintedB);
                let totalB = ethers.formatEther(rests[2])
                setTotal(totalB);
                setPrice( ethers.formatEther(rests[3]));
                setLimitMemberMint(rests[4].toString())
                setLimitMint(rests[5].toString())

                let remain = Number(rests[4].toString()) - Number(rests[5].toString())
                remain = remain < 0 ? 0 : remain;
                setNormalMintRemain(remain)
                setCount(remain)

                let totalBN = new BigNumber(totalB)
                let MintedBN = new BigNumber(mintedB)
                const result = MintedBN.dividedBy(totalBN);
                const percentage = result.times(100).toString();
                const per = Number(percentage).toFixed(2)
                setPro(per)

                console.log(rests, 'normalMintRemain=' + remain)

            } catch (e) {
                console.error(e)
                setMintType(null);
                setMinted('')
                setTotal('')
                setPrice('')
                setLimitMemberMint('0')
                setLimitMint('0')
                setNormalMintRemain(0)
                setCount(0)
            }
        })()
    }, [address, walletProvider, chainId, refresh])

    const toGo = (url) =>{
        navigate(url)
    }

    const onCountChanged = (e) => {
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
            setCount(v)
        }
    }

    const step = (type) => {
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
            api.error({message: e.toString()})
        }
        store.dispatch(saveLoading(false))
    }

    const freeMint = async () => {

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
            api.error({message: e.toString()})
        }
        store.dispatch(saveLoading(false))
    }

     const  addCommasToNumber =(number) =>{
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
                    {/*<img src={LogoImg} alt=""/>*/}
                    AILOONG
                </LogoBox>
                {/*<img src={Logo} alt="" onClick={()=>toGo("/")}/>*/}
                <ConnectButton />
            </FirstLine>
            <BtmBox>
                <LftBox>
                    <TitleBox>AILOONG</TitleBox>
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
                        <p>Discover the World of AILoong: A gnosis AI in the Digital Realm</p>
                        <p>Step into the realm of Loong, an extraordinary ERC404 NFT will born based on the constellation, personality and feeling of the moment you pressed the button, bring lucky and fortune to the ethers of the blockchain. This collection presents 1,100 uniquely random AI NFTs, magical gnosis  AI especially for everyone the digital age.</p>
                        <p>In AILoong tradition meets innovation. As the vanguards of the ERC404 standard, these NFTs are not merely artistic renderings but are also imbued with the versatility of being both tradeable tokens and collectible gnosis AI art pieces. AILoong transcends the conventional, allowing each loong to live in two worlds: the fluidity of DEXs and the curated halls of NFT marketplaces.</p>
                        <p>Embrace the spirit of the mysterious gnosis AI, claim your AILoong, and make your mark in the new era of AI digital collectibles.</p>
                    </ArticleBox>
                    <SocialBox>
                        <img src={GlobalImg} alt=""/>
                        <img src={TwitterImg} alt=""/>
                    </SocialBox>
                    <PublicBox>
                        <div>public</div>
                        <div>{limitMemberMint} per wallet * {price} ETH</div>
                    </PublicBox>
                </LftBox>
                <RhtBox>
                    <PhotoBox>
                        <img src={DemoImg} alt=""/>
                    </PhotoBox>
                    {mintType === MINT_TYPE_NORMAL && <RhtBtmBox>
                        <FlexLine>
                            <div>Price: {price} ETH</div>
                            <RhtInput>
                                <img src={LftImg} alt="" onClick={()=>step('plus')}/>
                                <input type="number" min={0} step={1} value={count} onChange={onCountChanged}/>
                                <img src={RhtImg} alt=""  onClick={()=>step('add')}/>
                            </RhtInput>
                        </FlexLine>
                    </RhtBtmBox>}


                    {mintType === MINT_TYPE_FREE && <MintBtn onClick={() => freeMint()}>Free Mint</MintBtn>}
                    {mintType === MINT_TYPE_NORMAL && <MintBtn onClick={() => normalMint()}>Mint</MintBtn>}
                    {!mintType && <MintBtn onClick={() => connect()}>Connect Wallet</MintBtn>}

                </RhtBox>
            </BtmBox>
        </MainBox>

    </Layout>
}
