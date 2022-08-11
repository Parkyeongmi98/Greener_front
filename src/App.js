import React from "react";
import "./App.css";
import Home from "../src/Components/pages/Home";
import Login from "../src/Components/pages/Login";
import SignUp from "../src/Components/pages/SignUp";
import Todo from "./Todo";
import Navbarmenu from "./Components/Header/Navbarmenu";
import { Routes, Route} from "react-router-dom";
import Myplants from "./Components/pages/myplants/MyPlants";
import Scheduler from "./Components/pages/myplants/Scheduler";
import Market from "./Components/pages/board/Market";
import Talk from "./Components/pages/board/Talk";
import MyplantsWrite from "./Components/pages/myplants/MyplantsWrite";
import Planner from "./Components/pages/myplants/Planner";
import FAQ from "../src/Components/pages/FAQ"
import PlantsNotice from "./Components/pages/myplants/PlantsNotice";
import MarketWrite from "./Components/pages/board/MarketWrite";
import MarketDetail from "./Components/pages/board/MarketDetail";
import MarketChange from "./Components/pages/board/MarketChange";
import SchedulerDetail from "./Components/pages/myplants/SchedulerDetail";



function App() {
  return (

    <>
    <header><Navbarmenu /></header>
    
    <body>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/myplants" element={<Myplants />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/market" element={<Market />} />
        <Route path="/talk" element={<Talk />} />
        <Route path="/myplantswrite" element={<MyplantsWrite />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/plantsnotice" element={<PlantsNotice />} />
        <Route path="/marketwrite" element={<MarketWrite />} />
        <Route path="/marketdetail/:boardsId" element={<MarketDetail />} />
        <Route path="/marketchange/:boardsId" element={<MarketChange />} />
        <Route path="/schedulerdetail/:myPlantsId" element={<SchedulerDetail />} />
      </Routes>
      </body>
    </>


  )
}


export default App;