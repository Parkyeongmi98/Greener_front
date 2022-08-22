// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Button } from "react-bootstrap";

// function MarketChange() {

//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [img, setImg] = useState("");

//     const {boardsId} = useParams();

//     const encodeFileToBase64 = (fileBlob) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(fileBlob);
//       return new Promise((resolve) => {
//         reader.onload = () => {
//           setImg(reader.result);
//           resolve()
//         }
//       })
//     }

//     useEffect(() => {
       
//         axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//         axios.get(`/api/v1/boards/${boardsId}/detail`)
        
//         .then((response)  => { 
//           setTitle(response.data.title);
//           setContent(response.data.content);
//           setImg(response.data.img);
//         })
        
//       }, [])
      
//       const data = {
//         title: title,
//         content: content,

//     }

//       function Update(e) {
//         e.preventDefault()

//         const formData = new FormData();
//         formData.append("files",img[0]);
    
      
//       const json = JSON.stringify(data)
//       const blob = new Blob([json], { type: "application/json" });
//       formData.append("boardsUpdateRequest", blob); 

//       console.log(formData)

//         axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//         axios.put(`/api/v1/boards/${boardsId}`, formData)
//         .then(
//             // window.location.href = `/marketdetail/${boardsId}`,
//             alert('수정되었습니다.')
//         )
//       }

// return (
//     <>
//     <h1>수정하기</h1>
//     <form>
//     제 목 <input 
//         value={title}
//         onChange={(e)=> {setTitle(e.target.value)}}
//         type="text"
//     /><br/>
//     내 용 <input 
//         value={content}
//         onChange={(e)=> {setContent(e.target.value)}}
//         type="text"
//     /><br/>
//     이미지 <img 
//         src={img}
//         alt=""
//         width="20%" height="200px"
//     />

//     <input 
//           type="file"
//           multiple="multiple"
//           onChange={(e) => {encodeFileToBase64(e.target.files[0])}}
          
//         /><br/>

//     <Button href={`/marketdetail/${boardsId}`} variant="outline-secondary">&nbsp; 취소 &nbsp;</Button>
//     <Button onClick={Update} variant="outline-success">&nbsp; 수정 &nbsp;</Button>

//     </form>
//     </>
//     )
// }

// export default MarketChange;




// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Button } from "react-bootstrap";

// function MarketChange() {

//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [img, setImg] = useState("");

//     const {boardsId} = useParams();

//     const saveImage = (e) => {
//       e.preventDefault();
//       if(e.target.files[0]){
//         URL.revokeObjectURL(img.preview_URL);
//         const preview_URL = URL.createObjectURL(e.target.files[0]);
//         setImg(() => (
//           {
//             image_file: e.target.files[0],
//             preview_URL: preview_URL
//           }
//         ))

//       }
//       else {
//         const preview_URL = `/api/v1/boards/${boardsId}/detail/images`
//         setImg(() => (
//           {

//             preview_URL: preview_URL
//           }
//         )
//        )
//       }
//     }

//     const deleteImage = () => {
//       URL.revokeObjectURL(img.preview_URL);
//       setImg({
//         image_file: "",
//         preview_URL: "img/default_image.png"
//       })
//     }

//     useEffect(() => {
      
       
//         axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//         axios.get(`/api/v1/boards/${boardsId}/detail`)
        
//         .then((response)  => { 
//           setTitle(response.data.title);
//           setContent(response.data.content);
//           setImg(response.data.img);
//         })
//         .then()
        
//       }, [])
      


//       const Update = async () => {

//         const formData = new FormData();
//         if(img.image_file){
          
//           formData.append("files", img.image_file);}

//           const data = {
//             title,
//             content
//         }

//         const json = JSON.stringify(data)
//         const blob = new Blob([json], { type: "application/json" });
//         formData.append("boardsUpdateRequest", blob); 

//         axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//         axios.put(`/api/v1/boards/${boardsId}`, formData, {
//           headers: {
//           "Content-Type": "multipart/form-data", 
//       }})
//         .then(
//             // window.location.href = "/market",
//             alert('수정되었습니다.')
//         )
//       }

// return (
//     <>
//     <h1>수정하기</h1>
//     <form>
//     제 목 <input 
//         value={title}
//         onChange={(e)=> {setTitle(e.target.value)}}
//         type="text"
//     /><br/>
//     내 용 <input 
//         value={content}
//         onChange={(e)=> {setContent(e.target.value)}}
//         type="text"
//     /><br/>
//     이미지 <img 
//         src={img}
//         alt=""
//         width="20%" height="200px"
//     />
//       <Button color="error" variant="contained" onClick={deleteImage}>
//         <i class="fa-solid fa-xmark"></i>
//       </Button>

//     <input 
//               type="file"
//               accept="image/*"
//               onChange={saveImage}
//               onClick={(e) => e.target.value = null}
//             />

// <div>
//           <img src={img.preview_URL} width="20%" height="200px" />
//           <Button color="error" variant="contained" onClick={deleteImage}>
//             <i class="fa-solid fa-xmark"></i>
//           </Button>
//         </div><br/>

//     <Button href={`/marketdetail/${boardsId}`} variant="outline-secondary">&nbsp; 취소 &nbsp;</Button>
//     <Button onClick={Update} variant="outline-success">&nbsp; 수정 &nbsp;</Button>

//     </form>
//     </>
//     )
// }

// export default MarketChange;


// import {useSelector} from "react-redux";
// import {useNavigate, useParams} from "react-router-dom";
// import {useCallback, useEffect, useState} from "react";
// import {Button} from "@mui/material";
// import axios from "axios";



// const MarketChange = () => {
//   const navigate = useNavigate();
//   // URI 파라미터 가져오기
//   const {boardsId} = useParams();
//   // 게시판 제목, 내용, 사진
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState({
//     image_file: "",
//     preview_URL: "img/default_image.png",
//   });

//   // 사용자가 직전에 등록한 게시물의 상태를 그대로 보여주기 위해
//   // 컴포넌트가 마운트되고 URI 파라미터에 해당하는 board를 가져와서
//   // title, content, image의 상태를 바꿔줌
//   useEffect(() => {
//     const getBoard = async () => {
//       const {data} = await axios.get(`/api/v1/boards/${boardsId}/detail`);
//       return data;
//     }
//     getBoard().then((result) => {
//       setTitle(result.title);
//       setContent(result.content);
//       // 이미지는 파일을 불러올 필요가 없이 미리보기 url만 가져온다.
//       // 이미지를 선택하지 않고 올리면 db에 저장되어 있는 이미지를 그대로 사용!
//       setImage(result.image)
//     });
//   }, [])

//   const canSubmit = useCallback(() => {
//     return content !== "" && title !== "";
//   }, [image, title, content]);

//   const handleSubmit = useCallback(async () => {
//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content);
//       // 이미지를 선택했을 때만 formdata에 넣음
//       formData.append("file", image.image_file);
//       // 수정할 땐 board_id를 보내자
//       formData.append("id", boardsId);
//         axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//         axios.put(`/api/v1/boards/${boardsId}`, formData, {
//           headers: {
//           "Content-Type": "multipart/form-data", 
//       }})
//       window.alert("😎수정이 완료되었습니다😎");
//       // 이전 페이지로 돌아가기
//       window.location.href = `/marketdetail/${boardsId}`;
//     } catch (e) {
//       // 서버에서 받은 에러 메시지 출력

//     }

//   }, [canSubmit]);

//   return (
//       <>
//       <h1>수정하기</h1>
//       <form>
//       제 목 <input 
//           value={title}
//           onChange={(e)=> {setTitle(e.target.value)}}
//           type="text"
//       /><br/>
//       내 용 <input 
//           value={content}
//           onChange={(e)=> {setContent(e.target.value)}}
//           type="text"
//       /><br/>
//       이미지 <img 
//           src={image}
//           alt=""
//           width="20%" height="200px"
//       />
//         {/* <Button color="error" variant="contained" onClick={deleteImage}>
//           <i class="fa-solid fa-xmark"></i>
//         </Button> */}

//       <input 
//                 type="file"
//                 accept="image/*"
//                 // onChange={saveImage}
//                 onClick={(e) => e.target.value = null}
//               />

//   <div>
//             <img src={image.preview_URL} width="20%" height="200px" />
//             {/* <Button color="error" variant="contained" onClick={deleteImage}>
//               <i class="fa-solid fa-xmark"></i>
//             </Button> */}
//           </div><br/>

//       <Button href={`/marketdetail/${boardsId}`} variant="outline-secondary">&nbsp; 취소 &nbsp;</Button>
//       <Button onClick={handleSubmit} variant="outline-success">&nbsp; 수정 &nbsp;</Button>

//       </form>
//       </>
//       )
// }

// export default MarketChange;


import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import ImageUploader from "./ImageUploader";
import TextArea from "./TextArea";
import {Button} from "@mui/material";
import axios from "axios";


const MarketChange = () => {
  const navigate = useNavigate();
  // URI 파라미터 가져오기
  const {boardsId} = useParams();
  // 게시판 제목, 내용, 사진
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState({
    image_file: `http://localhost:8080/api/v1/boards/${boardsId}/detail/images`,
    preview_URL: `/api/v1/boards/${boardsId}/detail/images`});

  // 사용자가 직전에 등록한 게시물의 상태를 그대로 보여주기 위해
  // 컴포넌트가 마운트되고 URI 파라미터에 해당하는 board를 가져와서
  // title, content, image의 상태를 바꿔줌
  useEffect(() => {
    const getBoard = async () => {
      axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
      const {data} = await axios.get(`/api/v1/boards/${boardsId}/detail`);
      return data;
    }
    getBoard().then((result) => {
      console.log(result)
      setTitle(result.title);
      setContent(result.content);
      // 이미지는 파일을 불러올 필요가 없이 미리보기 url만 가져온다.
      // 이미지를 선택하지 않고 올리면 db에 저장되어 있는 이미지를 그대로 사용!
      setImage({...image, preview_URL: `/api/v1/boards/${boardsId}/detail/images`})
      console.log(result.img)
      console.log(image)
    });
  }, [])

  const canSubmit = useCallback(() => {
    return content !== "" && title !== "";
  }, [image, title, content]);



  const handleSubmit = useCallback(async () => {
    try {

      const formData = new FormData();
      
      const data = {
        title: title,
        content: content
      }
      const json = JSON.stringify(data)
      const blob = new Blob([json], { type: "application/json" });
      formData.append("boardsUpdateRequest", blob);

      formData.append("files", image.image_file);

      console.log(...formData)

      // formData.append("title", title);
      // formData.append("content", content);
      // // 이미지를 선택했을 때만 formdata에 넣음
      // formData.append("file", image.image_file);
      // // 수정할 땐 board_id를 보내자

      axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
      await axios.put(`/api/v1/boards/${boardsId}`, formData);
      window.alert("😎수정이 완료되었습니다😎");
      // 이전 페이지로 돌아가기
      window.location.href = `/marketdetail/${boardsId}`;
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력

    }

  }, [canSubmit]);

  return (
    <div className="addBoard-wrapper">
      <div className="addBoard-header">
        게시물 수정하기 🖊️
      </div>
      <div className="submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            수정하기😃
          </Button>
        ) : (
          <Button
            className="disable-button"
            variant="outlined"
            size="large"
          >
            제목과 내용을 모두 입력하세요😭
          </Button>
        )}
      </div>
      <div className="addBoard-body">

        <ImageUploader setImage={setImage} preview_URL={image.preview_URL} width="20%" height="200px"/>
        <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content}/>
      </div>
    </div>
  );
}

export default MarketChange


// import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
// import axios from "axios";
// import { Button } from "react-bootstrap";

// const MarketChange = () => {

//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [img, setImg] = useState({
//       image_file: "",
//       preview_URL: "img/default_image.png"
//     });

    

//     const {boardsId} = useParams();

//     const saveImage = (e) => {
//       e.preventDefault();
//       if(e.target.files[0]){
//         URL.revokeObjectURL(img.preview_URL);
//         const preview_URL = URL.createObjectURL(e.target.files[0]);
//         setImg(() => (
//           {
//             image_file: e.target.files[0],
//             preview_URL: preview_URL
//           }
//         ))
//       }
//     }

//     const deleteImage = () => {
//       URL.revokeObjectURL(img.preview_URL);
//       setImg({
//         image_file: "",
//         preview_URL: "img/default_image.png"
//       })
//     }


//   //   useEffect(() => {
       
//   //     axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//   //     axios.get(`/api/v1/boards/${boardsId}/detail`)
      
//   //     .then((response)  => { 
//   //       setTitle(response.data.title);
//   //       setContent(response.data.content);
//   //       setImg(response.data.img);
//   //     })
      
//   //   }, [])
    
//   //   const data = {
//   //     title: title,
//   //     content: content,

//   // }

//   //   function Update(e) {
//   //     e.preventDefault()

//   //     const formData = new FormData();
//   //     formData.append("files",img[0]);
  
    
//   //   const json = JSON.stringify(data)
//   //   const blob = new Blob([json], { type: "application/json" });
//   //   formData.append("boardsUpdateRequest", blob); 

//   //   console.log(formData)

//   //     axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//   //     axios.put(`/api/v1/boards/${boardsId}`, formData)
//   //     .then(
//   //         // window.location.href = `/marketdetail/${boardsId}`,
//   //         alert('수정되었습니다.')
//   //     )
//   //   }







//     useEffect(() => {

//       axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//       axios.get(`/api/v1/boards/${boardsId}/detail`)
      
//       .then((response)  => { 
//         setTitle(response.data.title);
//         setContent(response.data.content);
//         setImg(response.data.img);
//       })
      
//     }, [])

//     const onSubmit = async () => {
//       const formData = new FormData();
//         if(img.image_file){
          
//           formData.append("files", img.image_file);}
    
//           let dataSet = {
//             title,
//             content,
//           };
      
//         const json = JSON.stringify(dataSet)
//         const blob = new Blob([json], { type: "application/json" });
//         formData.append("boardsUpdateRequest", blob); 

//         axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//         await axios.put(`/api/v1/boards/${boardsId}`, formData, {
//               headers: {
//               "Content-Type": "multipart/form-data", 
//           }})

//             window.location.href = `/marketdetail/${boardsId}`;
//             alert('수정되었습니다.');

      
//     }
   
//     return (
//       <form >
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

//       이미지 <img 
//           src={img}
//           alt=""
//           width="20%" height="200px"
//           onChange={(e)=> {setImg(e.target.files)}}
//       />
      
//         <input 
//           type="file"
//           accept="image/*"
//           onChange={saveImage}
//           onClick={(e) => e.target.value = null}
//         /><br/>

//         <div>
//           <img src={img.preview_URL} width="20%" height="200px" />
//           <Button color="error" variant="contained" onClick={deleteImage}>
//             <i class="fa-solid fa-xmark"></i>
//           </Button>
//         </div>

//         <Button href={`/marketdetail/${boardsId}`} variant="outline-secondary">&nbsp; 취소 &nbsp;</Button>
//         <Button variant="outline-success" onClick={onSubmit}>
//           수정
//         </Button>

//       </form>
//   );
// }

// export default MarketChange;