import axios from "axios";
import React, { useState, useEffect } from "react";
import CommunityTab from "./CommunityTab";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Market() {
 
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
    </tr>
  </thead>
  <tbody className="table-group-divider">

    {data.map((data, boardsId) => (

    <tr key={boardsId}>
      <td>{boardsId + 1}</td>
      <td ><a href={`/marketdetail/${data.boardsId}`} >{data.title}</a></td>
      <td>{data.content}</td>   
      <td>{data.nickName}</td>
      <td>{data.bornDate}</td>
    </tr>
  ))}
  </tbody>
</table>
<Button id="marketbtn" variant="outline-success" href="/marketwrite">&nbsp; 글쓰기 &nbsp;</Button>

</>


)
}

export default Market;