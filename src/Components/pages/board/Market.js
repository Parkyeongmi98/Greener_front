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

    // axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
    // const {data} = axios.get("/api/v1/boards");
    // const id = data.content.filter(v => v.categoryId == 1);
    // console.log(id)

    const getBoardList = async () => {
      const page_number = searchParams.get("page");
      axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
      const {data} = await axios.get(`/api/v1/boards?page=${page_number}&size=10`)
      const id = data.content.filter(v => v.categoryId == 1);
      console.log(id)
      return id
    }
    getBoardList().then(result => setBoardList(result));

    const getTotalBoard = async () => {
      const {data} = await axios.get("/api/v1/boards");
      const id = data.content.filter(v => v.categoryId == 1);
      console.log(id)
      // console.log(data)
      console.log(id.length)
      return id.length;
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

    {boardList.map((data) => (

    <tr>
      <td>{data.boardsId}</td>
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
        console.log(value)
        window.location.href = `/market?page=${value-1}`;
        
      }}
      showFirstButton showLastButton
    />
  </div>

<Button id="marketbtn" variant="outline-success" href="/marketwrite">&nbsp; 글쓰기 &nbsp;</Button>

</>


)
}

export default Market;


// import axios from "axios";
// import {Pagination} from "@mui/material";
// import React, { useState, useEffect } from "react";
// import {useSearchParams} from "react-router-dom";
// import CommunityTab from "./CommunityTab";
// import { Button } from "react-bootstrap";
// import { number, string } from "prop-types";

// const Market = () => {

//   const Category = {
//     id: number,
//     name: string,
//     url: string
//   }

//   const CATEGORY_LIST = [
//     {id: 1, name: "MARKET", url: '/market'},
//     {id: 2, name: "TALK", url: '/talk'}
//   ]
  
//   const [pageCount, setPageCount] = useState(0);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [boardList, setBoardList] = useState([]);
//   const [categoriIndex, setCategoriIndex] = useState(0);
  
  
//   useEffect(() => {
//     const getBoardList = async (categoriIndex) => {
//       const page_number = searchParams.get("page");
//       axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
//       const {data} = await axios.get(`/api/v1/boards/categori${CATEGORY_LIST[categoriIndex]}?page=${page_number}&size=10`)
//       console.log(data.content) 
//       return data.content;
//     }
//     getBoardList().then(result => setBoardList(result));

//     const getTotalBoard = async () => {
//       const {data} = await axios.get("/api/v1/boards");
//       return data.totalElements;
//     }
//     getTotalBoard().then(result => setPageCount(Math.ceil(result / 10)))
//     }, [categoriIndex])
    

//   return (
//     <>
//     <CommunityTab />
    
    
//     <table className="table">
//   <thead>
//     <tr>
//       <th>번호</th>
//       <th>제목</th>
//       <th>등록자</th>
//       <th>등록일</th>
//     </tr>
//   </thead>
//   <tbody className="table-group-divider">

//     {boardList.map((data) => (

//     <tr>
//       <td>{data.boardsId}</td>
//       <td ><a href={`/marketdetail/${data.boardsId}`} >{data.title}</a></td>
//       <td>{data.nickName}</td>
//       <td>{data.bornDate}</td>
//     </tr>
//   ))}
//   </tbody>
// </table>

// <div className="boardList-footer">
//   <Pagination
//     variant="outlined" color="primary" page={Number(searchParams.get("page"))+1}
//       count={pageCount} size="large"
//       onChange={(e, value) => {
        
//         window.location.href = `/market?page=${value-1}`;
//         console.log(value)
//       }}
//       showFirstButton showLastButton
//     />
//   </div>

// <Button id="marketbtn" variant="outline-success" href="/marketwrite">&nbsp; 글쓰기 &nbsp;</Button>

// </>


// )
// }

// export default Market;