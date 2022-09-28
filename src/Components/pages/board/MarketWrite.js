import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const MarketWrite = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState({
      image_file: "",
      preview_URL: "/img/default_image.png"
    });

    const saveImage = (e) => {
      e.preventDefault();
      if(e.target.files[0]){
        URL.revokeObjectURL(img.preview_URL);
        const preview_URL = URL.createObjectURL(e.target.files[0]);
        setImg(() => (
          {
            image_file: e.target.files[0],
            preview_URL: preview_URL
          }
        ))
      }
    }

    const deleteImage = () => {
      URL.revokeObjectURL(img.preview_URL);
      setImg({
        image_file: "",
        preview_URL: "/img/default_image.png"
      })
    }

    useEffect(() => {
      return () => {
        URL.revokeObjectURL(img.preview_URL)
      }
    }, [])

    const onSubmit = async () => {
      const formData = new FormData();
        if(img.image_file){
          
          formData.append("file", img.image_file);}
    
          let dataSet = {
            categoryid: 1,
            
            title,
            content,
          };
      
        const json = JSON.stringify(dataSet)
        const blob = new Blob([json], { type: "application/json" });
        formData.append("request", blob); 

        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        await axios.post("/api/v1/boards", formData, {
              headers: {
              "Content-Type": "multipart/form-data", 
          }})
            console.log(...formData)
              window.location.href = "/market";
              alert('등록되었습니다.');
      
    }
   
    return (
      <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "4%", marginBottom: "4%", border: "solid", borderColor: "gray", borderRadius: "20px", fontFamily: "Nanum Gothic Coding", color: "#454545"}}>
      <h2 style={{marginTop: "3%", marginLeft: "5%", fontSize: "40px", marginBottom: "3%"}}>🖊️ 게시물 작성하기 </h2><hr/>
      <form style={{fontSize: "25px", marginLeft: "5%", marginBottom: "3%"}}>
          제 목 &nbsp;<input 
          style={{width: "80%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}
          value={title}
          onChange={(e)=> {setTitle(e.target.value)}}
          type="text"
          placeholder="제목을 입력하세요"
      /><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea
          style={{width: "80%", height: "300px", marginBottom: "2%", padding: "20px 20px"}}
          value={content}
          onChange={(e)=> {setContent(e.target.value)}}
          type="text"
          placeholder="내용을 입력하세요"
      /><br/>
      
        <input 
          style={{marginBottom: "2%", marginLeft: "7%"}}
          type="file"
          accept="image/*"
          onChange={saveImage}
          onClick={(e) => e.target.value = null}
        />

        <div style={{marginBottom: "2%", marginLeft: "7%"}}>
          <img src={img.preview_URL} style={{marginBottom: "2%", width:"40%", height:"30%" }}/>
          <Button color="error" variant="contained" onClick={deleteImage}>
            <i class="fa-solid fa-xmark"></i>
          </Button>
        </div>


        <Button variant="outline-success" onClick={onSubmit} style={{width:"110px", height:"60px", fontSize: "25px", marginLeft: "36%"}}>
          제출
        </Button>
        <Button variant="outline-secondary" href="/market" style={{width:"110px", height:"60px", fontSize: "25px", marginLeft: "2%"}}>
          취소
        </Button>

      </form>
      </div>
  );
}

export default MarketWrite;


