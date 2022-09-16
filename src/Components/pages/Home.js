import React, {useState} from "react";
import "./css/Home.css";
import Button from 'react-bootstrap/Button';
import ChatModal from "./ChatModal";
import styled from "styled-components";

const Home = () => {
 
  const [chatModalOn, setChatModalOn] = useState(false)

  return (

    <>
        <div className= "main1"> 
          <div className="main1-txt"> 
          <h1>식 물 검 색</h1>
          <Button id="mainbtn" variant="outline-secondary" href="/plantsinfo">검색하기</Button>
          </div>
        </div>

        <div className= "main3"> 
          <div className="main3-txt"> 
          <h1>커 뮤 니 티</h1>
          <Button id="mainbtn" variant="outline-secondary" href="/market">바로가기</Button>
          </div>
        </div>

    <PositionContainer>
      <TopButton onClick={() => setChatModalOn(true)}>
      <i class="fa-sharp fa-solid fa-robot" style={{fontSize: "50px"}}></i>     
      </TopButton>
    </PositionContainer>

        <ChatModal show={chatModalOn} onHide={() => setChatModalOn(false)} />

    </>


  )
}


export default Home;

const PositionContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 80%;
  z-index: 1000;

`;

const TopButton = styled.button.attrs(() => ({
  type: 'button',
  title: '맨 위로 가기',
  'aria-label': '맨 위로 가기'
}))`
position: absolute;
top: 80%;
right: 3%;
color: #434343;
border: none;
background-color: transparent;
`