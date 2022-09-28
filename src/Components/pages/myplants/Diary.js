import axios from "axios";
import React, { useState, useEffect } from "react";
import MyplantsTab from "./MyPlantsTab";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Diary = () => {
  
  const [diary, setDiary] = useState([]);
  const myPlantsId = useParams().myPlantsId;

  console.log(diary)
  
  useEffect(() => {

    const getDiary = async () => {
      axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
      const {data} = await axios.get(`/api/v1/diary/${myPlantsId}/diary`)
      console.log(data)
      return data
    }
    getDiary().then(
        result => setDiary(result)
    );
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
          gridTemplateColumns: "1fr"
        }}
      >
    {diary.map((data, id) => (

        <div key={id}
        style={{display: "flex", border: "1px solid", borderColor: "#b9b9b9", borderRadius: "20px", padding: "1%", width: "90%",
                height: "380px", fontFamily: "Jua", marginLeft: "5%", marginRight: "5%", marginBottom: "2%"
                }}
        >
        <div className="img"
        style={{width: "35%"}}>
            <img src={data.img} alt={data.fileName} style={{width: "90%", height: "98%"}} />
        </div>
        <div className="text"
            style={{width:  "50%", marginTop: "2%", marginLeft: "1%"}}>
            <textarea style={{fontSize: "30px", color: "#2d2d2d", width: "100%", height: "200px", padding: "20px 20px"}}>{data.content}</textarea>
            <div style={{fontSize: "27px", color: "#ff5e52", marginTop: "1%", marginLeft: "2%"}}>AI가 측정한 내식물 현재 건강상태 : {data.result} 점</div>
            <div style={{fontSize: "25px", color: "#646464", marginTop: "3%", marginLeft: "2%"}}>{data.datetime}</div>

        </div>

        <div style={{width: "13%"}}>
            <Button href="/myplantslist" variant="outline-secondary"
            style={{marginLeft: "30%", marginBottom: "10%", marginTop: "40%"}}>&nbsp; 뒤로 &nbsp;</Button>
            <Button href={`/diarydetail/${data.id}`} variant="outline-success"  style={{marginLeft: "30%", marginBottom: "5%"}}>&nbsp; 수정 &nbsp;</Button>


        </div>
      
    </div>
    ))}


    </div>

</div>

)
}

export default Diary;