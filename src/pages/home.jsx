import styled from "styled-components";
import BgImg from "../assets/demo/home-bg.jpg";
import LogoImg from "../assets/demo/logo.svg";
import LftImg from "../assets/demo/left-bottom.png";
import RhtImg from "../assets/demo/right-bottom.png";

const BgBox = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #eeeae7;
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
    max-width: 1800px;
    .bg{
        width: 100%;
    }
`

const LogoBox = styled.div`
    position: absolute;
    left: 40px;
    top: 40px;
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
    width: 660px;
    height: 140px;
    background: #b14044;
    box-shadow: 0 0 4px #999;
    right: 5vw;
    border-radius: 15px;
    bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .rht{
        position: absolute;
        left: 0;
        bottom: 0;
    }
`

const RhtInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .lft{
       font-size: 25px; 
    }
    .top{
        color: #e5959a;
    }
`
const BtnRht = styled.div`
    width: 170px;
    height: 80px;
    text-transform: uppercase;
    margin: 0 35px;
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: center;
    color: #6b6c6e;
    font-size: 12px;
    border-radius: 15px;
`



export default function Home(){
    return <BgBox>
        <LogoBox>
            <img src={LogoImg} alt=""/>
        </LogoBox>
        <InnerBox>
            <img src={BgImg} alt="" className="bg"/>


        </InnerBox>
        <Leftbox>
            <img src={LftImg} alt="" className="lft" />
            <span>Mirai</span>
        </Leftbox>
        <RhtBox>
            <img src={RhtImg} className="rht" alt=""/>
            <RhtInner>
                <div className="lft">
                    <div className="top">ERC404 PFP</div>
                    <div className="price">10,000 YUME</div>
                </div>
                <BtnRht>
                    Mint Now
                </BtnRht>
            </RhtInner>
        </RhtBox>
    </BgBox>
}
