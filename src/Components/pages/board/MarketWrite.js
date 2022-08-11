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

import React, { useState } from "react";
import axios from "axios";

const MarketWrite = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tempFile, setTempFile] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        
        const formData = new FormData();
        formData.append("file",tempFile[0]);
    
        let dataSet = {
            title,
            content,
        };
      
      const json = JSON.stringify(dataSet)
      const blob = new Blob([json], { type: "application/json" });
      formData.append("request", blob); 


      axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
      axios.post("/api/v1/boards", formData, {
            headers: {
            "Content-Type": "multipart/form-data", 
        }})
        .then((response) => {
            console.log(response)
            window.location.href = "/market";
            alert('등록되었습니다.')}
        );
    }
      
      
    return (
      <form onSubmit={onSubmit}>
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
          multiple="multiple"
          onChange={(e) => {setTempFile(e.target.files)}}
        /><br/>

        <button type="submit">제출</button>
      </form>
  );
}

export default MarketWrite;

