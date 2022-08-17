import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";

function MarketChange() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState("");

    const {boardsId} = useParams();

    useEffect(() => {
       
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.get(`/api/v1/boards/${boardsId}/detail`)
        
        .then((response)  => { 
          setTitle(response.data.title);
          setContent(response.data.content);
          setImg(response.data.img);
          console.log(response.data.img)
        })
        
      }, [])
      
      const data = {
        title: title,
        content: content,
        img: img
    }

      function Update(e) {
        e.preventDefault()

        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.put(`/api/v1/boards/${boardsId}`, data)
        .then(
            window.location.href = "/market",
            alert('수정되었습니다.')
        )
      }

      function FileDelete() {
        
      }


return (
    <>
    <h1>수정하기</h1>
    <form>
    제 목 <input 
        value={title}
        onChange={(e)=> {setTitle(e.target.value)}}
        type="text"
        placeholder="제목을 입력하세요"
    /><br/>
    내 용 <input 
        value={content}
        onChange={(e)=> {setContent(e.target.value)}}
        type="text"
        placeholder="내용을 입력하세요"
    /><br/>
    이미지 <img 
        src={img}
        alt="error"
        width="20%" height="200px"
        placeholder="이미지를 등록하세요"
        onChange={(e)=> {setImg(e.target.value)}}
    />
    <button onChange={FileDelete}>삭제</button>
    <input 
      type="file"
       
    /><br/>
  <Button href={`/marketdetail/${boardsId}`} variant="outline-secondary">&nbsp; 취소 &nbsp;</Button>
  <Button onClick={Update} variant="outline-success">&nbsp; 수정 &nbsp;</Button>

    </form>
    </>
    )
}

export default MarketChange;