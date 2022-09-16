import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function PlantsDetail() {

    const [plants, setPlants] = useState([]);

    const {id} = useParams();

    useEffect(() => {
      
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.get(`/api/v1/plants/${id}/detail`)
        
        .then((response)  => { 
            setPlants(response.data);
            console.log(response)
          
        })
    }, [])

    return(
        <div style={{marginLeft: "5%", marginTop: "3%", color: "#454545", fontFamily: "Nanum Gothic Coding"}}>
        <h1 style={{fontSize: "50px"}}>식물 사전 <i class="fa-solid fa-book" style={{fontSize : "50px"}}></i></h1><br/>
        <div
        style={{
          width: "100%",
          display: "grid",

          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        {plants &&(
            <div className="img">
            <img src={plants.imgUrl} alt={plants.fileName} style={{width: "400px", height: "600px", marginTop: "10%"}}/><br/>
            </div>
        )}

        {plants &&(
        <div className="dataform" style={{fontSize: "25px", marginLeft: "4%"}}>
            {/* <img src={plants.imgUrl} alt={plants.fileName} style={{width: "400px", height: "400px", marginBottom: "30px"}}/><br/> */}
            <div style={{display: "flex"}}><h5 style={{marginTop: "25px", fontSize: "25px"}}>이 름 &nbsp;</h5><input value={plants.name} style={{width: "90%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}/></div>
            <div style={{display: "flex"}}><h5 style={{marginTop: "30px", fontSize: "25px"}}>장 소 &nbsp;</h5><textarea value={plants.place} style={{width: "90%", height: "100px", marginBottom: "2%", padding: "20px 20px"}}/></div>
            <div style={{display: "flex"}}><h5 style={{marginTop: "55px", fontSize: "25px"}}>햇 빛 &nbsp;</h5><textarea value={plants.sunshine} style={{width: "90%", height: "150px", marginBottom: "2%", padding: "20px 20px"}}/></div>
            <div style={{display: "flex"}}><h5 style={{marginTop: "30px", fontSize: "25px"}}>온 도 &nbsp;</h5><textarea value={plants.temperature} style={{width: "90%", height: "100px", marginBottom: "2%", padding: "20px 20px"}}/></div>
            <div style={{display: "flex"}}><h5 style={{marginTop: "55px", fontSize: "25px"}}>수 분 &nbsp;</h5><textarea value={plants.fallWater} style={{width: "90%", height: "150px", marginBottom: "2%", padding: "20px 20px"}}/></div>
            <div style={{display: "flex"}}><h5 style={{marginTop: "55px", fontSize: "25px"}}>&nbsp;TIP &nbsp;&nbsp;</h5><textarea value={plants.tip} style={{width: "800px", height: "150px", padding: "20px 20px"}}/></div>   
        </div>
         )}

        </div>
        <Button href="/plantsinfo" variant="outline-secondary" style={{marginLeft: "2%", marginBottom: "5%"}}>뒤로가기</Button>
    </div>
    ) 
} 

export default PlantsDetail


