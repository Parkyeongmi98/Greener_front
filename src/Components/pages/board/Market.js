import axios from "axios";
import {Pagination} from "@mui/material";
import React, { useState, useEffect } from "react";
import {useSearchParams} from "react-router-dom";
import CommunityTab from "./CommunityTab";
import { Button } from "react-bootstrap";

const Market = () => {
  
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [boardList, setBoardList] = useState([]);
  
  
  useEffect(() => {
    const getBoardList = async () => {
      const page_number = searchParams.get("page");
      axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
      const {data} = await axios.get(`/api/v1/boards?page=${page_number}&size=10`)
      console.log(data.content) 
      return data.content;
    }
    getBoardList().then(result => setBoardList(result));

    const getTotalBoard = async () => {
      const {data} = await axios.get("/api/v1/boards");
      return data.totalElements;
    }
    getTotalBoard().then(result => setPageCount(Math.ceil(result / 10)))
    }, [])
    

  return (
    <>
    <CommunityTab />
    
    
    <table className="table">
  <thead>
    <tr>
      <th>번호</th>
      <th>제목</th>
      <th>등록자</th>
      <th>등록일</th>
    </tr>
  </thead>
  <tbody className="table-group-divider">

    {boardList.map((data, boardsId) => (

    <tr key={boardsId}>
      <td>{boardsId + 1}</td>
      <td ><a href={`/marketdetail/${data.boardsId}`} >{data.title}</a></td>
      <td>{data.nickName}</td>
      <td>{data.bornDate}</td>
    </tr>
  ))}
  </tbody>
</table>

<div className="boardList-footer">
  <Pagination
    variant="outlined" color="primary" page={Number(searchParams.get("page"))+1}
      count={pageCount} size="large"
      onChange={(e, value) => {
        
        window.location.href = `/market?page=${value-1}`;
        console.log(value)
      }}
      showFirstButton showLastButton
    />
  </div>

<Button id="marketbtn" variant="outline-success" href="/marketwrite">&nbsp; 글쓰기 &nbsp;</Button>

</>


)
}

export default Market;