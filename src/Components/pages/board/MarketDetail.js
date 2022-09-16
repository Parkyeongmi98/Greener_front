import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";
import Comment from "./Comment";


function MarketDetail(props) {

    const id = localStorage.getItem("id");
    const [data, setData] = useState([]);
    const [comments, setComments] = useState([]);

    const {boardsId} = useParams();

    useEffect(() => {
      
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.get(`/api/v1/boards/${boardsId}/detail`)
 
        .then((response)  => { 
          setData(response.data);
          console.log(response)
          
        })

        axios.get(`/api/v1/comments/${boardsId}/detail`)
 
        .then((response)  => { 
          setComments(response.data);

          console.log(response.data)
          
        })
        
      }, [])
    

    function Delete() {
      if(window.confirm("정말 삭제하시겠습니까?")) {
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.delete(`/api/v1/boards/${boardsId}`)
          .then(
          window.location.href = "/market",
          alert('삭제 되었습니다.')
        )}
        else {
          alert("취소합니다.");
        }
      }

      const refreshFunction = (newComment) => {
        setComments(comments.concat(newComment))
      }

    return (
      <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "4%", marginBottom: "4%", border: "solid", borderColor: "gray", borderRadius: "20px", fontFamily: "Nanum Gothic Coding", color: "#454545"}}>        
      <div className="w-full h-full flex justify-center items-center">
      <h2 style={{marginTop: "3%", marginLeft: "5%", fontSize: "40px", marginBottom: "3%"}}>🖊️ 게시물 상세페이지 </h2><hr/>
        {data && (
            <>
            <div className="dataform"
            style={{fontSize: "25px", marginLeft: "5%", marginBottom: "3%"}}>
                제 목 &nbsp;<input 
                      style={{width: "80%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}
                      value={data.title}/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea value={data.content}
                    style={{width: "80%", height: "400px", marginBottom: "2%", padding: "20px 20px"}}
                    /><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src={data.img} alt={data.fileName} style={{marginBottom: "2%", width:"50%", height:"40%" }}/><br/><br/>
                등록자 &nbsp;<input value={data.nickName}
                style={{width: "80%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}/><br/>
                등록일 &nbsp;<input value={data.createDate}
                style={{width: "80%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}/><br/>
            </div>
            <Button href="/market" variant="outline-secondary"
            style={{marginLeft: "5%"}}>뒤로가기</Button>
            {data.userId == id && (
            <>
            <Button href={`/marketchange/${boardsId}`} variant="outline-success">&nbsp; 수정 &nbsp;</Button>
            <Button onClick={() => Delete(data.boardsId)} variant="outline-danger">&nbsp; 삭제 &nbsp;</Button>
            </>
            )}
            </>         
            

            )
        }
        </div>
        
        <div className="comment" style={{marginLeft: "2%", marginRight: "2%", marginTop: "4%", marginBottom: "4%", fontFamily: "Nanum Gothic Coding", color: "#454545"}}>
          <Comment boardsId={boardsId} commentLists={comments} refreshFunction={refreshFunction} />
        </div>

        
      </div>
        
    )
}

export default MarketDetail;


