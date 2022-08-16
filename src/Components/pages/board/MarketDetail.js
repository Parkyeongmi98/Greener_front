import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function MarketDetail() {

    const id = localStorage.getItem("id");
    const [data, setData] = useState([]);
    const {boardsId} = useParams();


    useEffect(() => {
       
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.get(`/api/v1/boards/${boardsId}/detail`)
        
        .then((response)  => { 
          setData(response.data);
          console.log(response)
        })
        
      }, [])
    
    

    function Delete() {
      if(window.confirm("정말 삭제하시겠습니까?")) {
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.delete(`/api/v1/boards/${boardsId}`)
          .then(
          window.location.href = "/market",
          alert('삭제 되었습니다.')
        )}
        else {
          alert("취소합니다.");
        }
      }

    

    return (
        <div className="w-full h-full flex justify-center items-center">
        {data && (

            <>
            <div className="dataform">


                제목 <input value={data.title}/><br/>
                내용 <input value={data.content}/><br/>
                이미지 <img src={data.img} alt={data.fileName} width="20%" height="200px"/><br/>
                등록자 <input value={data.nickName}/><br/>
                등록일 <input value={data.createDate}/><br/>
                

            </div>
            
            <Link to={`/marketchange/${boardsId}`}>&nbsp; 수정 &nbsp;</Link>
            <Button onClick={() => Delete(data.boardsId)} variant="danger">&nbsp; 삭제 &nbsp;</Button> 
          
            </>         
            

            )
        }
        </div>
        
    )
}

export default MarketDetail;


// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import {useNavigate, useParams} from "react-router-dom";
// import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
// import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
// function MarketDetail()  {
//   // URL 파라미터 받기 - board의 id
//   const {boardId} = useParams();
//   // const [board, setBoard] = useState({});
//   const [isLoaded, setIsLoaded] = useState(false);
//   const token = localStorage.getItem("access");
//   const id = localStorage.getItem("id");
//   const navigate = useNavigate();
//   // modal이 보이는 여부 상태
//   const [show, setShow] = useState(false);
//   // board 가져오기

//   // const id = localStorage.getItem("id");
//   const [data, setData] = useState([]);
//   // const {boardsId} = useParams();

//   useEffect(() => {
     
//       axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//       axios.get(`/api/v1/boards/${boardId}/detail`)
      
//       .then((response)  => { 
//         setData(response.data);
//         console.log(response)
//       })
//       .then(result => setData(result)).then(() => setIsLoaded(true))
      
//     }, [])


  // useEffect(() => {
  //   const getBoard = async () => {
  //     const {data} =
  //     axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`
  //     await axios.get(`/api/board/${boardId}/detail`);
  //     return data;
  //   }
  //   getBoard().then(result => setBoard(result)).then(() => setIsLoaded(true));
  // }, [])

//     function Delete() {
//       axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//       axios.delete(`/api/v1/boards/${boardId}`)
//       .then(
//         window.location.href = "/market",
//         alert('삭제 되었습니다.')
//       )
//   }

//   return (
//     <React.Fragment>
//       {isLoaded && (
//         <div className="board-wrapper">
//           {
//             /*
//               해당 글의 작성자가 로그인을 했을 때만 수정, 삭제 버튼이 보이게 하자.
//               로그인을 한 사용자의 jwt-token에서 user의 ID를 추출한 후,
//               board(해당 글)의 user의 ID를 비교했을 때 같으면 수정, 삭제 버튼이 보이게 한다.
//               ID는 DB에 저장되어 있는 유저의 고유 번호이다.
//              */
//             id === data.userId &&
//             <div className="edit-delete-button">
//               <Button
//                 variant="outlined" color="error" endIcon={<DeleteForeverOutlinedIcon/>}
//                 className="delete-button"
//                 onClick={() => {
//                   setShow(true)
//                 }}
//               >
//                 삭제
//               </Button>
//               <Button
//                 variant="outlined" endIcon={<BuildOutlinedIcon/>}
//                 onClick={() => {
//                   navigate(`/marketchange/${boardId}`)
//                 }}
//               >
//                 수정
//               </Button>
//             </div>
//           }

//           <div className="w-full h-full flex justify-center items-center">
//           {data && (
          
//             <div className="dataform">
//                 제목 <input value={data.title}/><br/>
//                 내용 <input value={data.content}/><br/>
//                 이미지 <img src={data.boardFilesId} alt={data.fileName} width="20%" height="200px"/><br/>
//                 등록자 <input value={data.nickName}/><br/>
//                 등록일 <input value={data.createDate}/><br/>
//             </div>
 
//             )
//           }
//           </div>
          
//         </div>
//     )}
//       {/*modal*/}
//       <Dialog open={show}>
//         <DialogContent style={{position: "relative"}}>
//           <IconButton
//             style={{position: "absolute", top: "0", right: "0"}}
//             onClick={() => setShow(false)}
//           >
//             <DisabledByDefaultOutlinedIcon/>
//           </IconButton>
//           <div className="modal">
//             <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
//             <div className="modal-button">
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={async () => {
//                   setShow(false);
//                   // 모달의 예 버튼 클릭시 게시물 삭제
//                   Delete(data.boardId)
//                   alert("게시물이 삭제되었습니다😎");
//                   window.location.href = "/market";
//                 }}
//               >
//                 예
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => {
//                   setShow(false)
//                 }}
//               >
//                 아니오
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </React.Fragment>
//   );
// }
// export default MarketDetail;

