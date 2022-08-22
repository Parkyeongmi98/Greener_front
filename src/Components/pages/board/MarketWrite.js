// import React, {useState} from "react";
// import axios from "axios";


// function MarketWrite() {

//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [tempFile, setTempFile] = useState();

//     const data = {
//         title: title,
//         content: content,
//     }

//     // function Submit(e) {
//     //     e.preventDefault();

//     //     axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//     //     axios.post("/api/v1/boards", data)     
//     //         .then((response) => {
//     //               window.location.href = "/market";
//     //               alert('등록되었습니다.')
//     //         });
//     // }

//     const handleClick = (e) => {
//         var formdata = new FormData();
//         for (let i = 0; i < tempFile.length; i++) {
//             formdata.append("files", tempFile[i]);
//         }
        
//         axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//         axios.post("/api/v1/boards", formdata, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }).then((res) => {
//           console.log(res);
//         });
        
//     }

// return (
//     <>
//     <h1>글쓰기</h1>
//     <form onSubmit={handleClick}>
//     제 목 <input 
//         value={title}
//         onChange={(e)=> {setTitle(e.target.value)}}
//         type="text"
//         placeholder="제목을 입력하세요"
//     /><br/>
//     내 용 <input 
//         value={content}
//         onChange={(e)=> {setContent(e.target.value)}}
//         type="text"
//         placeholder="내용을 입력하세요"
//     /><br/>
//     {/* <form className="upload_input">
//          <input 
//         value={imagePath}
//         onChange={onLoadFile}
//         type="file"
//         accept="img/*"
        
//     />
//     <label htmlFor="imgae">파일 선택하기</label>
//     </form> */}
//     {/* <button id="btn-file-upload">파일 업로드</button>
//     <input
//       type="file"
//       id="upload-file"
//       accept="image/*"
//     />  <br/> */}
//     <input
//       type="file"
//       multiple
//       onChange={(e) => {
//         setTempFile(e.target.files);
//       }}
//     />
//     <button type="submit">submit</button>

//     </form>
//     </>
// )
// }

// export default MarketWrite;

// import React, { useState } from "react";
// import axios from "axios";

// const MarketWrite = () => {

//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [file, setFile] = useState("");
    
//     // const saveFileImage = (e) => {
//     //   setFile(URL.createObjectURL(e.target.files[0]))
//     // }

//     // const DeleteFileImage = () => {
//     //   URL.revokeObjectURL(file);
//     //   setFile("");
//     // }



//     const onSubmit = async (e) => {
//         e.preventDefault();

        
//         const formData = new FormData();
//         formData.append("file",file[0]);
    
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
//           onChange={(e) => {setFile(e.target.files)}}
//         />

//         <button type="submit">제출</button>
//       </form>
//   );
// }

// export default MarketWrite;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const MarketWrite = () => {

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

export default MarketWrite;

