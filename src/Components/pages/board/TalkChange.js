import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";

function TalkChange() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [boardFilesId, setBoardFilesId] = useState("");

    const {boardsId} = useParams();

    useEffect(() => {
       
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.get(`/api/v1/boards/${boardsId}/detail`)
        
        .then((response)  => { 
          setTitle(response.data.title);
          setContent(response.data.content);
          setBoardFilesId(response.data.boardFilesId);

        })
        
      }, [])
      
      const data = {
        title: title,
        content: content,
        boardfilesid: boardFilesId
    }

      function Update(e) {
        e.preventDefault()

        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.put(`/api/v1/boards/${boardsId}`, data)
        .then(
            window.location.href = "/talk",
            alert('수정되었습니다.')
        )
      }


return (
    <>
    <h1>글쓰기</h1>
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
    이미지 <input 
        value={boardFilesId}
        onChange={(e)=> {setBoardFilesId(e.target.value)}}
        type="text"
        placeholder="이미지를 등록하세요"
    /><br/>

    <button onClick={Update}>수정</button>

    </form>
    </>
    )
}

export default TalkChange;