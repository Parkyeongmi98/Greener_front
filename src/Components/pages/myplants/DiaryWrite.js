import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function DiarysWrite(){

    const [content, setContent] = useState("");
    const memberId = localStorage.getItem("id");
    const myPlantsId = useParams().myPlntsId

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

    const onSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
        if(img.image_file){
          
          formData.append("file", img.image_file);}
    
          let dataSet = {
            content: content,
            membersid: memberId,
            myPlantsid: myPlantsId
          };
      
        const json = JSON.stringify(dataSet)
        const blob = new Blob([json], { type: "application/json" });
        formData.append("request", blob); 
        try {
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        await axios.post("/api/v1/diary", formData, {
              headers: {
              "Content-Type": "multipart/form-data", 
          }}).then(response => {
            console.log(response.data)
            setContent('');
            window.location.href = `/diary/${myPlantsId}`;
            alert('등록되었습니다.');
            })} catch (error){
                       console.error(error.message);
                   }   
          }
      
    useEffect(() => {
      
      return () => {
        URL.revokeObjectURL(img.preview_URL)
      }
  }, []);

    return (
        <div style={{marginLeft: "5%", marginTop: "4%", marginRight: "5%", marginBottom: "3%"}}>
        <h1 style={{marginBottom: "5%", fontSize: "50px"}}>다이어리 작성페이지 📝</h1>
        <form style={{width: "100%", fontSize: "26px", display: "flex"}}>
        
        <div className="img" style={{width: "50%"}}>
        <input 
          style={{marginBottom: "3%"}}
          type="file"
          accept="image/*"
          onChange={saveImage}
          onClick={(e) => e.target.value = null}
        /> 

        <div>
          <img src={img.preview_URL} style={{marginBottom: "2%", width:"65%", height:"400px" }}/>
          <Button color="error" variant="contained" onClick={deleteImage}>
            <i class="fa-solid fa-xmark"></i>
          </Button>
        </div>
        </div>


        <div className="text" style={{width: "50%"}}>

            <div className='mb-2 mt-3' >
              다이어리 내용을 작성해주세요
              <textarea 
                  style={{width: "95%", marginTop: "1%", height: "400px"}}
                   type={'text'}
                   placeholder='My Plants Diary'
                   className='form-control'
                   value={content}
                   onChange={e => {
                       setContent(e.target.value)
              }} />
            </div>
        </div>


        </form>
        <Button variant="success" onClick={onSubmit} style={{marginLeft: "8%", width: "120px", marginTop: "2%"}}>
          등록
         </Button>
         <Button variant="secondary" href="/myplantslist" style={{marginLeft: "1%", width: "120px", marginTop: "2%"}}>
          취소
        </Button>
        </div>
    );
}
