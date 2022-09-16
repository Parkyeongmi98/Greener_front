import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";


function MyPlantsDetail() {

    const [data, setData] = useState([]);
    const {myPlantsId} = useParams();

    const [plants, setPlants] = useState([]);

    useEffect(() => {
      
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.get(`/api/v1/my-plants/${myPlantsId}/detail`)
 
        .then((response)  => { 
          setData(response.data);
          console.log(response)
          const PlantId = response.data.plantsId
          console.log(PlantId)

          axios.get(`/api/v1/plants/${PlantId}/detail`)
          .then((response)  => { 
            setPlants(response.data);
            console.log(response.data)
              
            })
        })
        

        }, [])
    

    function Delete() {
      if(window.confirm("정말 삭제하시겠습니까?")) {
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.delete(`/api/v1/my-plants/${myPlantsId}`)
          .then(
          window.location.href = "/myplantslist",
          alert('삭제 되었습니다.')
        )}
        else {
          alert("취소합니다.");
        }
      }
      

    return (
      <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "4%", marginBottom: "4%", border: "solid", borderColor: "gray", borderRadius: "20px", fontFamily: "Nanum Gothic Coding", color: "#454545"}}>        
      <div className="w-full h-full flex justify-center items-center">
      <h2 style={{marginTop: "3%", marginLeft: "5%", fontSize: "40px", marginBottom: "3%"}}> 내 식물 상세페이지</h2><hr/>
        {data && (
            <>
            <div className="dataform"
            style={{fontSize: "25px", marginLeft: "5%"}}>
                &nbsp;<img src={data.img} alt={data.fileName} style={{marginLeft: "25%", marginBottom: "3%", width:"40%", height:"50%" }}/><br/>
                <div style={{display: "flex"}}><h5 style={{marginTop: "28px", fontSize: "25px"}}>이 름 &nbsp;</h5><input 
                      style={{width: "80%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}
                      value={data.name}/></div>
                <div style={{display: "flex"}}><h5 style={{marginTop: "28px", fontSize: "25px"}}>등록일&nbsp;</h5><input value={data.createDate}
                style={{width: "80%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}/></div>
            </div>
            </>
        )}


            {plants &&(
            <div className="dataform" style={{fontSize: "25px", marginLeft: "5%"}}>
                <div style={{display: "flex"}}><h5 style={{marginTop: "55px", fontSize: "25px"}}>장 소 &nbsp;</h5><textarea value={plants.place} style={{width: "80%", height: "150px", marginBottom: "2%", padding: "20px 20px"}}/></div>
                <div style={{display: "flex"}}><h5 style={{marginTop: "55px", fontSize: "25px"}}>햇 빛 &nbsp;</h5><textarea value={plants.sunshine} style={{width: "80%", height: "150px", marginBottom: "2%", padding: "20px 20px"}}/></div>
                <div style={{display: "flex"}}><h5 style={{marginTop: "35px", fontSize: "25px"}}>온 도 &nbsp;</h5><textarea value={plants.temperature} style={{width: "80%", height: "100px", marginBottom: "2%", padding: "20px 20px"}}/></div>
                <div style={{display: "flex"}}><h5 style={{marginTop: "55px", fontSize: "25px"}}>수 분 &nbsp;</h5><textarea value={plants.fallWater} style={{width: "80%", height: "150px", marginBottom: "2%", padding: "20px 20px"}}/></div>
                <div style={{display: "flex"}}><h5 style={{marginTop: "55px", fontSize: "25px"}}>&nbsp;TIP &nbsp;&nbsp;</h5><textarea value={plants.tip} style={{width: "80%", height: "150px", padding: "20px 20px"}}/></div><br/>   
            </div>
             )}
 


            <Button href="/myplantslist" variant="outline-secondary"
            style={{marginLeft: "32%", marginBottom: "3%"}}>뒤로가기</Button>
            <Button href={`/myplantschange/${myPlantsId}`} variant="outline-success"  style={{marginBottom: "3%"}}>&nbsp; 수정 &nbsp;</Button>
            <Button onClick={() => Delete(data.myPlantsId)} variant="outline-danger" style={{marginBottom: "3%"}}>&nbsp; 삭제 &nbsp;</Button>


        </div>


      </div>
        
    )
}

export default MyPlantsDetail;