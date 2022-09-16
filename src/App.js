import React from "react";
import "./App.css";
import Home from "../src/Components/pages/Home";
import Login from "../src/Components/pages/Login";
import SignUp from "../src/Components/pages/SignUp";
import Navbarmenu from "./Components/Header/Navbarmenu";
import { Routes, Route } from "react-router-dom";
import Myplants from "./Components/pages/myplants/MyPlants";
import Market from "./Components/pages/board/Market";
import Talk from "./Components/pages/board/Talk";
import MyplantsWrite from "./Components/pages/myplants/MyplantsWrite";
import Planner from "./Components/pages/myplants/Planner";
import FAQ from "../src/Components/pages/FAQ"
import MarketWrite from "./Components/pages/board/MarketWrite";
import MarketDetail from "./Components/pages/board/MarketDetail";
import MarketChange from "./Components/pages/board/MarketChange";
import TalkDetail from "./Components/pages/board/TalkDetail";
import TalkWrite from "./Components/pages/board/TalkWrite";
import TalkChange from "./Components/pages/board/TalkChange";
import Message from "./Components/pages/Message";
import PlantsInfo from "./Components/pages/plants/PlantsInfo";
import PlantsDetail from "./Components/pages/plants/PlantsDetail";
import MyPlantsList from "./Components/pages/myplants/MyPlantsList";
import MyPlantsDetail from "./Components/pages/myplants/MyPlantsDetail";
import MyPlantsChange from "./Components/pages/myplants/MyPlantsChange";
import Diary from "./Components/pages/myplants/Diary";
import DiaryDetail from "./Components/pages/myplants/DiaryDetail";
import DiarysWrite from "./Components/pages/myplants/DiaryWrite";
import KakaoLogin from "./Components/pages/KakaoLogin";
import Map from "./Components/pages/Map";
import NaverLogin from "./Components/pages/NaverLogin";


function App() {
  return (

    <>
    <header><Navbarmenu /></header>
    
    <body>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myplants" element={<Myplants />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/market" element={<Market />} />
        <Route path="/talk" element={<Talk />} />
        <Route path="/myplantswrite" element={<MyplantsWrite />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/marketwrite" element={<MarketWrite />} />
        <Route path="/marketdetail/:boardsId" element={<MarketDetail />} />
        <Route path="/marketchange/:boardsId" element={<MarketChange />} />
        <Route path="/talkwrite" element={<TalkWrite />} />
        <Route path="/talkdetail/:boardsId" element={<TalkDetail />} />
        <Route path="/talkchange/:boardsId" element={<TalkChange />} />
        <Route path="/message" element={<Message />} />
        <Route path="/plantsinfo" element={<PlantsInfo />} />
        <Route path="/plantsdetail/:id" element={<PlantsDetail />} />
        <Route path="/myplantslist" element={<MyPlantsList />} />
        <Route path="/myplantsdetail/:myPlantsId" element={<MyPlantsDetail />} />
        <Route path="/myplantschange/:myPlantsId" element={<MyPlantsChange />} />
        <Route path="/diary/:myPlantsId" element={<Diary />} />
        <Route path="/diarydetail/:diaryId" element={<DiaryDetail />} />
        <Route path="/diarywrite/:myPlntsId" element={<DiarysWrite />} />
        <Route path="/oauth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/oauth/naver/callback" element={<NaverLogin />} />
        <Route path="/map" element={<Map />} />
      </Routes>
      </body>
    </>


  )
}


export default App;