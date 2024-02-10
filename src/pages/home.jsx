import styled from "styled-components";
import BgImg from "../assets/home-bg.jpg";
import LogoImg from "../assets/demo/logo.svg";
import LftImg from "../assets/demo/left-bottom.png";
import RhtImg from "../assets/demo/right-bottom.png";
import {useNavigate} from "react-router-dom";



const BgBox = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #fdfaf1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`
const InnerBox = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    position: relative;
    margin: 0 auto;
    max-width: 1600px;
    .bg{
        width: 100%;
    }
`

const LogoBox = styled.div`
    position: absolute;
    left: 40px;
    top: 40px;
    z-index: 99;
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

const Leftbox = styled.div`
    position: absolute;
    background: #fff;
    width: 330px;
    height: 140px;
    box-shadow: 0 0 4px #999;
    border-radius: 15px;
    left: 3vw;
    bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span{
        color: rgba(0,0,0,0.85);
        font-size: 25px;
        padding-right: 20px;
    }
    .lft{
        position: absolute;
        left: 0;
        bottom: 0;
    }
    @media (max-width: 1100px) {
        display: none;
    }
`

const RhtBox = styled.div`
    position: absolute;
    //width: 660px;
    padding:20px;

    background: #83271c;
    box-shadow: 0 0 4px #999;
    right:0;
    border-radius: 15px;
    top: 25vw;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    .rht{
        position: absolute;
        left: 0;
        bottom: 0;
    }
    @media (max-width: 1440px) {
        top:28vw;
    }
    @media (max-width: 1100px) {
        height: 20vw;
        width:80vw;
        bottom:20vw;
        top:auto;
        justify-content: center;
        right: 10vw;
        .rht{
            width: 38vw;
        }
    }
`

const RhtInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    padding: 0 30px;
    .lft{
       font-size: 25px; 
    }
    .top{
        color: #e5959a;
        display: flex;
        flex-direction: column;
        
    }
    
    .center,.com{
        text-align: center;
    }
    @media (max-width: 1100px) {
        .lft{
            font-size: 13px;
        }
        .top{
            margin-bottom: 10px;
        }
    }
`
const BtnRht = styled.div`
    width: 120px;
    height:45px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: center;
    color: #6b6c6e;
    font-size: 12px;
    border-radius: 15px;
    cursor: pointer;

    @media (max-width: 1100px) {
        width: 26vw;
        height: 13vw;
       margin: 0 15px;
    }
`



export default function Home(){
    const navigate = useNavigate()

    const toGo = (url) =>{
        navigate(url)
    }

    return <BgBox>
        <LogoBox onClick={()=>toGo("/")}>
            {/*<img src={LogoImg} alt=""/>*/}
            AILOONG
        </LogoBox>
        <InnerBox>
            <img src={BgImg} alt="" className="bg"/>


        </InnerBox>
        {/*<Leftbox>*/}
        {/*    <img src={LftImg} alt="" className="lft" />*/}
        {/*    <span>Mirai</span>*/}
        {/*</Leftbox>*/}
        <RhtBox>
            {/*<img src={RhtImg} className="rht" alt=""/>*/}
            <RhtInner>
                <div className="lft">
                    <div className="top">
                        <span>ERC404 AI Gnosis</span><span className="center"> 1100 Loong</span>
                    </div>
                    <div className="com">Coming  Soon</div>
                </div>


            </RhtInner>
            {/*<RhtInner>*/}
            {/*    <div className="lft">*/}
            {/*        <div className="top">ERC404 PFP</div>*/}
            {/*        <div className="price">10,000 YUME</div>*/}
            {/*    </div>*/}
            {/*    <BtnRht onClick={()=>toGo("/mint")}>*/}
            {/*        Mint Now*/}
            {/*    </BtnRht>*/}
            {/*</RhtInner>*/}
        </RhtBox>
    </BgBox>
}
