import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";

function MarketDetail() {

    const id = localStorage.getItem("id");
    const [data, setData] = useState([]);
    const {boardsId} = useParams();

    useEffect(() => {
       
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.get(`/api/v1/boards/${boardsId}/detail`)
        
        .then((response)  => { 
          setData(response.data);
          console.log(response)
        })
        
      }, [])
    
    

      function Delete() {
        if(window.confirm("정말 삭제하시겠습니까?")) {
          axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
          axios.delete(`/api/v1/boards/${boardsId}`)
            .then(
            window.location.href = "/talk",
            alert('삭제 되었습니다.')
          )}
          else {
            alert("취소합니다.");
          }
        }

    

    return (
      <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "4%", marginBottom: "4%", border: "solid", borderColor: "gray", borderRadius: "20px", fontFamily: "Nanum Gothic Coding", color: "#454545"}}>       
        <div className="w-full h-full flex justify-center items-center">
        <h2 style={{marginTop: "3%", marginLeft: "5%", fontSize: "40px", marginBottom: "3%"}}>🖊️ 게시물 상세페이지 </h2><hr/>
        {data && (
          
            <>
            <div className="dataform"
            style={{fontSize: "25px", marginLeft: "5%", marginBottom: "3%"}}>
                제 목 &nbsp;<input value={data.title}
                style={{width: "80%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea value={data.content}
                style={{width: "80%", height: "400px", marginBottom: "2%", padding: "20px 20px"}}/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src={data.img} alt={data.fileName} style={{marginBottom: "2%", width:"50%", height:"40%" }}/><br/><br/>
                등록자 &nbsp;<input value={data.nickName}
                style={{width: "80%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}/><br/>
                등록일 &nbsp;<input value={data.createDate}
                style={{width: "80%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}/><br/>
            </div>
                <Button href="/talk" variant="outline-secondary"
                style={{marginLeft: "5%", marginBottom: "3%"}}>뒤로가기</Button>
                {data.userId == id && (
                <>
                <Button href={`/talkchange/${boardsId}`} variant="outline-success" style={{marginBottom: "3%"}}>&nbsp; 수정 &nbsp;</Button>
                <Button onClick={() => Delete(data.boardsId)} variant="outline-danger" style={{marginBottom: "3%"}}>&nbsp; 삭제 &nbsp;</Button>
                </>
                )}
            </>         
            

            )
        }
        </div>
      </div>
        
    )
}

export default MarketDetail;


