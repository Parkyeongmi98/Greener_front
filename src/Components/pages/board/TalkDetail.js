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
        <div className="w-full h-full flex justify-center items-center">
        {data && (

            <>
            <div className="dataform">


                제목 <input value={data.title}/><br/>
                내용 <input value={data.content}/><br/>
                이미지 <img src={data.img} alt={data.fileName} width="20%" height="200px"/><br/>
                등록자 <input value={data.nickName}/><br/>
                등록일 <input value={data.createDate}/><br/>
                

            </div>
                <Button href="/talk" variant="outline-secondary">뒤로가기</Button>
                {data.userId == id && (
                <>
                <Button href={`/talkchange/${boardsId}`} variant="outline-success">&nbsp; 수정 &nbsp;</Button>
                <Button onClick={() => Delete(data.boardsId)} variant="outline-danger">&nbsp; 삭제 &nbsp;</Button>
                </>
                )}
            </>         
            

            )
        }
        </div>
        
    )
}

export default MarketDetail;


