import React from "react";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Todo from "./Todo";
import Navbarmenu from "./Components/Header/Navbarmenu";
import { Routes, Route} from "react-router-dom";
import Myplants from "./pages/MyPlants";
import Plan from "./pages/Plan";
import Scheduler from "./pages/Scheduler";
import Market from "./pages/Market";
import Talk from "./pages/Talk";



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
        <Route path="/plan" element={<Plan />} />
        <Route path="/market" element={<Market />} />
        <Route path="/talk" element={<Talk />} />
      </Routes>
      </body>
    </>


  )
}


export default App;