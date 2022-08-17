import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";

function MarketChange() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState("");

    const {boardsId} = useParams();

    const encodeFileToBase64 = (fileBlob) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImg(reader.result);
          resolve()
        }
      })
    }

    useEffect(() => {
       
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.get(`/api/v1/boards/${boardsId}/detail`)
        
        .then((response)  => { 
          setTitle(response.data.title);
          setContent(response.data.content);
          setImg(response.data.img);
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

return (
    <>
    <h1>수정하기</h1>
    <form>
    제 목 <input 
        value={title}
        onChange={(e)=> {setTitle(e.target.value)}}
        type="text"
    /><br/>
    내 용 <input 
        value={content}
        onChange={(e)=> {setContent(e.target.value)}}
        type="text"
    /><br/>
    이미지 <img 
        src={img}
        alt=""
        width="20%" height="200px"
    />

    <input 
          type="file"
          multiple="multiple"
          onChange={(e) => {encodeFileToBase64(e.target.files[0])}}
        /><br/>

    <Button href={`/marketdetail/${boardsId}`} variant="outline-secondary">&nbsp; 취소 &nbsp;</Button>
    <Button onClick={Update} variant="outline-success">&nbsp; 수정 &nbsp;</Button>

    </form>
    </>
    )
}

export default MarketChange;
