import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Button} from "@mui/material";
import axios from "axios";


const MarketChange = () => {
  const {boardsId} = useParams();
  // 게시판 제목, 내용, 사진
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: `/api/v1/boards/${boardsId}/detail/images`});

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

      axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
      await axios.put(`/api/v1/boards/${boardsId}`, formData);
      window.alert("수정이 완료되었습니다.");

      window.location.href = `/marketdetail/${boardsId}`;
    } catch (e) {


    }

  }, [canSubmit]);

  return (
    <div className="addBoard-wrapper">
      <div className="addBoard-header">
        게시물 수정하기 🖊️
      </div><br/>

      <div className="addBoard-body">
        <div className="text">
          제 목 <input
            onChange={(e) => {setTitle(e.target.value);}}
            className="title"
            value={title}
          /><br/>
          내 용 <input
            onChange={(e) => {setContent(e.target.value);}}
            className="content"
            value={content}
          />
        </div>

          <input
          type="file"
          accept="image/*"
          onChange={saveImage}
          ref={(refParam) => (inputRef = refParam)}
          style={{ display: "none" }}
        />
        <div className="img-wrapper">
          <img src={image.preview_URL} />
        </div>
        <div className="upload-button">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => inputRef.click()}
          >
            이미지 선택
          </Button>
        </div>
      </div>

      <div className="submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            수정하기
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
    </div>


    
  );
}

export default MarketChange