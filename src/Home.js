import React from "react";
import "./Home.css";
import Button from 'react-bootstrap/Button';



function Home() {
  return (

    <>
        <div className= "main1"> 
          <div className="main1-txt"> 
          <h1>식 물 추 천</h1>
          <Button id="mainbtn" variant="outline-secondary" href="/">설문시작</Button>
          </div>
        </div>

        <div className= "main2"> 
          <div className="main2-txt"> 
          <h1>식 물 호 텔</h1> 
          <Button id="mainbtn" variant="outline-secondary" href="/">이용하기</Button>
          </div>
        </div>

        <div className= "main3"> 
          <div className="main3-txt"> 
          <h1>커 뮤 니 티</h1>
          <Button id="mainbtn" variant="outline-secondary" href="/market">바로가기</Button>
          </div>
        </div>
    </>


  )
}


export default Home;