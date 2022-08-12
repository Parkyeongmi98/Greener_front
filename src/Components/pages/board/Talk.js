import axios from "axios";
import React, { useState, useEffect } from "react";
import CommunityTab from "./CommunityTab";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Talk() {
 
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
    axios.get('/api/v1/boards')
    .then((response) => {
      setData(response.data);
      console.log(response);
    })
    
    
  }, [])



  return (
    <>
    <CommunityTab />
    
    
    <table className="table">
  <thead>
    <tr>
      <th>번호</th>
      <th>제목</th>
      <th>내용</th>
      <th>등록자</th>
      <th>등록일</th>
      <th>#</th>
    </tr>
  </thead>
  <tbody className="table-group-divider">

    {data.map((data, boardsId) => (

    <tr key={boardsId}>
      <td>{boardsId + 1}</td>
      <td >{data.title}</td>
      <td>{data.content}</td>   
      <td>{data.nickName}</td>
      <td>{data.bornDate}.format('YYYY-MM-DD')</td>
      <td className="flex justify-center items-center space-x-4 mt-3">
        <Link to={`/talkdetail/${data.boardsId}`}>view</Link>
        <button>edit</button>
        <button>delete</button>
      </td>
    </tr>
  ))}
  </tbody>
</table>
<Button id="talkbtn" variant="outline-success" href="talkwrite">&nbsp; 글쓰기 &nbsp;</Button>

</>


)
}

export default Talk;