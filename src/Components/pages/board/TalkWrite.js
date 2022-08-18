// import React, { useState } from "react";
// import axios from "axios";

// const TalkWrite = () => {

//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [tempFile, setTempFile] = useState("");

//     const onSubmit = async (e) => {
//         e.preventDefault();

        
//         const formData = new FormData();
//         formData.append("file",tempFile[0]);
    
//         let dataSet = {
//             title,
//             content,
//         };
      
//       const json = JSON.stringify(dataSet)
//       const blob = new Blob([json], { type: "application/json" });
//       formData.append("request", blob); 


//       axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//       axios.post("/api/v1/boards", formData, {
//             headers: {
//             "Content-Type": "multipart/form-data", 
//         }})
//         .then((response) => {
//             console.log(response)
//             window.location.href = "/market";
//             alert('등록되었습니다.')}
//         );
//     }
      
      
//     return (
//       <form onSubmit={onSubmit}>
//           제 목 <input 
//           value={title}
//           onChange={(e)=> {setTitle(e.target.value)}}
//           type="text"
//           placeholder="제목을 입력하세요"
//       /><br/>
//       내 용 <input 
//           value={content}
//           onChange={(e)=> {setContent(e.target.value)}}
//           type="text"
//           placeholder="내용을 입력하세요"
//       /><br/>

//         <input 
//           type="file"
//           multiple="multiple"
//           onChange={(e) => {setTempFile(e.target.files)}}
//         /><br/>

//         <button type="submit">제출</button>
//       </form>
//   );
// }

// export default TalkWrite;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const TalkWrite = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState({
      image_file: "",
      preview_URL: "img/default_image.png"
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
        preview_URL: "img/default_image.png"
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
            categoryid: 2,
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

              window.location.href = "/market";
              alert('등록되었습니다.');
            // setImg({
            //   image_file: "",
            //   preview_URL: "img/default_image.png"
            // });
      
    }
   
    return (
      <form >
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
      
        <input 
          type="file"
          accept="image/*"
          onChange={saveImage}
          onClick={(e) => e.target.value = null}
        />

        <div>
          <img src={img.preview_URL} width="20%" height="200px" />
          <Button color="error" variant="contained" onClick={deleteImage}>
            <i class="fa-solid fa-xmark"></i>
          </Button>
        </div>

        <Button color="success" variant="contained" onClick={onSubmit}>
          제출
        </Button>

      </form>
  );
}

export default TalkWrite;