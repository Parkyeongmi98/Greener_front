import axios from "axios";
import React, { useState, useEffect } from "react";
import MyplantsTab from "./MyPlantsTab";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from "react-bootstrap";

const MyPlantsList = () => {
  
  const [myPlantsList, setMyPlantsList] = useState([]);
  const userId = localStorage.getItem("id")
  console.log(userId)
  console.log(myPlantsList.length)
  
  useEffect(() => {

    const getMyPlantsList = async () => {
      axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
      const {data} = await axios.get(`/auth/${userId}/myplants`)
      console.log(data)
      return data
    }
    getMyPlantsList().then(result => setMyPlantsList(result));
}, [])

  return (
    <div style={{marginLeft: "2%", marginRight: "2%"}}>
    <MyplantsTab />
     
        <div
        style={{
          width: "100%",
          display: "grid",
          marginTop: "2%",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
    {myPlantsList.map((data, id) => (

    <div key={id}
        style={{display: "flex", border: "1px solid", borderColor: "#b9b9b9", borderRadius: "20px", padding: "2%", width: "95%",
                height: "200px", fontFamily: "Jua", marginLeft: "2%", marginRight: "2%", marginBottom: "2%"
                }}
        >
        <div className="img">
            <img src={data.img} alt={data.fileName} style={{width: "90%", height: "100%"}} />
        </div>
        <div className="text"
            style={{width:  "70%", marginTop: "3%", marginLeft: "1%"}}>
            <div style={{fontSize: "35px", color: "#2d2d2d"}}>{data.name}</div>
            <div style={{fontSize: "25px", color: "#646464", marginTop: "3%"}}>{data.bornDate2}</div>
        </div>
      
      <div className="mb-2"
        style={{}}>
        {['end'].map((direction) => (
          <DropdownButton
            key={direction}
            id={`dropdown-button-drop-${direction}`}
            drop={direction}
            variant="Link"
          >
            <Dropdown.Item href={`/myplantsdetail/${data.id}`} style={{width: "100px"}}>상세보기</Dropdown.Item>
            <Dropdown.Item href={`/diary/${data.id}`} style={{width: "100px"}}>다이어리</Dropdown.Item>

          </DropdownButton>
        ))}
          <a href={`/diarywrite/${data.id}`} ><i class="fa-solid fa-book" style={{color: "#9b9b9b", padding: "50px 5px", fontSize: "35px"}}></i></a>
      </div>
  
    </div>
    ))}
    </div>

</div>

)
}

export default MyPlantsList;