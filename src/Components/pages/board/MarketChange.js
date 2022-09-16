import {useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";


const MarketChange = () => {
  const {boardsId} = useParams();
  // 게시판 제목, 내용, 사진
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: ""});

    let inputRef;

    const saveImage = (e) => {
      e.preventDefault();
      const fileReader = new FileReader();
      if (e.target.files[0]) {
        fileReader.readAsDataURL(e.target.files[0]);
      }
      fileReader.onload = () => {
        setImage({
          image_file: e.target.files[0],
          preview_URL: fileReader.result,
        })
      };
    };

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
      setImage({...image, preview_URL: result.img})
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

      axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
      await axios.put(`/api/v1/boards/${boardsId}`, formData);
      window.alert("수정이 완료되었습니다.");

      window.location.href = `/marketdetail/${boardsId}`;
    } catch (e) {


    }

  }, [canSubmit]);

  return (
    <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "4%", marginBottom: "4%", border: "solid", borderColor: "gray", borderRadius: "20px", fontFamily: "Nanum Gothic Coding", color: "#454545"}}>
      <div className="addBoard-body">
      <h2 style={{marginTop: "3%", marginLeft: "5%", fontSize: "40px", marginBottom: "3%"}}>🖊️ 게시물 수정페이지 </h2><hr/>
        <div className="text"
        style={{fontSize: "25px", marginLeft: "5%"}}>
          제 목 <input
          style={{width: "80%", height: "80px", marginBottom: "2%", padding: "20px 20px"}}
            onChange={(e) => {setTitle(e.target.value);}}
            className="title"
            value={title}
          /><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea
          style={{width: "80%", height: "400px", padding: "20px 20px"}}
            onChange={(e) => {setContent(e.target.value);}}
            className="content"
            value={content}
          />
        </div><br/>

          <input
          type="file"
          accept="image/*"
          onChange={saveImage}
          ref={(refParam) => (inputRef = refParam)}
          style={{ display: "none" }}
        />

          <Button
            style={{marginLeft: "11.5%", marginBottom: "2%"}}
            variant="outline-dark"
            onClick={() => inputRef.click()}
          >
            이미지 선택
          </Button><br/>
        
          <img src={image.preview_URL} style={{marginBottom: "4%", width:"55%", height:"40%", marginLeft: "11.5%" }}/>
       
      </div>

      <div className="submitButton" style={{marginLeft: "40%", marginBottom: "3%"}}>
        {canSubmit() ? (
          <>
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outline-success"
          >
            수정하기
          </Button>
          <Button href={`/marketdetail/${boardsId}`} variant="outline-secondary">취소</Button>
          </>
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

  </div>


    
  );
}

export default MarketChange